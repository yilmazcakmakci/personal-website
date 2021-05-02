import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import '../public/app.css'
import 'react-medium-image-zoom/dist/styles.css'

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
