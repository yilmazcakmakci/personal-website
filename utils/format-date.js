import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const formatDate = (date) => {
    const formattedDate = dayjs(new Date(date)).format('MMM D, YYYY')
    const relativeDate = dayjs(new Date(date)).fromNow()
    
    return `${formattedDate} (${relativeDate})`
}

export default formatDate
