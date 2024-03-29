import { VStack } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Post from '../../components/Post'
import Table from '../../utils/airtable'

export default function Projects({ projects }) {
    return (
        <Layout title="Projects" description="Projelerim">
            <VStack mt={12} spacing={20} mx="auto">
                {projects.map((p) => (
                    <Post key={p.slug} p={p} page="projects" />
                ))}
            </VStack>
        </Layout>
    )
}

export async function getStaticProps() {
    const table = new Table('Projects')
    const projects = await table.getAll()

    return {
        props: { projects },
    }
}
