import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints, mode } from '@chakra-ui/theme-tools'

const config = {
    initialColorMode: 'system',
    useSystemColorMode: false,
}

const theme = extendTheme({
    config,
    components: {
        Text: {
            baseStyle: props => ({
                color: mode('gray.800', 'gray.300')(props),
            }),
        },
        Heading: {
            variants: {
                markdown: props => ({
                    color: mode('blue.700', 'blue.400')(props),
                    pt: 8,
                    pb: 4,
                }),
            },
        },
    },
    breakpoints: createBreakpoints({
        sm: '420px',
        md: '600px',
        lg: '960px',
        xl: '1200px',
    }),
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
        mono: 'Audiowide, cursive',
    },
    styles: {
        global: props => ({
            body: {
                bg: mode('gray.100', '#0D0F16')(props),
                overflowY: 'scroll'
            },
            '::-webkit-scrollbar': {
                width: '10px',
            },
            '::-webkit-scrollbar-track': {
                bg: mode('gray.100', '#0D0F16')(props),
            },
            '::-webkit-scrollbar-thumb': {
                bg: mode('gray.200', 'gray.700')(props),
                borderRadius: 'full',
            },
            '::selection': {
                bg: mode('blue.200', 'blue.800')(props),
                color: mode('blue.900', 'white')(props),
            },
        }),
    },
})

export default theme
