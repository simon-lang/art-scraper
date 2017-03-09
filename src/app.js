const _ = require('lodash')
const fs = require('fs')
const argv = require('yargs').argv

const countries = require('./countries')
const countryNames = _.values(countries)
const types = require('./types')
const csvWriter = require('./csv')

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

      const [title, gallery] = arr
      let location
      let country
      if (_.includes(countryNames, arr[3])) {
        location = arr[2]
        country = arr[3]
      } else if (_.includes(countryNames, arr[2])) {
        country = arr[2]
      }
      let item = {
        title,
        gallery,
        location,
        country,
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

if (argv.silent) {
  // noop
} else if (argv.json) {
  const json = JSON.stringify(output)
  console.log(json)
} else {
  const csv = csvWriter(output)
  console.log(csv)
}
