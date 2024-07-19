// app/api/uploadToFirebase/route.ts
import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {$notes} from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import {uploadFileToFirebase} from "@/lib/firebase";

export async function POST(req: NextRequest) {
    try {
        const {noteId} = await req.json()
        const notes = await db.select().from($notes).where(
            eq($notes.id, parseInt(noteId))
        )
        if (!notes[0].imageUrl) {
            return new NextResponse('no image url', {status: 400})
        }
        // openai dalle 生成的图片是临时的, 这里将它存放到firebase持久化
        const firebase_url = await uploadFileToFirebase(notes[0].imageUrl, notes[0].name)
        await db.update($notes).set({
            imageUrl: firebase_url,
        }).where(eq($notes.id, parseInt(noteId)))
        return new NextResponse('ok', {status: 200})
    } catch (e) {
        console.error(e)
        return new NextResponse('error', {status: 500})
    }
}