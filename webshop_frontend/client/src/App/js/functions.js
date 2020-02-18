const queryString = require('query-string');

export const handleQueryParams = (query, newQuery) => {
    var parsed = queryString.parse(query);
    let queryKeys = Object.keys(parsed)
    let queryValues = Object.values(parsed)
    newQuery = newQuery.split('=');
    let key = newQuery[0];
    let value = newQuery[1];
    let txt = ''
    let startOfQuery = '?';
    if (parsed[key]) {
        for (let i = 0; i < queryKeys.length; i++) {
            if (i > 0) {
                startOfQuery = '&';
            }
            key === queryKeys[i] ? txt += `${startOfQuery}${key}=${value}` : txt += `${startOfQuery}${queryKeys[i]}=${queryValues[i]}`
        }
    } else {
        for (let i = 0; i < queryKeys.length + 1; i++) {
            if (i > 0) {
                startOfQuery = '&';
            }
            i === queryKeys.length ? txt += `${startOfQuery}${key}=${value}` : txt += `${startOfQuery}${queryKeys[i]}=${queryValues[i]}`
        }
    }
    return txt
}