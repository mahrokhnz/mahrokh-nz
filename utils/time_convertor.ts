function TimeConvertor(time: Date) {
    return (
        new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: '2-digit',
            year: 'numeric',
        }).format(new Date(time))
    )
}

export default TimeConvertor;
