import { useEffect } from 'react';
import TagManager from 'react-gtm-module';
import { ChakraProvider } from '@chakra-ui/react'
import theme from '../theme'
import '../public/app.css'
import 'react-medium-image-zoom/dist/styles.css'

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM_KEY })
    }, [])

    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    )
}

export default MyApp
