import Markdown from '../../components/Markdown'
import Layout from '../../components/Layout'
import { Box, Divider, Flex, Heading, Image, Text } from '@chakra-ui/react'
import formatDate from '../../utils/format-date'
import readTime from '../../utils/readtime'
import Table from '../../utils/airtable'


export default function ProjectDetail({ project }) {

    const { title, date, content, github_url } = project

    return (
        <Layout>
            <Box px={4} mx='auto'>
                <Box>
                    <Heading>{title}</Heading>
                </Box>
                <Divider my={8} />
                <Markdown content={content} />
            </Box>
        </Layout>
    )
}

const table = new Table('Projects')

export async function getStaticProps({ params }) {
    const project = await table.getBySlug(params.slug)

    return {
        props: { project }
    }
}

export async function getStaticPaths() {

    const projects = await table.getAll()

    return {
        paths: projects.map((project) => ({
            params: {
                slug: project.slug
            }
        })),
        fallback: false,
    }
}