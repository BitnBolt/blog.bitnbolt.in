"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import { BubbleMenu, FloatingMenu } from '@tiptap/react/menus';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Youtube } from '@tiptap/extension-youtube';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableCell } from '@tiptap/extension-table-cell';
import { TableHeader } from '@tiptap/extension-table-header';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { Highlight } from '@tiptap/extension-highlight';
import { BubbleMenu as BubbleMenuExtension } from '@tiptap/extension-bubble-menu';
import { FloatingMenu as FloatingMenuExtension } from '@tiptap/extension-floating-menu';
import { Heading } from '@tiptap/extension-heading';

import {
    Bold, Italic, Strikethrough, Code, Heading1, Heading2, Heading3,
    List, ListOrdered, Quote, Image as ImageIcon, Link as LinkIcon,
    Undo, Redo, Terminal, CheckSquare, Youtube as YoutubeIcon,
    Table as TableIcon, AlignLeft, AlignCenter, AlignRight,
    Highlighter, Type, Underline as UnderlineIcon, Subscript as SubIcon,
    Superscript as SuperIcon, Eraser, Palette,
    Columns, Rows, Trash2, Combine, Split
} from 'lucide-react';
import { useCallback, useEffect } from 'react';

// Create a lowlight instance with common languages
const lowlight = createLowlight(common);

