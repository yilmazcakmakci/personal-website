import { Container } from "@chakra-ui/react";
import Header from './Header'

const Layout = ({ children }) => {
    return (
        <Container maxW="3xl" minH="100vh" pb={32}>
            <Header />

            {children}
        </Container>
    )
}

export default Layout