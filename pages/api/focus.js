import Table from '../../utils/airtable'
import { runMiddleware, cors } from '../../utils/cors'

export default async function handler(req, res) {
    try {
        await runMiddleware(req, res, cors)

        if (req.method === 'POST') {
            console.log(req.body)
            const { type, project } = req.body

            const table = new Table('Working')
            const latestRecord = await table.getLatest()
            const projectName = project || latestRecord.fields.project

            const payload = {
                record_type: type === 'Work' ? 'start' : 'end',
                date: new Date(),
                working_type: ['dmc', 'enduser'].includes(projectName)
                    ? 'work'
                    : 'personal',
                project: projectName,
            }

            table.create(payload)
            res.json({ message: 'Record saved.' })
        }
    } catch (error) {
        res.status(400).json({ message: 'Error' })
    }
}
