// components/TipTapEditor.tsx
'use client';
import TipTapMenuBar from "@/components/TipTapMenuBar";
import {Button} from "@/components/ui/button";
import {useDebounce} from "@/lib/useDebounce";
import {useMutation} from "@tanstack/react-query";
import axios from 'axios'
import {NoteType} from "@/lib/db/schema";
import {useCompletion} from 'ai/react' ;

import {EditorContent, ReactNodeViewRenderer, useEditor} from "@tiptap/react";
import {StarterKit} from "@tiptap/starter-kit";
import Heading from '@tiptap/extension-heading'
import BubbleToolbar from "@/components/BubbleToolbar";
import {CharacterCount} from "@tiptap/extension-character-count";

import {Color} from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'

import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import {useEffect, useRef, useState} from "react";
import FloatingToolbar from "@/components/FloatingToolbar";

import Focus from '@tiptap/extension-focus'
import {FontFamily} from "@tiptap/extension-font-family";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import Code from "@tiptap/extension-code";

import ListKeymap from '@tiptap/extension-list-keymap'

import Blockquote from '@tiptap/extension-blockquote'
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'

import Highlight from '@tiptap/extension-highlight'
import {common, createLowlight} from 'lowlight'

const lowlight = createLowlight(common)

lowlight.highlight('html', '"use strict";')
lowlight.highlight('css', '"use strict";')
lowlight.highlight('js', '"use strict";')
lowlight.highlight('ts', '"use strict";')

import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'

import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import Link from '@tiptap/extension-link'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'

import TextAlign from '@tiptap/extension-text-align'

import ImageComponent from '@/components/TiptapImageEx/extension'
import ImageResize from 'tiptap-extension-resize-image';
import {ResizableImage} from "tiptap-resize-image";

import History from '@tiptap/extension-history'

type Props = {
    note: NoteType
}

export default function TipTapEditor({note}: Props) {
    const [editorState, setEditorState] = useState(
        note.editorState || `<h1>${note.name}</h1>`
    )
    const {complete, completion} = useCompletion({
        api: '/api/completion',
    })
    const saveNote = useMutation({
        mutationFn: async () => {
            const response = await axios.post('/api/saveNote', {
                noteId: note.id,
                editorState
            })
            return response.data
        }
    })

    const customText = Text.extend({
        addKeyboardShortcuts() {
            return {
                'Shift-a': () => {
                    // console.log('activate AI')
                    // take the last 30 words
                    const prompt = this.editor.getText().split(' ').slice(-30).join(' ')
                    // console.log(prompt)
                    complete(prompt)
                    return true
                }
            }
        }
    })
    // const editor = useEditor({
    //     autofocus: true,
    //     extensions: [StarterKit, customText],
    //     content: editorState,
    //     onUpdate: ({editor}) => {
    //         // @ts-ignore
    //         setEditorState(editor?.getHTML())
    //     }
    // })

    const editor = useEditor({
        extensions: [
            History,
            ImageResize,
            // ResizableImage,
            ImageComponent, // custom
            StarterKit.configure({
                // Disable an included extension
                history: false,
                // @ts-ignore
                gapcursor: true
            }),
            Heading,
            Document,
            Paragraph,
            Dropcursor,
            Text,
            TextStyle,
            Color,
            CharacterCount.configure({
                mode: 'nodeSize',
            }),
            Focus.configure({
                className: 'has-focus',
                mode: 'all',
            }),
            Code,
            BulletList,
            ListItem,
            FontFamily,
            ListKeymap,
            Blockquote,
            HardBreak,
            HorizontalRule,
            Highlight,
            Image.configure({
                allowBase64: true,
                inline: true,
            }),
            Table.configure({}),
            TableRow,
            TableHeader,
            TableCell,
            Text,
            TaskList,
            TaskItem.configure({
                HTMLAttributes: {
                    class: 'list-none',
                },
            }),
            Link.configure({
                HTMLAttributes: {
                    class: 'underline cursor-pointer text-blue-400',
                },
                openOnClick: true,
                autolink: true,
                defaultProtocol: 'https',
            }),
            Highlight.configure({multicolor: true}),
            Subscript,
            Superscript,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            customText
        ],
        autofocus: true,
        editorProps: {
            attributes: {
                class:
                    'p-2 rounded-md border min-h-[150px] border-input bg-back  disabled:cursor-not-allowed disabled:opacity-50'
            }
        },
        content: editorState,
        onUpdate: ({editor}) => {
            // @ts-ignore
            setEditorState(editor?.getHTML())
        }
    })

    const lastCompletion = useRef('')
    useEffect(() => {
        if (!editor || !completion) return
        // 新的completion(ai之前生成的sentence + ai生成的新的char) 减去 上次的completion的长度
        // 得出新的char
        const diff = completion.slice(lastCompletion.current.length);
        // 更新lastCompletion
        lastCompletion.current = completion;
        // 当前editor后面加上新char
        editor.commands.insertContent(diff);
    }, [completion, editor])

    const debouncedEditorState = useDebounce(editorState, 500)

    useEffect(() => {
        // save to db
        if (debouncedEditorState === '') return
        saveNote.mutate(undefined, {
            onSuccess: data => {
                console.log('success update!', data)
            },
            onError: err => {
                console.error(err)
            }
        })
    }, [debouncedEditorState])

    return (
        <>
            <div className={'flex gap-2'}>
                {editor && <TipTapMenuBar name={note.name} editor={editor}/>}
                <Button disabled variant={'outline'}>
                    {saveNote.isPending ? "Saving..." : "Saved"}
                </Button>
            </div>

            {/* prose类名不会覆盖标题的样式 */}
            <FloatingToolbar name={note.name} editor={editor}/>
            <BubbleToolbar editor={editor}/>
            <div className={'prose prose-sm w-full mt-4'}>
                <EditorContent editor={editor}/>
            </div>
            <div className="h-4"></div>
            <span className={'text-sm'}>
                Tip: Press{" "}
                <kbd
                    className={'px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg'}
                >
                    Shift + A
                </kbd>{" "}
                for AI autocomplete
            </span>
            <div
                className={`character-count `}>
                <br/>
                {editor?.storage.characterCount.characters()} characters
                {' '}
                {editor?.storage.characterCount.words()} words
            </div>
        </>
    )
}