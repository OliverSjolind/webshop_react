const queryString = require('query-string');

export const handleQueryParams = (query, newQuery) => {
    var parsed = queryString.parse(query);
    let queryKeys = Object.keys(parsed)
    let queryValues = Object.values(parsed)
    newQuery = newQuery.split('=');
    let key = newQuery[0];
    let value = newQuery[1];
    parsed[key] = value
    let txt = '?'
    txt += queryString.stringify(parsed);
    return txt
}

export const removeQueryParam = (query, queryToDel) => {
    var parsed = queryString.parse(query);
    delete parsed[queryToDel]
    let txt = '?'
    txt += queryString.stringify(parsed);
    return txt
}