// app/api/saveNote/route.ts

import {NextRequest, NextResponse} from "next/server";
import {$notes} from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import {db} from "@/lib/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        let {noteId, editorState} = body
        if (!editorState || !noteId) {
            // @ts-ignore
            return NextResponse.json({error: 'Missing editorState or noteId'}, {status: 400})
        }

        noteId = parseInt(noteId)
        const notes = await db.select().from($notes).where(
            eq($notes.id, noteId)
        )
        // @ts-ignore
        if (notes.length != 1) {
            // @ts-ignore
            return NextResponse.json({error: 'failed to update'}, {status: 500})
        }

        const note = notes[0]
        if (note.editorState !== editorState) {
            // @ts-ignore
            await db.update($notes).set({
                editorState
            }).where(eq($notes.id, noteId))
        }

        // @ts-ignore
        return NextResponse.json({
            success: true
        }, {status: 200})
    } catch (e) {
        console.error(e)
        // @ts-ignore
        return NextResponse.json({
            success: false
        },{status:500})
    }
}