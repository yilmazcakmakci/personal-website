const readTime = (string) => {
    const wordPerMinute = 200
    const wordCount = string.split(' ').length

    return Math.round(wordCount / wordPerMinute)
}

export default readTime
