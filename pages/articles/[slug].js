import { getPostBySlug, getAllPosts } from '../../utils/getArticles'
import Article from '../../components/Markdown'
import Layout from '../../components/Layout'
import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react'
import formatDate from '../../utils/format-date'
import readTime from '../../utils/readtime'

export default function ArticleDetail({ article: { title, date, content } }) {
    return (
        <Layout>
            <Box px={4}>
                <Box mb={8}>
                    <Heading color='gray.200' size='xl' mb={4}>{title}</Heading>
                    <Flex alignItems="center">
                        <Image src="/me.png" alt='Author' boxSize='48px' borderRadius='full' mr={4} />
                        <Box>
                            <Text fontWeight={600}>Yılmaz Çakmakçı</Text>
                            <Text display="block" as="i" fontSize={12}>{formatDate(date)} {content && `· ${readTime(content)} min read`}</Text>
                        </Box>
                    </Flex>
                </Box>
                <Article content={content} />
            </Box>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const article = getPostBySlug(params.slug, [
        'title',
        'date',
        'slug',
        'author',
        'content',
        'coverImage',
    ],
        'articles'
    )

    return {
        props: { article }
    }
}

export async function getStaticPaths() {
    const posts = getAllPosts(['slug'])

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