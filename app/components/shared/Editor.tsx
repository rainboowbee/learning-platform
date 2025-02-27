"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";

export default function Editor({
  content,
  setContent,
}: {
  content: string;
  setContent: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, TextStyle, Image, Link],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg p-4 bg-white">
      <div className="flex gap-2 mb-2">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded"
        >
          <b>B</b>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded"
        >
          <i>I</i>
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleStrike().run()}
          className="px-2 py-1 border rounded"
        >
          <s>S</s>
        </button>
        <button
          onClick={() => editor?.chain().focus().setParagraph().run()}
          className="px-2 py-1 border rounded"
        >
          P
        </button>
        <button
          onClick={() => editor?.chain().focus().setHeading({ level: 2 }).run()}
          className="px-2 py-1 border rounded"
        >
          H2
        </button>
        <button
          onClick={() => editor?.chain().focus().setHeading({ level: 3 }).run()}
          className="px-2 py-1 border rounded"
        >
          H3
        </button>
      </div>
      <EditorContent
        editor={editor}
        className="border p-2 rounded min-h-[200px]"
      />
    </div>
  );
}
