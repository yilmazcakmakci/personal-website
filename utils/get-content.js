import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export function getAllArticles() {
  const articlesDirectory = path.join(process.cwd(), 'articles')
  const fileNames = fs.readdirSync(articlesDirectory)

  const articles = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(articlesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data: metadata, content } = matter(fileContents)

    return {
      slug,
      title: metadata.title,
      description: metadata.description,
      date: metadata.date,
      content
    }
  })

  return articles.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getArticleBySlug(slug) {
  const fullPath = path.join(process.cwd(), 'articles', `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data: metadata, content } = matter(fileContents)

  return {
    slug,
    title: metadata.title,
    description: metadata.description,
    date: metadata.date,
    content
  }
}

export default getArticleBySlug
