import { promises as fs } from 'fs'
import path from 'path'

const getContent = async (slug) => {
    const file = path.join(process.cwd(), 'articles', `${slug}.md`)
    const content = await fs.readFile(file, 'utf8')

    return content
}

export default getContent