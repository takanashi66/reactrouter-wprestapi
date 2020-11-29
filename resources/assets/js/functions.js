export function makeDate(dateTime){
    return dateTime.slice(0, -9).replace(/-/g, ".")
}