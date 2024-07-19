// components/ui/TypewriterTitle.tsx
'use client';
import React from 'react'
import Typewriter from 'typewriter-effect'

type Props = {}
const customStringSplitter = (str) => {
    return [...str];
};

// 文本一个一个显示出来的效果
const TypewriterTitle = (props: Props) => {
    return (
        <Typewriter
            options={{
                // emoji会乱码, 用这个解决
                stringSplitter: customStringSplitter,
                loop: true
            }}
            onInit={(typewriter) => {
                typewriter
                    .typeString("🚀 Supercharged Productivity.")
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString("🤖 AI-Powered Insights.")
                    .start();
            }}
        />
    )
}

export default TypewriterTitle