import Markdown from '../../components/Markdown'
import Layout from '../../components/Layout'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import formatDate from '../../utils/format-date'
import readTime from '../../utils/readtime'
import Table from '../../utils/airtable'
import getContent from '../../utils/get-content'


export default function ArticleDetail({ article: { title, date, content, description, media } }) {
    return (
        <Layout title={title} description={description} image={media[0]}>
            <Box px={4} mx='auto'>
                <Box mb={8}>
                    <Heading color='gray.200' size='xl' mb={4}>{title}</Heading>
                    <Flex alignItems="center">
                        <Image src="/me.png" alt='Author' boxSize='48px' borderRadius='full' mr={4} />
                        <Box>
                            <Text fontWeight={600}>Yılmaz Çakmakçı</Text>
                            <Text display="block" as="i" fontSize={12}>{formatDate(date)} {`· ${readTime(content)} min read`}</Text>
                        </Box>
                    </Flex>
                </Box>
                <Markdown content={content} />
            </Box>
        </Layout>
    )
}

const table = new Table('Articles')

export async function getStaticProps({ params }) {
    const article = await table.getBySlug(params.slug)
    const content = await getContent(params.slug)

    return {
        props: {
            article: { ...article, content }
        }
    }
}

export async function getStaticPaths() {
    const articles = await table.getAll()

    return {
        paths: articles.map(article => {
            return {
                params: {
                    slug: article.slug,
                },
            }
        }),
        fallback: false,
    }
}