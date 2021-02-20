import React from 'react'
import { Code, Divider } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import emoji from 'emoji-dictionary'

const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name))

const InlineCode = ({ children }) => {
    return (
        <Code colorScheme="teal" children={children} />
    )
}

const CodeBlock = ({ language, value }) => {
    return (
        <SyntaxHighlighter
            language={language}
            style={nord}
            customStyle={{
                borderRadius: 10,
                padding: '1.5em',
                margin: '24px 0'
            }}
            codeTagProps={{
                style: {
                    fontFamily: "'JetBrains Mono', monospace;",
                    fontSize: 14
                }
            }}>
            {value}
        </SyntaxHighlighter>
    )
}

const HR = () => {
    return (
        <Divider orientation="horizontal" />
    )
}

const renderers = {
    inlineCode: InlineCode,
    code: CodeBlock,
    thematicBreak: HR,
    text: emojiSupport
}

export default function ArticleDetail({ content }) {
    return (
        <ReactMarkdown linkTarget="_blank" allowDangerousHtml plugins={[gfm]} renderers={renderers} source={content} />
    )
}