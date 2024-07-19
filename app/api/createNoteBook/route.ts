// app/api/createNoteBook/route.ts
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {generateImage, generateImagePrompt} from "@/lib/openai";
import {db} from "@/lib/db";
import {$notes} from "@/lib/db/schema";

export async function POST(req: NextRequest) {
    const {userId} = auth()
    if (!userId) {
        // @ts-ignore
        return NextResponse.json({error: 'unauthorised'}, {status: 401})
    }

    const body = await req.json()
    const {name} = body
    const image_description = await generateImagePrompt(name)
    if (!image_description) {
        // @ts-ignore
        return NextResponse.json({error: 'failed to generate image description'}, {status: 500})
    }
    const image_url = await generateImage(image_description)
    if (!image_url) {
        // @ts-ignore
        return NextResponse.json({error: 'failed to generate image'}, {status: 500})
    }

    // @ts-ignore
    const note_ids = await db
        .insert($notes)
        .values({
            name,
            userId,
            imageUrl: image_url,
        }).returning({
            insertedId: $notes.id
        })

    return NextResponse.json({
        note_id: note_ids[0].insertedId
    })
}