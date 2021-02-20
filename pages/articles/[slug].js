import { getPostBySlug, getAllPosts } from '../../utils/getArticles'
import Article from '../../components/Article'
import Layout from '../../components/Layout'

export default function ArticleDetail({ article }) {
    return (
        <Layout>
            <Article content={article.content} />
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