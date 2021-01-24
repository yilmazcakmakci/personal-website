import dayjs from 'dayjs'

const formatDate = (date) => {
    return dayjs(new Date(date)).format('MMM D, YYYY')
}

export default formatDate