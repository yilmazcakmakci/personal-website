import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

const formatDate = (date) => {
    // YYYY.MM.DD formatını YYYY-MM-DD formatına çevir
    const standardDate = date.replace(/\./g, '-')
    const parsedDate = dayjs(standardDate)
    const formattedDate = parsedDate.format('MMM D, YYYY')
    const relativeDate = parsedDate.fromNow()
    
    return `${formattedDate} (${relativeDate})`
}

export default formatDate
