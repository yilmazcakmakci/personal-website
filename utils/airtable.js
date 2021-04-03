import Airtable from 'airtable'

export default class Table {

    constructor(table) {
        this.base = new Airtable({
            apiKey: process.env.NEXT_PUBLIC_API_KEY
        }).base(process.env.NEXT_PUBLIC_BASE)

        this.table = this.base(table)
    }

    async getAll() {
        const data = await this.table.select({
            sort: [{ field: 'xdate', direction: 'desc' }]
        }).all()

        const clearedData = this.clearData(data)

        return clearedData.filter(r => r.done)
    }

    async getBySlug(slug) {
        const data = await this.table.select({
            filterByFormula: `({slug} = '${slug}')`
        }).all()

        const clearedData = this.clearData(data)
        
        return clearedData[0]
    }

    clearData(records) {
        return records.map(record => ({
            ...record.fields,
            media: record.fields.media ? record.fields.media[0].url : null
        }))
    }
}