// app/dashboard/page.tsx
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {ArrowLeft} from "lucide-react";
import {UserButton} from "@clerk/nextjs";
import {Separator} from "@/components/ui/separator";
import CreateNoteDialog from "@/components/CreateNoteDialog";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {$notes} from "@/lib/db/schema";
import {eq} from "drizzle-orm";
import Image from "next/image";

export default async function DashboardPage() {
    const {userId} = auth()
    const notes = await db.select().from($notes).where(
        eq($notes.userId, userId!)
    )

    return (
        <>
            <div
                className={'grainy min-h-screen'}
            >
                <div
                    className={'max-w-7xl mx-auto p-10'}
                >
                    <div className="h-14"></div>
                    <div
                        className={'flex justify-between items-center md:flex-row flex-col'}
                    >
                        <div
                            className={'flex items-center'}
                        >
                            <Link href={'/'}>
                                <Button className={'bg-green-600'}>
                                    <ArrowLeft className={'mr-1 w-4 h-4'}/>
                                    Back
                                </Button>
                            </Link>
                            <div className="w-4"></div>
                            <h1
                                className={'text-3xl font-bold text-gray-900'}
                            >
                                My Notes
                            </h1>
                            <div className="w-4"></div>
                            {/*clerk user button*/}
                            <UserButton/>
                        </div>
                    </div>

                    <div className="h-8"></div>
                    <Separator/>
                    <div className="h-8"></div>
                    {/* list all the notes */}
                    {/* if no notes, display this */}
                    {notes.length === 0 && (
                        <div
                            className={'text-center'}
                        >
                            <h2
                                className={'text-xl text-gray-500'}
                            >
                                You have no notes yet.
                            </h2>
                        </div>
                    )}

                    {/* display all the notes */}
                    <div
                        className={'grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'}
                    >
                        <CreateNoteDialog/>
                        {notes.map(note => {
                            return (
                                <a
                                    key={note.id}
                                    href={`/notebook/${note.id}`}
                                >
                                    <div
                                        className={'rounded-lg border border-stone-300 overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1'}
                                    >
                                        <Image
                                            width={400}
                                            height={200}
                                            src={note.imageUrl || ''}
                                            alt={note.name}
                                        />
                                        <div className={'p-2'}></div>
                                        <h3 className={'p-1 text-xl font-semibold text-gray-900'}>
                                            {note.name}
                                        </h3>
                                        <div className="h-1"></div>
                                        <p className={'p-1 text-sm text-gray-500'}>
                                            {/*@ts-ignore*/}
                                            {new Date(note.createAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}