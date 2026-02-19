"use client";

import React, { useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

interface ContentViewerProps {
    content: string;
}

export default function ContentViewer({ content }: ContentViewerProps) {
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (rootRef.current) {
            rootRef.current.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightElement(block as HTMLElement);
            });
        }
    }, [content]);

    return (
        <>

            <div
                ref={rootRef}
                className="prose prose-invert prose-lg max-w-none 
                    prose-headings:text-white prose-headings:font-bold
                    prose-p:text-gray-300 prose-p:leading-relaxed
                    prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                    prose-strong:text-white
                    prose-code:bg-white/5 prose-code:px-1 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
                    prose-img:rounded-lg prose-img:border prose-img:border-white/10
                    prose-li:text-gray-300"
                dangerouslySetInnerHTML={{
                    __html: content.replace(/<\/pre>\s*<pre[^>]*>/gi, '\n')
                }}
            />
        </>
    );
}
