import Markdown from '../../components/Markdown'
import Layout from '../../components/Layout'
import { Box, Heading, Text } from '@chakra-ui/react'
import formatDate from '../../utils/format-date'
import readTime from '../../utils/readtime'
import { getAllArticles, getArticleBySlug } from '../../utils/get-content'
import ScrollToTop from '../../components/ScrollToTop'

export default function ArticleDetail({
    article: { title, date, content, description, media },
}) {
    return (
        <Layout title={title} description={description}>
            <Box px={4} mx="auto">
                <Box mb={8}>
                    <Heading color="gray.200" size="xl" mb={4}>
                        {title}
                    </Heading>
                    <Text display="block" as="i" fontSize={12}>
                        {formatDate(date)} {`· ${readTime(content)} min read`}
                    </Text>
                </Box>
                <Markdown content={content} />
                <ScrollToTop />
            </Box>
        </Layout>
    )
}

export async function getStaticProps({ params }) {
    const article = getArticleBySlug(params.slug)

    return {
        props: {
            article,
        },
    }
}

export async function getStaticPaths() {
    const articles = getAllArticles()

    return {
        paths: articles.map((article) => ({
            params: {
                slug: article.slug,
            },
        })),
        fallback: false,
    }
}
