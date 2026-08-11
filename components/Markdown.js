import React from 'react'
import {
    Code,
    Heading,
    List,
    ListItem,
    Image as ChImage,
    Text,
    VStack,
    Box,
    HStack,
    Link,
    useMediaQuery,
    useColorModeValue,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown/with-html'
import gfm from 'remark-gfm'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import emoji from 'emoji-dictionary'
import Zoom from 'react-medium-image-zoom'

const emojiSupport = (text) =>
    text.value.replace(/:\w+:/gi, (name) => emoji.getUnicode(name))

const Image = ({ src, alt, title }) => {
    const [isDesktop] = useMediaQuery('(min-width: 1200px)')
    const overlayBg = useColorModeValue('#ffffff', '#0D0F16')
    const captionColor = useColorModeValue('gray.600', 'gray.400')

    return (
        <VStack my={12} spacing={2}>
            <Zoom
                zoomMargin={isDesktop ? 300 : 0}
                overlayBgColorStart={overlayBg}
                overlayBgColorEnd={overlayBg}
            >
                <ChImage src={src} alt={alt} />
            </Zoom>
            {title && (
                <Text fontSize="sm" align="center" color={captionColor}>
                    {title}
                </Text>
            )}
        </VStack>
    )
}

const Blockquote = ({ children }) => {
    const borderColor = useColorModeValue('blue.500', 'blue.600')
    const textColor = useColorModeValue('gray.600', 'gray.300')

    return (
        <Text
            as="blockquote"
            my={8}
            pl={8}
            borderLeft="4px"
            borderColor={borderColor}
            color={textColor}
        >
            {children}
        </Text>
    )
}

const Divider = () => {
    const dotColor = useColorModeValue('gray.300', 'gray.600')
    const props = {
        as: 'span',
        w: '8px',
        h: '8px',
        borderRadius: 'full',
        bg: dotColor,
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
        h6: 'xs',
        h5: 'sm',
        h4: 'md',
        h3: 'md',
        h2: 'lg',
        h1: 'xl',
    }
    return (
        <Heading
            variant="markdown"
            as={tag}
            size={sizes[tag]}
            children={children}
        />
    )
}

const CodeBlock = ({ language, value }) => {
    const codeTheme = useColorModeValue(docco, nightOwl)
    const codeBg = useColorModeValue('#f8f8ff', '#1a1b26')
    const codeBorder = useColorModeValue('1px solid #e1e4e8', '1px solid #2f3447')

    return (
        <SyntaxHighlighter
            language={language}
            style={codeTheme}
            customStyle={{
                borderRadius: 10,
                padding: '1.5em',
                margin: '24px 0',
                background: codeBg,
                border: codeBorder,
            }}
            codeTagProps={{
                style: {
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 14,
                },
            }}
        >
            {value}
        </SyntaxHighlighter>
    )
}

const renderers = {
    list: ({ children }) => {
        const textColor = useColorModeValue('gray.700', 'gray.300')
        return (
            <List
                px={8}
                color={textColor}
                styleType="circle"
                spacing={8}
                children={children}
            />
        )
    },
    listeItem: ({ children }) => <ListItem children={children} />,
    paragraph: ({ children }) => {
        const textColor = useColorModeValue('gray.700', 'gray.300')
        return (
            <Text color={textColor} children={children} py={4} as="span" d="block" />
        )
    },
    inlineCode: ({ children }) => (
        <Code
            colorScheme="blue"
            fontFamily="body"
            px={2}
            borderRadius={6}
            children={children}
        />
    ),
    link: ({ children, href, target }) => {
        const linkColor = useColorModeValue('blue.600', 'blue.400')
        return (
            <Link
                color={linkColor}
                children={children}
                href={href}
                target={target}
            />
        )
    },
    thematicBreak: Divider,
    code: CodeBlock,
    text: emojiSupport,
    heading: Header,
    image: Image,
    blockquote: Blockquote,
}

export default function ArticleDetail({ content }) {
    return (
        <ReactMarkdown
            linkTarget="_blank"
            allowDangerousHtml
            plugins={[gfm]}
            renderers={renderers}
            source={content}
        />
    )
}
