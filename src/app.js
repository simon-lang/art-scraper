// brew install poppler
// pdftotext input.pdf
// node app.js > output.csv

const _ = require('lodash')
const fs = require('fs')
const argv = require('yargs').argv

const countries = require('./countries')
const countryNames = _.values(countries)
const types = require('./types')

let output = {}

let files = fs.readdirSync('./txt')
files.forEach((file) => {
    let years = {}
    let currentType = null
    let currentYear = null
    let text = fs.readFileSync('txt/' + file, 'utf8')
    let lines = text.split('\n')

    lines.forEach((line) => {
        line = line.trim()
        _.each(types, (aliases, type) => {
          if (line.toLowerCase() === type || _.includes(aliases, line.toLowerCase())) {
            currentType = type
          }
        })
        let year = parseFloat(line)
        if (year > 1900 && year < 2050) {
            currentYear = year
            if (years[year] === undefined) {
              years[year] = []
            }
        }
        if (years[currentYear]) {
            let arr = line.split(',').map(x => x.trim())
            if (arr.length < 3) {
                return true
            }
            // TODO: if (_.includes(countryNames, arr[3])), etc.
            let item = {
                title: arr[0],
                gallery: arr[1],
                location: arr[2],
                country: arr[3]
            }
            if (currentType) {
              item.type = currentType
            }
            years[currentYear].push(item)
        }
    })

    let artist = file.replace('.txt', '')
    output[artist] = years
})

const json = JSON.stringify(output)

const encode = (s) => {
    s = s.replace(/"/g, '\"')
    return `"${s}"`
}

if (argv.json) {
  console.log(json)
}
else {
  let csv = '"artist","year","type","title","gallery","location","country"\n'
  _.each(output, (record, artist) => {
      _.each(record, (item, year) => {
          _.each(item, (show) => {
              csv += encode(artist) + ','
              csv += encode(year) + ','
              csv += encode(show.type || '') + ','
              csv += encode(show.title) + ','
              csv += encode(show.gallery) + ','
              csv += encode(show.location) + ','
              csv += encode(show.country || '')
              csv += '\n'
          })
      })
  })
  console.log(csv)
}
