import { Container, useMediaQuery } from "@chakra-ui/react";
import Header from './Header'
import { motion } from 'framer-motion'

const Layout = ({ children }) => {
    const config = {
        type: "spring",
        damping: 20,
        stiffness: 100
    }

    const [isDesktop] = useMediaQuery("(min-width: 1200px)")

    return (
        <Container maxW="3xl" minH="100vh" pb={32}>
            <Header />
            {
                isDesktop ? (
                    <motion.div
                        transition={config}
                        initial={{ skewX: '10deg', opacity: 0, transformOrigin: 'top left' }}
                        animate={{ skewX: '0deg', opacity: 1 }}
                        exit={{ x: 0, opacity: 0 }}
                    >
                        {children}
                    </motion.div>
                ) : (
                    <div>{children}</div>
                )
            }
        </Container>
    )
}

export default Layout