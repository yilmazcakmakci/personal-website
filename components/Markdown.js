import React from 'react'
import { Code, Heading, List, ListItem, Image as ChImage, Text, VStack, Box, HStack, Link, useMediaQuery } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import emoji from 'emoji-dictionary'
import Zoom from 'react-medium-image-zoom'

const emojiSupport = text => text.value.replace(/:\w+:/gi, name => emoji.getUnicode(name))

const Image = ({ src, alt, title }) => {
    const [isDesktop] = useMediaQuery("(min-width: 1200px)")

    return (
        <VStack my={12} spacing={2}>
            <Zoom zoomMargin={isDesktop ? 300 : 0} overlayBgColorStart='#0D0F16' overlayBgColorEnd="#0D0F16">
                <ChImage src={src} alt={alt} />
            </Zoom>
            {title && <Text fontSize="sm" align="center">{title}</Text>}
        </VStack>
    )
}

const Blockquote = ({ children }) => {
    return (
        <Text as="blockquote" my={8} pl={8} borderLeft="4px" borderColor="cyan.600" color="red.200">{children}</Text>
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
            style={nightOwl}
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
    list: ({ children }) => <List px={8} color="gray.300" styleType="circle" spacing={8} children={children} />,
    listeItem: ({ children }) => <ListItem children={children} />,
    paragraph: ({ children }) => <Text children={children} py={4} as="span" d="block" />,
    inlineCode: ({ children }) => <Code colorScheme="cyan" fontFamily="body" px={2} borderRadius={6} children={children} />,
    link: ({ children, href, target }) => <Link color="cyan.600" children={children} href={href} target={target} />,
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