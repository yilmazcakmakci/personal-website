import { getPostBySlug, getAllPosts } from '../../utils/getArticles'
import Markdown from '../../components/Markdown'
import Layout from '../../components/Layout'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import formatDate from '../../utils/format-date'
import readTime from '../../utils/readtime'

export default function ProjectDetail({ project: { title, date, content, github_link } }) {
    return (
        <Layout>
            <Box px={4}>
                title: {title}
                github: {github_link}
                <Markdown content={content} />
            </Box>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const project = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'coverImage',
        'github_link'
    ],
        'projects'
    )

    return {
        props: { project }
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'], 'projects')

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}