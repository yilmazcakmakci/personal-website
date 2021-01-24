import { VStack, Link, Text, Box, Flex, HStack, Tag } from '@chakra-ui/react'
import Layout from '../../components/Layout'
import Image from '../../components/Image'
import NextLink from 'next/link'
import Table from '../../utils/airtable'
import formatDate from '../../utils/format-date'
import slug from 'slug'

export default function Projects({ projects }) {
    return (
        <Layout>
            <VStack mt={12} spacing={20}>
                {
                    projects.map(p => (
                        <NextLink key={p.id} href={`/projects/${slug(p.project_name)}-${p.id}`} passHref>
                            <Link
                                _focus={{ boxShadow: 'none' }}
                                _hover={{ backgroundColor: 'gray.800' }}
                                borderRadius={6}
                                display="flex"
                                p={4}
                                w="full"
                            >
                                {
                                    p.media && (
                                        <Image
                                            src={p.media}
                                            alt={p.title}
                                            width={256}
                                            height={192}
                                            borderRadius={4}
                                        />
                                    )
                                }
                                <Flex w="full" pl={8} direction="column">
                                    <Flex justify="space-between">
                                        <Text fontSize={[20, 24]} fontWeight="semibold">{p.project_name}</Text>
                                        <HStack spacing={4}>
                                            {
                                                p.tags.map(tag => (
                                                    <Tag key={tag} colorScheme="teal" variant="subtle" size="sm">{tag}</Tag>
                                                ))
                                            }
                                        </HStack>
                                    </Flex>
                                    <Text display="block" as="i" fontSize={12}>{formatDate(p.date)}</Text>
                                    <Text mt="auto" fontSize={16} noOfLines={2}>{p.description}</Text>
                                </Flex>
                            </Link>
                        </NextLink>
                    ))
                }
            </VStack>
        </Layout>
    )
}

export async function getStaticProps() {
    const table = new Table('Projects')
    const projects = await table.getAll()

    return {
        props: { projects }
    }
}
