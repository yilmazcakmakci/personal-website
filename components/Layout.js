import { Container } from "@chakra-ui/react";
import Header from './Header'

const Layout = ({ children }) => {
    return (
        <Container maxW="4xl" minH="100vh">
            <Header />

            {children}
        </Container>
    )
}

export default Layout