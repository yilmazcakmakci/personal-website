import { VStack, Container } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Post from '../../components/Post'
import { getAllArticles } from '../../utils/get-content'

export default function Articles({ articles }) {
    return (
        <Layout title="Articles" description="Yazılarım">
            <Container maxW="container.md" mt={16}>
                <VStack spacing={8} align="stretch">
                    {articles.map((article) => (
                        <Post key={article.slug} p={article} page="articles" />
                    ))}
                </VStack>
            </Container>
        </Layout>
    )
}

export async function getStaticProps() {
    const articles = getAllArticles()

    return {
        props: { articles },
    }
}
