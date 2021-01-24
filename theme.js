import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    components: {
        Text: {
            baseStyle: {
                color: 'gray.400'
            }
        }
    },
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