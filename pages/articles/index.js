import { Link, Text, VStack } from '@chakra-ui/react'
import slug from 'slug'
import Layout from '../../components/Layout'
import Table from '../../utils/airtable'
import NextLink from 'next/link'
import formatDate from '../../utils/format-date'
import readTime from '../../utils/readtime'

export default function Articles({ articles }) {

    return (
        <Layout>
            <VStack mt={12} spacing={4}>
                {
                    articles.map(a => (
                        <NextLink key={a.id} href={`/articles/${slug(a.title)}-${a.id}`} passHref>
                            <Link
                                _focus={{ boxShadow: 'none' }}
                                _hover={{ backgroundColor: 'gray.800' }}
                                fontSize={[20,24]}
                                fontWeight="semibold"
                                borderRadius={6}
                                display="flex"
                                flexDirection="column"
                                p={4}
                                w="full"
                            >
                                <Text>{a.title}</Text>
                                <Text display="block" as="i" fontSize={12}>{formatDate(a.date)} · {readTime(a.content)} min read</Text>
                            </Link>
                        </NextLink>
                    ))
                }
            </VStack>
        </Layout>
    )
}

export async function getStaticProps() {
    const table = new Table('Articles')
    const articles = await table.getAll()

    return {
        props: { articles }
    }
}
