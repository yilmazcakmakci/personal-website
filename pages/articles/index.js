import { VStack } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Post from '../../components/Post'
import Table from '../../utils/airtable'

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
    const table = new Table('Articles')
    const articles = await table.getAll()

    return {
        props: { articles },
    }
}
