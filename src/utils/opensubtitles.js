const https = require('https')
const fs = require('fs')
const path = require('path')
const OS = require('opensubtitles-api')

const OpenSubtitles = new OS({
  useragent: config.opensubtitles.useragent,
  username: config.opensubtitles.username,
  password: config.opensubtitles.password,
  ssl: true
});

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const request = https.get(url, (response) => {
      response.pipe(file)
      file.on('finish', function() {
        file.close()
        resolve()
      });
    });
  })
}

const downloadSubtitles = (path) => {
  const filename = path.basename(path)

  return OpenSubtitles.login()
    .then(() =>
      OpenSubtitles
        .search({ sublanguageid: config.opensubtitles.langs.join(','), filename })
        .then(subtitles =>
          Object.keys(subtitles).map(lang =>
            downloadFile(subtitles[lang].url, path.replace(/mp4$/, `${lang}.srt`))
          )
        )
        .catch(err => {
          console.log(err);
        })
    )
}

module.exports = { downloadSubtitles }