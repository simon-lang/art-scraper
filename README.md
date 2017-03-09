# art-scraper

## Requirements

- [node](http://nodejs.org/) to run scraper
- `pdftotext` from `brew install poppler` to convert pdfs to txt

## Instructions

Store CVs in the `txt/` folder with filename `ArtistName.txt`.

Run with `node src/app.js` or if you want to save it to file, `node src/app.js > output.csv`. The scraper searches all text files in `txt/` and converts fields to a csv.

If you want json output instead run `node src/app.js --json`.

Debug json output: `node src/app.js --json | jq .` (requires `brew install jq`)

## Web UI

There is a (very) simple proof of concept web UI in `web/`.

Start a web server with `npm run web`.

Update data for web ui with: `node src/app.js --json > web/output.json`

Visit [http://127.0.0.1:8080/web/](http://127.0.0.1:8080/web/)

## Debugging

To experiment, I recommend using the `--silent` flag. For example, in the code, you can write something like:

```
if (_.includes(title, 'Gallery')) {
  console.log('Possible error: Title contains "Gallery":', i, line)
}
```

Running with `node src/app.js --silent | wc -l` will tell you there are 382 hits where these potentially bad matches occur.
