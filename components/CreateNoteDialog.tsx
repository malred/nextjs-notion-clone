// components/CreateNoteDialog.tsx
"use client"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Loader2, Plus} from "lucide-react";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import React, {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import axios from 'axios'
import {useRouter} from "next/navigation";

export default function CreateNoteDialog() {
    const cls1 = 'border-dashed border-2 flex flex-row border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 p-4'

    const router = useRouter()

    const [input, setInput] = useState('')
    const uploadToFirebase = useMutation({
        mutationFn: async (noteId: string) => {
            const response = await axios.post('/api/uploadToFirebase', {
                noteId
            })
            return response.data
        }
    })
    const createNoteBook = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/createNoteBook', {
                name: input
            })
            return response.data
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (input === '') {
            window.alert('Please enter a name for your notebook')
            return
        }
        // 调用createNoteBook并缓存
        createNoteBook.mutate(undefined, {
            onSuccess: ({note_id}) => {
                console.log('created new note:', {note_id})
                // 持久化图片
                uploadToFirebase.mutate(note_id)
                router.push(`/notebook/${note_id}`)
            },
            onError: (error) => {
                console.error(error)
                window.alert('Failed to create new notebook')
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger>
                <div
                    className={cls1}
                >
                    <Plus className={'w-6 h-6 text-green-600'} strokeWidth={3}/>
                    <h2
                        className={'font-semibold text-green-600 sm:mt-2'}
                    >
                        New Not Book
                    </h2>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        New Note Book
                    </DialogTitle>
                    <DialogDescription>
                        You can create a new note by clicking the button below.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className={''}
                >
                    <Input
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder={'Name...'}/>
                    <div className="h-4"></div>
                    <div
                        className={'flex items-center gap-2'}
                    >
                        <Button
                            onClick={() => setInput('')}
                            type={'reset'} variant={'secondary'}>Cancel</Button>
                        <Button
                            type={'submit'}
                            className={'bg-green-600'}
                            disabled={createNoteBook.isPending}
                        >
                            {/*isLoading no longer exists */}
                            {createNoteBook.isPending && (
                                <Loader2 className={'w-4 h-4 mr-2 animate-spin'}/>
                            )}
                            Create
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}