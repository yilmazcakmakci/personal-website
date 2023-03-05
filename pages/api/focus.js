import Table from '../../utils/airtable'
import { runMiddleware, cors } from '../../utils/cors'

export default async function handler(req, res) {
    try {
        await runMiddleware(req, res, cors)

        if (req.method === 'POST') {
            console.log(req.body)

            let projectName
            const table = new Table('Working')

            if (req.body.project) {
                projectName = req.body.project
            } else {
                const latestRecord = await table.getLatest()
                projectName = latestRecord.fields.project
            }

            const payload = {
                record_type: req.body.type === 'Work' ? 'start' : 'end',
                date: new Date(),
                working_type: ['dmc', 'enduser'].includes(projectName)
                    ? 'work'
                    : 'personal',
                project: projectName,
            }

            await table.create(payload)
            res.json({ message: 'Record saved.' })
        }
    } catch (error) {
        res.status(400).json({ message: 'Error' })
        console.error(error)
    }
}
