import { VStack } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Post from '../../components/Post'
import { getAllPosts } from '../../utils/getArticles'

export default function Projects({ projects }) {
    return (
        <Layout>
            <VStack mt={12} spacing={20}>
                {
                    projects.map(p => (
                        <Post p={p} page='projects' />
                    ))
                }
            </VStack>
        </Layout>
    )
}

export async function getStaticProps() {
    const projects = getAllPosts(
        [
            'title',
            'excerpt',
            'date',
            'coverImage',
            'slug',
            'content'
        ],
        'projects'
    )

    return {
        props: { projects }
    }
}

