const _ = require('lodash')

const encode = (s = '') => {
  s = s.replace(/"/g, '\"')
  return `"${s}"`
}

module.exports = (data) => {
  let csv = '"artist","year","type","title","gallery","location","country"\n'
  _.each(data, (record, artist) => {
    _.each(record, (item, year) => {
      _.each(item, (show) => {
        csv += encode(artist) + ','
        csv += encode(year) + ','
        csv += encode(show.type || '') + ','
        csv += encode(show.title || '') + ','
        csv += encode(show.gallery || '') + ','
        csv += encode(show.location || '') + ','
        csv += encode(show.country || '')
        csv += '\n'
      })
    })
  })
  return csv
}
