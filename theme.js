import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const theme = extendTheme({
    components: {
        Text: {
            baseStyle: {
                color: 'gray.300'
            }
        },
        Heading: {
            variants: {
                markdown: {
                    color: 'cyan.600',
                    pt: 8,
                    pb: 4
                }
            }
        }
    },
    breakpoints: createBreakpoints({
        sm: '420px',
        md: '600px',
        lg: '960px',
        xl: '1200px'
    }),
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif',
        mono: 'Audiowide, cursive'
    },
    styles: {
        global: {
            body: {
                bg: '#0D0F16',
            },
        }
    }
})

export default theme