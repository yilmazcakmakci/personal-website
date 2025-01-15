import { VStack } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Post from '../../components/Post'
import { getAllArticles } from '../../utils/get-content'

export default function Articles({ articles }) {
    return (
        <Layout title="Articles" description="Yazılarım">
            <VStack mt={12} mx="auto">
                {articles.map((p) => (
                    <Post key={p.slug} p={p} page="articles" />
                ))}
            </VStack>
        </Layout>
    )
}

export async function getStaticProps() {
    const articles = getAllArticles()

    return {
        props: { articles },
    }
}
