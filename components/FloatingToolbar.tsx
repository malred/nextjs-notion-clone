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

type Props = {
    editor: Editor | null
}

export default function FloatingToolbar({editor}: Props) {
    if (!editor)
        return null

    const addImage = useCallback(() => {
        const url = window.prompt('URL')

        if (url) {
            editor.chain().focus().setImage({src: url}).run()
        }
    }, [editor])

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href
        const url = window.prompt('URL', previousUrl)

        // cancelled
        if (url === null) {
            return
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink()
                .run()

            return
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({href: url})
            .run()
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
                {/*<div className={'inline-block mx-1'}>*/}
                {/*    <Select*/}
                {/*        onValueChange={(value) => {*/}
                {/*            switch (value) {*/}
                {/*                case 'Insert table':*/}
                {/*                    editor.chain().focus().insertTable({rows: 3, cols: 3, withHeaderRow: true}).run()*/}
                {/*                    break*/}
                {/*                case 'Add column before':*/}
                {/*                    editor.chain().focus().addColumnBefore().run()*/}
                {/*                    break*/}
                {/*                case 'Add column after':*/}
                {/*                    editor.chain().focus().addColumnAfter().run()*/}
                {/*                    break*/}

                {/*                case 'Delete column':*/}
                {/*                    editor.chain().focus().deleteColumn().run()*/}
                {/*                    break*/}

                {/*                case 'Add row before':*/}
                {/*                    editor.chain().focus().addRowBefore().run()*/}
                {/*                    break*/}

                {/*                case 'Add row after':*/}
                {/*                    editor.chain().focus().addRowAfter().run()*/}
                {/*                    break*/}

                {/*                case 'Delete row':*/}
                {/*                    editor.chain().focus().deleteRow().run()*/}
                {/*                    break*/}

                {/*                case 'Delete table':*/}
                {/*                    editor.chain().focus().deleteTable().run()*/}
                {/*                    break*/}

                {/*                case 'Merge cells':*/}
                {/*                    editor.chain().focus().mergeCells().run()*/}
                {/*                    break*/}

                {/*                case 'Split cell':*/}
                {/*                    editor.chain().focus().splitCell().run()*/}
                {/*                    break*/}

                {/*                case 'Toggle header column':*/}
                {/*                    editor.chain().focus().toggleHeaderColumn().run()*/}
                {/*                    break*/}

                {/*                case 'Toggle header row':*/}
                {/*                    editor.chain().focus().toggleHeaderRow().run()*/}
                {/*                    break*/}
                {/*                case 'Toggle header cell':*/}
                {/*                    editor.chain().focus().toggleHeaderCell().run()*/}
                {/*                    break*/}

                {/*                case 'Merge or split':*/}
                {/*                    editor.chain().focus().mergeOrSplit().run()*/}
                {/*                    break*/}

                {/*                case 'Set cell attribute':*/}
                {/*                    editor.chain().focus().setCellAttribute('colspan', 2).run()*/}
                {/*                    break*/}


                {/*                case 'Fix tables':*/}
                {/*                    editor.chain().focus().fixTables().run()*/}
                {/*                    break*/}


                {/*                case 'Go to next cell':*/}
                {/*                    editor.chain().focus().goToNextCell().run()*/}
                {/*                    break*/}

                {/*                case 'Go to previous cell':*/}
                {/*                    editor.chain().focus().goToPreviousCell().run()*/}
                {/*                    break*/}

                {/*            }*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <SelectTrigger className="w-[180px]">*/}
                {/*            <SelectValue placeholder={'table'}/>*/}
                {/*        </SelectTrigger>*/}
                {/*        <SelectContent>*/}
                {/*            <SelectItem*/}
                {/*                value={'Insert table'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().insertTable({rows: 3, cols: 3, withHeaderRow: true}).run()*/}
                {/*                }*/}
                {/*            >*/}
                {/*                Insert table*/}
                {/*            </SelectItem>*/}
                {/*            <SelectItem*/}
                {/*                value={'Add column before'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().addColumnBefore().run()*/}
                {/*                }*/}
                {/*            >*/}
                {/*                Add column before*/}
                {/*            </SelectItem>*/}
                {/*            <SelectItem*/}
                {/*                value={'Add column after'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().addColumnAfter().run()*/}
                {/*                }*/}
                {/*            >Add column after</SelectItem>*/}
                {/*            <SelectItem*/}
                {/*                value={'Delete column'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().deleteColumn().run()*/}
                {/*                }*/}
                {/*            >Delete column</SelectItem>*/}
                {/*            <SelectItem*/}
                {/*                value={'Add row before'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().addRowBefore().run()*/}
                {/*                }*/}
                {/*            >Add row before</SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Add row after'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().addRowAfter().run()*/}
                {/*                }*/}
                {/*            >Add row after</SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Delete row'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().deleteRow().run()*/}
                {/*                }*/}
                {/*            >Delete row</SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Delete table'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().deleteTable().run()*/}
                {/*                }*/}
                {/*            >Delete table</SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Merge cells'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().mergeCells().run()*/}
                {/*                }*/}
                {/*            >Merge cells</SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Split cell'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().splitCell().run()*/}
                {/*                }*/}
                {/*            >Split cell</SelectItem>*/}
                {/*            <SelectItem*/}
                {/*                value={'Toggle header column'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().toggleHeaderColumn().run()}*/}
                {/*            >*/}
                {/*                Toggle header column*/}
                {/*            </SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Toggle header row'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().toggleHeaderRow().run()*/}
                {/*                }>*/}
                {/*                Toggle header row*/}
                {/*            </SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Toggle header cell'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().toggleHeaderCell().run()}>*/}
                {/*                Toggle header cell*/}
                {/*            </SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Merge or split'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().mergeOrSplit().run()*/}
                {/*                }>Merge or split</SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Set cell attribute'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().setCellAttribute('colspan', 2).run()}>*/}
                {/*                Set cell attribute*/}
                {/*            </SelectItem>*/}

                {/*            <SelectItem*/}
                {/*                value={'Fix tables'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().fixTables().run()}*/}
                {/*            >Fix tables</SelectItem>*/}
                {/*            <SelectItem*/}
                {/*                value={'Go to next cell'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().goToNextCell().run()}*/}
                {/*            >Go to next cell</SelectItem>*/}
                {/*            <SelectItem*/}
                {/*                value={'Go to previous cell'}*/}
                {/*                onClick={() =>*/}
                {/*                    editor.chain().focus().goToPreviousCell().run()}>*/}
                {/*                Go to previous cell*/}
                {/*            </SelectItem>*/}
                {/*        </SelectContent>*/}
                {/*    </Select>*/}
                {/*</div>*/}

                <Toggle
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    className={editor.isActive('taskList') ? 'is-active' : ''}
                >
                    <SquareCheck className={'h-4 w-4'}/>
                </Toggle>
                {/*<Link2*/}
                {/*    onClick={setLink}*/}
                {/*    className={`h-5 w-5 m-2 cursor-pointer*/}
                {/*     ${editor.isActive('link') ? 'is-active' : ''}`}/>*/}

                {/*<Toggle*/}
                {/*    onClick={() => editor.chain().focus().unsetLink().run()}*/}
                {/*    disabled={!editor.isActive('link')}*/}
                {/*>*/}
                {/*    <Link2Off className={'h-4 w-4'}/>*/}
                {/*</Toggle>*/}
            </div>

        </FloatingMenu>
    )
}