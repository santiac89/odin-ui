import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import querystring from 'querystring';

import LibraryCard from '../../common/LibraryCard';
import CenteredCircularProgress from '../../common/CenteredCircularProgress';
import config from '../../../config';

import './style.css';

export default class Library extends Component {

  constructor(props) {
    super(props)
    this.state = {
      files: null,
      isFetchingLibrary: true,
      isFetchingPlayer: true,
      streamUrl: '',
      snackbar: false,
      message: '',
      playerHtml: '',
      selectedMoviePath: ''
    }
  }

  componentDidMount = () => this.refresh()

  handleRequestClose = () => this.setState({ snackbar: false })

  refresh = () => {
    fetch(`http://${config.odin.host}:${config.odin.port}/library`)
      .then(response => response.json())
      .then(files => this.setState({ files, isFetchingLibrary: false }))
  }

  startPlayer = () => {
    const player = document.querySelector('.player');
    player.oncanplay = () => { player.play() }
  }

  startStreaming = (path) => {
    const params = querystring.stringify({ path })
    fetch(`http://${config.odin.host}:${config.odin.port}/diskPlayer?${params}`)
      .then(response => response.text())
      .then(playerHtml => this.setState({ playerHtml, isFetchingPlayer: false }))
      .then(this.startPlayer)
  }

  uploadSubtitle = (path) => {
    const parts = path.split('/');
    parts.pop();
    this.setState({ selectedMoviePath: parts.join('/') });
    this.upload.click();
  }

  onSubtitleUpload = () => {
    var data = new FormData()

    data.append('file', this.upload.files[0]);
    data.append('path', this.state.selectedMoviePath);

    fetch(`http://${config.odin.host}:${config.odin.port}/subtitles`, {
      method: 'POST',
      body: data
    });
  }

  render() {
    return (
      <div className="library-screen">
        <input type="file" name="subtitle" onChange={this.onSubtitleUpload} ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
        { this.state.isFetchingLibrary && <CenteredCircularProgress /> }
        <div className="cards-container">
        { !this.state.isFetchingLibrary && this.state.files.map(file =>
          <LibraryCard
            key={file.path}
            name={file.name}
            path={file.path}
            image={file.poster}
            startStreaming={this.startStreaming}
            uploadSubtitle={this.uploadSubtitle}
          />
        )}
        </div>
        { !this.state.isFetchingPlayer && <Paper className="player-container" zDepth={1} dangerouslySetInnerHTML={{__html: this.state.playerHtml}} /> }
        <Snackbar
          open={this.state.snackbar}
          message={this.state.message}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}
