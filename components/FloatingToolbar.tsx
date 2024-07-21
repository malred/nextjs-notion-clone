'use client';
import {type Editor, FloatingMenu} from "@tiptap/react";
import {Toggle} from './ui/toggle'
import {
    SquareCheck,
    Heading,
    Heading2,
    Heading3, Heading4,
    Italic,
    List,
    ListOrdered,
    LucideBold,
    Minus,
    Strikethrough,
    Braces,
    Brackets, Image, Quote, CodepenIcon,
} from "lucide-react";
import {useCallback} from "react";
import {handleUploadImg} from '@/lib/tiptapEx'

type Props = {
    name: string,
    editor: Editor | null
}

export default function FloatingToolbar({name, editor}: Props) {
    if (!editor)
        return null

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const addImage = useCallback((event) => {
        event.preventDefault();
        let url = ''
        // const url = window.prompt('URL')
        var input = document.getElementById("fileUpload");
        // @ts-ignore
        input.click();
        // @ts-ignore
        input.onchange = async (e) => {
            // @ts-ignore
            var file = e.target.files[0];
            url = `/${name}/${file.name}`
            // const url = URL.createObjectURL(file);

            await handleUploadImg(file, url)

            if (url) {
                // editor.commands.insertContent(`<react-component src=${url} />`);
                editor.chain().focus().setImage({src: url}).run()
            }
        };
        // if (url) {
        //     editor.chain().focus().setImage({src: url}).run()
        // }
    }, [editor])

    return (
        <FloatingMenu className={'w-fit shadow-md rounded-lg'} editor={editor} tippyOptions={{duration: 100}}>
            <div className="bubble-menu rounded-lg">
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('heading', {level: 1})}
                    onPressedChange={() => {
                        editor.chain().focus().toggleHeading({level: 1}).run()
                    }}
                >
                    <Heading className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('heading', {level: 2})}
                    onPressedChange={() => {
                        editor.chain().focus().toggleHeading({level: 2}).run()
                    }}
                >
                    <Heading2 className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('heading', {level: 3})}
                    onPressedChange={() => {
                        editor.chain().focus().toggleHeading({level: 3}).run()
                    }}
                >
                    <Heading3 className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('heading', {level: 4})}
                    onPressedChange={() => {
                        editor.chain().focus().toggleHeading({level: 4}).run()
                    }}
                >
                    <Heading4 className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('bold')}
                    onPressedChange={() => {
                        editor.chain().focus().toggleBold().run()
                    }}
                >
                    <LucideBold className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('italic')}
                    onPressedChange={() => {
                        editor.chain().focus().toggleItalic().run()
                    }}
                >
                    <Italic className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('strike')}
                    onPressedChange={() => {
                        editor.chain().focus().toggleStrike().run()
                    }}
                >
                    <Strikethrough className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('bulletList')}
                    onPressedChange={() => {
                        editor.chain().focus().toggleBulletList().run()
                    }}
                >
                    <List className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    pressed={editor.isActive('orderedList')}
                    onPressedChange={() => {
                        editor.chain().focus().toggleOrderedList().run()
                    }}
                >
                    <ListOrdered className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                    className={`${editor.isActive('codeBlock') ? 'is-active' : ''}`}
                >
                    <CodepenIcon className={'w-4 h-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`${editor.isActive('blockquote') ? 'is-active' : ''}`}
                >
                    <Quote className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    size={'sm'}
                    onClick={() => editor.chain().focus().setHorizontalRule().run()}
                >
                    <Minus className={'h-4 w-4'}/>
                </Toggle>
                <Image onClick={addImage} className={'m-2 cursor-pointer h-5 w-5'}/>
                {/*<Image*/}
                {/*    onClick={(event) => {*/}
                {/*        event.preventDefault();*/}
                {/*        var input = document.getElementById("fileUpload");*/}
                {/*        // @ts-ignore*/}
                {/*        input.click();*/}
                {/*        // @ts-ignore*/}
                {/*        input.onchange = async (e) => {*/}
                {/*            // @ts-ignore*/}
                {/*            var file = e.target.files[0];*/}
                {/*            // const url = URL.createObjectURL(file);*/}
                {/*            const url = `/tmp/${file.name}`*/}
                {/*            */}
                {/*            await handleUploadImg(file)*/}
                {/*            */}
                {/*            // if (url) {*/}
                {/*            editor.commands.insertContent(`<react-component src=${url} />`);*/}
                {/*            // }*/}
                {/*        };*/}
                {/*    }}*/}
                {/*    className={'m-2 cursor-pointer h-5 w-5'}/>*/}
                <input id="fileUpload" type="file" style={{display: "none"}}/>

                <Toggle
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    className={editor.isActive('taskList') ? 'is-active' : ''}
                >
                    <SquareCheck className={'h-4 w-4'}/>
                </Toggle>
            </div>

        </FloatingMenu>
    )
}