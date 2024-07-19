
import {neon, neonConfig} from '@neondatabase/serverless'
import {drizzle} from "drizzle-orm/neon-http";


neonConfig.fetchConnectionCache = true

if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined")
}

const sql = neon(process.env.DATABASE_URL)

export const db = drizzle(sql)
// db.select().from().where()
import {pgTable, serial, text, timestamp} from 'drizzle-orm/pg-core'

// @ts-ignore
export const $notes = pgTable('notes', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    createAt: timestamp('created_at').notNull().defaultNow(),
    imageUrl: text('imageUrl'),
    userId: text('user_id').notNull(),
    editorState: text('editor_state'),
})

// export type NoteType = typeof $notes.$inferInsert

const note_ids = await db.insert($notes).values({
    name: '111',
    userId: 111,
    imageUrl: 'image_url',
}).returning({
    insertedId: $notes.id
})