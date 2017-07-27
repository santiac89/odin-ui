const WebTorrent = require('webtorrent-hybrid')
const validUrl = require('valid-url')
const magnet = require('magnet-uri')

const webTorrentClient = new WebTorrent()

webTorrentClient.on('error', function (err) {
  console.log(err)
});

const tmpTorrents = {}

const downloadTorrent = (magnetOrTorrent) => {
  return new Promise((resolve, reject) => {

    if (!magnetOrTorrent || (!validUrl.isUri(magnetOrTorrent) && !magnet.decode(magnetOrTorrent).infoHash)) {
      return reject('Invalid torrent URL or magnetURI.')
    }

    const torrent = tmpTorrents[magnetOrTorrent]

    if (torrent) {
      return resolve(torrent);
    }

    tmpTorrents[magnetOrTorrent] = true

    webTorrentClient.add(magnetOrTorrent, (torrent) => {
      tmpTorrents[magnetOrTorrent] = torrent

      torrent.on('done', () => {
        tmpTorrents[magnetOrTorrent] = null
        torrent.emit('completed')
      })

      resolve(torrent)
    })
  })
}

module.exports = { downloadTorrent }
