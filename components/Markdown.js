import React from 'react'
import { Code, Heading, List, ListItem, Image as ChImage, Text, VStack, Box, HStack, Link } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import emoji from 'emoji-dictionary'

const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name))

const Image = ({ src, alt, title }) => {
    return (
        <VStack my={12} spacing={2}>
            <ChImage src={src} alt={alt} />
            <Text fontSize="sm" align="center">{title}</Text>
        </VStack>
    )
}

const Blockquote = ({ children }) => {
    return (
        <Text as="blockquote" pl={8} borderLeft="4px" borderColor="teal.400" color="red.200">{children}</Text>
    )
}

const Divider = () => {
    const props = {
        as: "span",
        w: "8px",
        h: "8px",
        borderRadius: "full",
        bg: "gray.500"
    }
    return (
        <HStack my={12} justifyContent="center" spacing={8}>
            <Box {...props}></Box>
            <Box {...props} w="5px" h="5px"></Box>
            <Box {...props}></Box>
        </HStack>
    )
}

const Header = ({ level, children }) => {
    const tag = `h${level}`
    const sizes = {
        h6: "xs",
        h5: "sm",
        h4: "md",
        h3: "md",
        h2: "lg",
        h1: "xl"
    }
    return (
        <Heading variant="markdown" as={tag} size={sizes[tag]} children={children} />
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
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14
                }
            }}>
            {value}
        </SyntaxHighlighter>
    )
}

const renderers = {
    list: ({ children }) => <List px={8} color="gray.400" styleType="circle" spacing={8} children={children} />,
    listeItem: ({ children }) => <ListItem children={children} />,
    paragraph: ({ children }) => <Text children={children} py={4} as="span" d="block" />,
    inlineCode: ({ children }) => <Code colorScheme="teal" fontFamily="body" px={2} borderRadius={6} children={children} />,
    link: ({ children }) => <Link color="teal.400" children={children} />,
    thematicBreak: Divider,
    code: CodeBlock,
    text: emojiSupport,
    heading: Header,
    image: Image,
    blockquote: Blockquote
}

export default function ArticleDetail({ content }) {
    return (
        <ReactMarkdown linkTarget="_blank" allowDangerousHtml plugins={[gfm]} renderers={renderers} source={content} />
    )
}