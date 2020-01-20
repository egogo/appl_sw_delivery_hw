export function formatDate(date) {
    return date.toLocaleTimeString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export function formattedDates(event) {
    const firstDate = formatDate(new Date(event.starts));
    const secondDate = formatDate(new Date(event.ends));
    let formattedDates;
    if (firstDate.substring(0,10) == secondDate.substring(0,10)) {
        formattedDates = firstDate + ' - ' +  secondDate.substring(12)
    } else {
        formattedDates = firstDate + ' - ' +  secondDate
    }

    return formattedDates;
}