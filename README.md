# art-scraper

Use `pdftotext` from `brew install poppler` to convert pdfs to a txt. Store in the `txt/` folder.

Run with `node app.js` or if you want to save it to file, `node app.js > output.csv` to search all text files in `txt/` and convert fields to a csv.

If you want json output just edit `app.js` to log `JSON.stringify(output)` instead of `csv`.

Requires [node](http://nodejs.org/) to be installed.