interface TiptapEditorProps {
    content: string;
    onChange: (html: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) {
        return null;
    }

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);
        if (url === null) return;
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const addImage = useCallback(() => {
        const url = window.prompt('Image URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const addYoutube = useCallback(() => {
        const url = window.prompt('YouTube Video URL');
        if (url) {
            editor.commands.setYoutubeVideo({ src: url });
        }
    }, [editor]);

    return (
        <div className="flex flex-wrap gap-1 p-2 bg-[#1a1a1a] border-b border-white/10 sticky top-0 z-10 items-center">
            {/* History */}
            <div className="flex gap-1 mr-2 border-r border-white/10 pr-2">
                <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400 disabled:opacity-30" title="Undo"><Undo size={16} /></button>
                <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400 disabled:opacity-30" title="Redo"><Redo size={16} /></button>
            </div>

            {/* Text Style */}
            <div className="flex gap-1 mr-2 border-r border-white/10 pr-2 items-center">
                <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Bold"><Bold size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Italic"><Italic size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('underline') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Underline"><UnderlineIcon size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('strike') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Strikethrough"><Strikethrough size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('highlight') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Highlight"><Highlighter size={16} /></button>

                {/* Color Picker */}
                <div className="relative group p-1.5 rounded hover:bg-white/10 flex items-center justify-center cursor-pointer" title="Text Color">
                    <Palette size={16} className={editor.getAttributes('textStyle').color ? 'text-cyan-400' : 'text-gray-400'} />
                    <input
                        type="color"
                        onInput={(event: any) => editor.chain().focus().setColor(event.target.value).run()}
                        value={editor.getAttributes('textStyle').color || '#000000'}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                </div>

                <button onClick={() => editor.chain().focus().unsetAllMarks().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Clear Formatting"><Eraser size={16} /></button>
            </div>

            {/* Headings */}
            <div className="flex gap-1 mr-2 border-r border-white/10 pr-2">
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 1 }) ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="H1"><Heading1 size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 2 }) ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="H2"><Heading2 size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('heading', { level: 3 }) ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="H3"><Heading3 size={16} /></button>
            </div>

            {/* Alignment */}
            <div className="flex gap-1 mr-2 border-r border-white/10 pr-2">
                <button onClick={() => editor.chain().focus().setTextAlign('left').run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive({ textAlign: 'left' }) ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Align Left"><AlignLeft size={16} /></button>
                <button onClick={() => editor.chain().focus().setTextAlign('center').run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive({ textAlign: 'center' }) ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Align Center"><AlignCenter size={16} /></button>
                <button onClick={() => editor.chain().focus().setTextAlign('right').run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive({ textAlign: 'right' }) ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Align Right"><AlignRight size={16} /></button>
            </div>

            {/* Lists & Tasks */}
            <div className="flex gap-1 mr-2 border-r border-white/10 pr-2">
                <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('bulletList') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Bullet List"><List size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('orderedList') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Ordered List"><ListOrdered size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('taskList') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Task List"><CheckSquare size={16} /></button>
            </div>

            {/* Blocks */}
            <div className="flex gap-1">
                <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('blockquote') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Quote"><Quote size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleCode().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('code') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Inline Code"><Code size={16} /></button>
                <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('codeBlock') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Code Block"><Terminal size={16} /></button>
                <button onClick={setLink} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('link') ? 'text-cyan-400 bg-white/5' : 'text-gray-400'}`} title="Link"><LinkIcon size={16} /></button>
                <button onClick={addImage} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Image"><ImageIcon size={16} /></button>
                <button onClick={addYoutube} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="YouTube"><YoutubeIcon size={16} /></button>
                <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Table"><TableIcon size={16} /></button>
            </div>
        </div>
    );
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                codeBlock: false,
                heading: false, // Disable bundled
            }),
            Heading.configure({ levels: [1, 2, 3] }),
            CodeBlockLowlight.configure({ lowlight, HTMLAttributes: { class: 'hljs' } }),
            Link.configure({ openOnClick: false, HTMLAttributes: { class: 'text-cyan-400 underline decoration-cyan-400/30 hover:decoration-cyan-400' } }),
            Image.configure({ HTMLAttributes: { class: 'rounded-lg border border-white/10 max-w-full h-auto' } }),
            Placeholder.configure({ placeholder: 'Start writing your amazing content...' }),
            TaskList,
            TaskItem.configure({ nested: true }),
            Youtube.configure({ controls: true, nocookie: true }),
            Table.configure({ resizable: true }),
            TableRow,
            TableHeader,
            TableCell,
            TextAlign.configure({ types: ['heading', 'paragraph'] }),
            Underline,
            Subscript,
            Superscript,
            TextStyle,
            Color,
            Highlight.configure({ multicolor: true }),
            BubbleMenuExtension,
            FloatingMenuExtension,
        ],
        content: content ? content.replace(/<\/pre>\s*<pre[^>]*>/gi, '\n') : '', // Fix Quill block fragmentation
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert prose-lg max-w-none focus:outline-none min-h-[500px] p-6 text-gray-300',
            },
        },
    });

    useEffect(() => {
        const normalizedContent = content ? content.replace(/<\/pre>\s*<pre[^>]*>/gi, '\n') : '';
        if (editor && normalizedContent && editor.getHTML() !== normalizedContent) {
            editor.commands.setContent(normalizedContent);
        }
    }, [content, editor]);

    return (
        <div className="border border-white/10 rounded-lg overflow-hidden bg-[#111] relative">
            <MenuBar editor={editor} />

            {editor && (
                <BubbleMenu editor={editor} shouldShow={({ editor }) => !editor.isActive('table') && !editor.isActive('image') && !editor.isActive('youtube')}>
                    <div className="flex bg-[#1a1a1a] border border-white/10 rounded shadow-lg p-1 gap-1">
                        <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('bold') ? 'text-cyan-400' : 'text-gray-400'}`}><Bold size={14} /></button>
                        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('italic') ? 'text-cyan-400' : 'text-gray-400'}`}><Italic size={14} /></button>
                        <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`p-1.5 rounded hover:bg-white/10 ${editor.isActive('highlight') ? 'text-cyan-400' : 'text-gray-400'}`}><Highlighter size={14} /></button>
                    </div>
                </BubbleMenu>
            )}

            {editor && (
                <BubbleMenu editor={editor} shouldShow={({ editor }) => editor.isActive('table')}>
                    <div className="flex flex-wrap bg-[#1a1a1a] border border-white/10 rounded shadow-lg p-1 gap-1 max-w-[300px] z-50">
                        <button onClick={() => editor.chain().focus().addColumnBefore().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Add Col Before"><Columns size={14} className="rotate-90" /></button>
                        <button onClick={() => editor.chain().focus().addColumnAfter().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Add Col After"><Columns size={14} /></button>
                        <button onClick={() => editor.chain().focus().deleteColumn().run()} className="p-1.5 rounded hover:bg-white/10 text-red-400" title="Delete Col"><Trash2 size={14} /></button>
                        <div className="w-px h-4 bg-white/10 self-center mx-1" />
                        <button onClick={() => editor.chain().focus().addRowBefore().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Add Row Before"><Rows size={14} className="rotate-90" /></button>
                        <button onClick={() => editor.chain().focus().addRowAfter().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Add Row After"><Rows size={14} /></button>
                        <button onClick={() => editor.chain().focus().deleteRow().run()} className="p-1.5 rounded hover:bg-white/10 text-red-400" title="Delete Row"><Trash2 size={14} /></button>
                        <div className="w-px h-4 bg-white/10 self-center mx-1" />
                        <button onClick={() => editor.chain().focus().mergeCells().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Merge Cells"><Combine size={14} /></button>
                        <button onClick={() => editor.chain().focus().splitCell().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Split Cell"><Split size={14} /></button>
                        <div className="w-px h-4 bg-white/10 self-center mx-1" />
                        <button onClick={() => editor.chain().focus().deleteTable().run()} className="p-1.5 rounded hover:bg-red-900/20 text-red-500" title="Delete Table"><Trash2 size={14} /></button>
                    </div>
                </BubbleMenu>
            )}

            {editor && (
                <FloatingMenu editor={editor}>
                    <div className="flex bg-[#1a1a1a] border border-white/10 rounded shadow-lg p-1 gap-1">
                        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400"><Heading1 size={14} /></button>
                        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400"><List size={14} /></button>
                        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400"><Terminal size={14} /></button>
                        <button onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} className="p-1.5 rounded hover:bg-white/10 text-gray-400" title="Table"><TableIcon size={14} /></button>
                    </div>
                </FloatingMenu>
            )}

            <EditorContent editor={editor} />
        </div>
    );
}
