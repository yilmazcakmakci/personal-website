import { Container, useMediaQuery } from "@chakra-ui/react";
import Header from './Header'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { useEffect, useState } from "react";

const config = {
    type: "spring",
    damping: 20,
    stiffness: 100
}

const Layout = ({ children, title, description, image }) => {

    const [isDesktop, setIsDesktop] = useState(false)
    const [mediaQuery] = useMediaQuery("(min-width: 1200px)")

    useEffect(() => {
        setIsDesktop(mediaQuery ? true : false)
    }, [mediaQuery])

    const pageTitle = `Yılmaz Çakmakçı • ${title}`
    const url = 'https://yilmazc.com'

    return (
        <>
            <Head>

                <title>{pageTitle}</title>
                <meta name="title" content={pageTitle} />
                <meta name="description" content={description} />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={description} />


                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary" />
                <meta property="twitter:url" content={url} />
                <meta property="twitter:title" content={pageTitle} />
                <meta property="twitter:description" content={description} />

            </Head>
            <Container maxW="3xl" minH="100vh" pb={32}>
                <Header />
                {
                    isDesktop ? (
                        <motion.div
                            transition={config}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1 }}
                            exit={{ x: 0, opacity: 0 }}
                        >
                            {children}
                        </motion.div>
                    ) : (
                        <div>{children}</div>
                    )
                }
            </Container>
        </>

    )
}

export default Layout