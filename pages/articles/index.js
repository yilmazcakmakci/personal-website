import { VStack } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import { getAllPosts } from '../../utils/getArticles'
import Post from '../../components/Post'

export default function Articles({ articles }) {

    return (
        <Layout>
            <VStack mt={12} spacing={20} mx="auto">
                {
                    articles.map((p, index) => (
                        <Post key={index} p={p} page='articles' />
                    ))
                }
            </VStack>
        </Layout>
    )
}

export async function getStaticProps() {
    const articles = getAllPosts(
        [
            'title',
            'excerpt',
            'date',
            'coverImage',
            'slug',
            'content'
        ],
        'articles'
    )

    return {
        props: { articles }
    }
}
