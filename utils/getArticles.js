import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const postsDirectory = (contentType = 'articles') => join(process.cwd(), 'contents', contentType)

export function getPostSlugs(contentType) {
    return fs.readdirSync(postsDirectory(contentType))
}

export function getPostBySlug(slug, fields = [], contentType) {
    const realSlug = slug.replace(/\.md$/, '')
    const fullPath = join(postsDirectory(contentType), `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {}

    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug
        }

        if (field === 'content') {
            items[field] = content
        }

        if (data[field]) {
            items[field] = data[field]
        }
    })

    return items
}

export function getAllPosts(fields = [], contentType) {
    const slugs = getPostSlugs(contentType)
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields, contentType))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))

    return posts
}