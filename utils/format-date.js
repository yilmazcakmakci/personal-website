import dayjs from 'dayjs'

const formatDate = (date, format = 'MMM D, YYYY') => {
    return dayjs(new Date(date)).format(format)
}

export default formatDate
