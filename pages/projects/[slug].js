import Layout from '../../components/Layout'
import { Box, Divider, Flex, Heading, Image, Text, Button, HStack, Link, useMediaQuery } from '@chakra-ui/react'
import formatDate from '../../utils/format-date'
import Table from '../../utils/airtable'
import { FaGithub } from 'react-icons/fa'
import { CgWebsite } from 'react-icons/cg'

export default function ProjectDetail({ project }) {

    const { title, date, description, github_link, used_techs, project_link, media } = project
    const buttonStyles = { textDecoration: 'none', bg: 'teal.400', color: 'black' }

    return (
        <Layout>
            <Box px={4} mx='auto'>
                <Heading>{title}</Heading>
                <Text mt="8">{description}</Text>
                <Box mt="8">
                    <Text as="span" color="teal.400" fontWeight="600">Kullanılan Teknolojiler: </Text>
                    <Text as="span">{used_techs.join(', ')}</Text>
                </Box>

                <HStack spacing={['0', '0', '12']} mt="12" display={['block', 'block', 'flex']}>
                    <Button w={['100%', '100%', '50%']} marginBottom={[5, 5, 0]} as={Link} _hover={buttonStyles} href={github_link} isExternal leftIcon={<FaGithub size={16} />}>Source Code</Button>
                    <Button w={['100%', '100%', '50%']} as={Link} _hover={buttonStyles} href={project_link} isExternal leftIcon={<CgWebsite size={16} />}>Project</Button>
                </HStack>
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