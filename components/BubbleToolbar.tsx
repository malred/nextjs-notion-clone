'use client';
import {BubbleMenu, type Editor} from "@tiptap/react";
import {Toggle} from './ui/toggle'
import {
    Heading,
    Heading2,
    Heading3, Heading4,
    Italic,
    List,
    Image,
    ListOrdered,
    LucideBold,
    ChevronsLeftRight,
    Minus,
    LucideItalic,
    CornerDownLeft,
    Strikethrough,
    Blocks,
    Superscript,

    Link2,
    Link2Off,
    Braces,
    Brackets, SquareCheck, Subscript,
    AlignJustify, AlignLeft, AlignRight, AlignCenter,
    Quote,
    CodepenIcon,
} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useCallback} from "react";


type Props = {
    editor: Editor | null
}

export default function BubbleToolbar({editor}: Props) {
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
        <BubbleMenu className={'w-fit shadow-md rounded-lg'} editor={editor} tippyOptions={{duration: 100}}>
            <div className="bubble-menu flex-wrap rounded-lg">
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
                <div className={'inline-block mx-1'}>
                    <Select
                        onValueChange={(value) => {
                            console.log(value)
                            switch (value) {
                                case 'Purple':
                                    editor.chain().focus().setColor('#958DF1').run()
                                    break
                                case 'Red':
                                    editor.chain().focus().setColor('#F98181').run()
                                    break
                                case 'Orange':
                                    editor.chain().focus().setColor('#FBBC88').run()
                                    break
                                case 'Yellow':
                                    editor.chain().focus().setColor('#FAF594').run()
                                    break
                                case 'Blue':
                                    editor.chain().focus().setColor('#70CFF8').run()
                                    break
                                case 'Teal':
                                    editor.chain().focus().setColor('#94FADB').run()
                                    break
                                case 'Green':
                                    editor.chain().focus().setColor('#B9F18D').run()
                                    break
                                case 'Unset color':
                                    editor.chain().focus().unsetColor().run()
                                    break
                            }
                        }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={'theme'}/>
                        </SelectTrigger>
                        <SelectContent>
                            {[
                                {
                                    name: 'Purple',
                                    val: '#958DF1'
                                },
                                {
                                    name: 'Red',
                                    val: '#F98181'
                                },
                                {
                                    name: 'Orange',
                                    val: '#FBBC88'
                                },
                                {
                                    name: 'Yellow',
                                    val: '#FAF594'
                                },
                                {
                                    name: 'Blue',
                                    val: '#70CFF8'
                                },
                                {
                                    name: 'Teal',
                                    val: '#94FADB'
                                },
                                {
                                    name: 'Green',
                                    val: '#B9F18D'
                                },
                                {
                                    name: 'Unset color',
                                    val: ''
                                }
                            ].map((item) => (
                                <SelectItem
                                    value={item.name}
                                    data-testid={`set${item.name}`}
                                    style={{
                                        color: item.val
                                    }}
                                    className={
                                        `bg-[${item.val}] focus:bg-[${item.val}] focus:brightness-125
                                         ${editor.isActive('textStyle', {color: item.val}) ? 'is-active' : ''}`
                                    }
                                    // onClick={() => editor.chain().focus().setColor(item.val).run()}
                                >
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={'inline-block mx-1'}>
                    <Select
                        onValueChange={(value) => {
                            console.log(value)
                            switch (value) {
                                case 'Purple':
                                    editor.chain().focus().toggleHighlight({color: '#958DF1'}).run()
                                    break
                                case 'Red':
                                    editor.chain().focus().toggleHighlight({color: '#F98181'}).run()
                                    break
                                case 'Orange':
                                    editor.chain().focus().toggleHighlight({color: '#ffc078'}).run()
                                    break
                                case 'Yellow':
                                    editor.chain().focus().toggleHighlight({color: '#FAF594'}).run()
                                    break
                                case 'Blue':
                                    editor.chain().focus().toggleHighlight({color: '#70CFF8'}).run()
                                    break
                                case 'Teal':
                                    editor.chain().focus().toggleHighlight({color: '#94FADB'}).run()
                                    break
                                case 'Green':
                                    editor.chain().focus().toggleHighlight({color: '#B9F18D'}).run()
                                    break
                                case 'Unset color':
                                    editor.chain().focus().unsetHighlight().run()
                                    break
                            }
                        }}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={'highlight'}/>
                        </SelectTrigger>
                        <SelectContent>
                            {[
                                {
                                    name: 'Purple',
                                    val: '#958DF1'
                                },
                                {
                                    name: 'Red',
                                    val: '#F98181'
                                },
                                {
                                    name: 'Orange',
                                    val: '#FBBC88'
                                },
                                {
                                    name: 'Yellow',
                                    val: '#FAF594'
                                },
                                {
                                    name: 'Blue',
                                    val: '#70CFF8'
                                },
                                {
                                    name: 'Teal',
                                    val: '#94FADB'
                                },
                                {
                                    name: 'Green',
                                    val: '#B9F18D'
                                },
                                {
                                    name: 'Unset color',
                                    val: ''
                                }
                            ].map((item, index) => (
                                <SelectItem
                                    key={index}
                                    value={item.name}
                                    data-testid={`set${item.name}`}
                                    style={{
                                        background: item.val
                                    }}
                                    className={
                                        `bg-[${item.val}] focus:bg-[${item.val}] focus:brightness-125
                                         ${editor.isActive('textStyle', {color: item.val}) ? 'is-active' : ''}`
                                    }
                                    // onClick={() => editor.chain().focus().setColor(item.val).run()}
                                >
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className={'inline-block mx-1'}>
                    <Select
                        onValueChange={(value) => {
                            switch (value) {
                                case 'inter':
                                    editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()
                                    break
                                case 'comic-sans':
                                    editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()
                                    break
                                case 'serif':
                                    editor.chain().focus().setFontFamily('serif').run()
                                    break
                                case 'monospace':
                                    editor.chain().focus().setFontFamily('monospace').run()
                                    break
                                case 'cursive':
                                    editor.chain().focus().setFontFamily('cursive').run()
                                    break
                                case 'css-variable':
                                    editor.chain().focus().setFontFamily('var(--title-font-family)').run()
                                    break
                                case 'comic-sans-quoted':
                                    editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()
                                    break
                                case 'unsetFontFamily':
                                    editor.chain().focus().unsetFontFamily().run()
                                    break
                            }
                        }}
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder={'font family'}/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem
                                onClick={() => editor.chain().focus().setFontFamily('Inter').run()}
                                className={editor.isActive('textStyle', {fontFamily: 'Inter'}) ? 'is-active' : ''}
                                data-test-id="inter"
                                value={'inter'}
                            >
                                Inter
                            </SelectItem>
                            <SelectItem
                                onClick={() =>
                                    editor.chain().focus().setFontFamily('Comic Sans MS, Comic Sans').run()
                                }
                                className={
                                    editor.isActive('textStyle', {fontFamily: 'Comic Sans MS, Comic Sans'})
                                        ? 'is-active'
                                        : ''
                                }
                                data-test-id="comic-sans"
                                value={"comic-sans"}
                            >
                                Comic Sans
                            </SelectItem>
                            <SelectItem
                                onClick={() =>
                                    editor.chain().focus().setFontFamily('serif').run()
                                }
                                className={editor.isActive('textStyle', {fontFamily: 'serif'}) ? 'is-active' : ''}
                                data-test-id="serif"
                                value="serif"
                            >
                                Serif
                            </SelectItem>
                            <SelectItem
                                onClick={() =>
                                    editor.chain().focus().setFontFamily('monospace').run()
                                }
                                className={editor.isActive('textStyle', {fontFamily: 'monospace'}) ? 'is-active' : ''}
                                data-test-id="monospace"
                                value="monospace"
                            >
                                Monospace
                            </SelectItem>
                            <SelectItem
                                onClick={() =>
                                    editor.chain().focus().setFontFamily('cursive').run()
                                }
                                className={editor.isActive('textStyle', {fontFamily: 'cursive'}) ? 'is-active' : ''}
                                data-test-id="cursive"
                                value="cursive"
                            >
                                Cursive
                            </SelectItem>
                            <SelectItem
                                onClick={() =>
                                    editor.chain().focus().setFontFamily('var(--title-font-family)').run()
                                }
                                className={editor.isActive('textStyle', {fontFamily: 'var(--title-font-family)'}) ? 'is-active' : ''}
                                data-test-id="css-variable"
                                value="css-variable"
                            >
                                CSS variable
                            </SelectItem>
                            <SelectItem
                                onClick={() =>
                                    editor.chain().focus().setFontFamily('"Comic Sans MS", "Comic Sans"').run()
                                }
                                className={editor.isActive('textStyle', {fontFamily: '"Comic Sans"'}) ? 'is-active' : ''}
                                data-test-id="comic-sans-quoted"
                                value="comic-sans-quoted"
                            >
                                Comic Sans quoted
                            </SelectItem>
                            <SelectItem
                                onClick={() =>
                                    editor.chain().focus().unsetFontFamily().run()
                                }
                                data-test-id="unsetFontFamily"
                                value="unsetFontFamily"
                            >
                                Unset font family
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
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

                <Toggle
                    onClick={() => editor.chain().focus().toggleTaskList().run()}
                    className={editor.isActive('taskList') ? 'is-active' : ''}
                >
                    <SquareCheck className={'h-4 w-4'}/>
                </Toggle>

                {/*链接*/}
                <Link2
                    onClick={setLink}
                    className={`h-5 w-5 m-2 cursor-pointer
                     ${editor.isActive('link') ? 'is-active' : ''}`}/>

                <Toggle
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    disabled={!editor.isActive('link')}
                >
                    <Link2Off className={'h-4 w-4'}/>
                </Toggle>
                {/*上下标*/}
                <Toggle
                    onClick={() => editor.chain().focus().toggleSuperscript().run()}
                    className={editor.isActive('superscript') ? 'is-active' : ''}
                >
                    <Superscript className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().toggleSubscript().run()}
                    className={editor.isActive('subscript') ? 'is-active' : ''}
                >
                    <Subscript className={'h-4 w-4'}/>
                </Toggle>
                {/*对齐*/}
                <Toggle
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={editor.isActive({textAlign: 'left'}) ? 'is-active' : ''}
                >
                    <AlignLeft className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={editor.isActive({textAlign: 'center'}) ? 'is-active' : ''}
                >
                    <AlignCenter className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={editor.isActive({textAlign: 'right'}) ? 'is-active' : ''}
                >
                    <AlignRight className={'h-4 w-4'}/>
                </Toggle>
                <Toggle
                    onClick={() => editor.chain().focus().setTextAlign('justify').run()}
                    className={editor.isActive({textAlign: 'justify'}) ? 'is-active' : ''}
                >
                    <AlignJustify className={'h-4 w-4'}/>
                </Toggle>
            </div>
        </BubbleMenu>
    )
}