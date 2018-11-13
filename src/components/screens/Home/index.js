import React, { Component } from 'react';
import Snackbar from 'material-ui/Snackbar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import querystring from 'querystring';

import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import LibraryCard from '../../common/LibraryCard';
import CenteredCircularProgress from '../../common/CenteredCircularProgress';
import config from '../../../config';

import './style.css';

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      files: null,
      isFetchingLibrary: true,
      isFetchingPlayer: true,
      streamUrl: '',
      snackbar: false,
      message: '',
      playerHtml: '',
      selectedMoviePath: '',
      url: ''
    }
  }

  componentDidMount = () => this.refresh();

  handleRequestClose = () => this.setState({ snackbar: false });

  handleChange = (event) => this.setState({ url: event.target.value });

  refresh = () => {
    fetch(`http://${config.odin.host}:${config.odin.port}/library`)
      .then(response => response.json())
      .then(files => this.setState({ files, isFetchingLibrary: false }))
      .catch(err => this.setState({ isFetchingLibrary: false, files: [], snackbar: true, message: err.message }));
  }

  startPlayer = () => {
    const player = document.querySelector('.player');
    player.oncanplay = player.play;
  }

  startStreaming = (path) => {
    const params = querystring.stringify({ path });
    fetch(`http://${config.odin.host}:${config.odin.port}/diskPlayer?${params}`)
      .then(response => response.text())
      .then(playerHtml => this.setState({ playerHtml, isFetchingPlayer: false }))
      .then(this.startPlayer)
      .catch(err => this.setState({ error: err, isFetchingPlayer: false }));
  }

  uploadSubtitle = (path) => {
    const parts = path.split('/');
    parts.pop();
    this.setState({ selectedMoviePath: parts.join('/') });
    this.upload.click();
  }

  onSubtitleUpload = () => {
    var data = new FormData();
    data.append('file', this.upload.files[0]);
    data.append('path', this.state.selectedMoviePath);
    fetch(`http://${config.odin.host}:${config.odin.port}/subtitles`, {
      method: 'POST',
      body: data
    });
  }

  startDownloading = () => {
    this.setState({ isAdding: true });

    fetch(
      `http://${config.odin.host}:${config.odin.port}/download`,
      {
        method: 'put',
        body: JSON.stringify({ url: this.state.url }),
        headers: new Headers({'content-type': 'application/json'})
      }
    ).then((response) => {
      this.setState({ isAdding: false })

      if (response.ok) {
        this.setState({ snackbar: true, message: 'Torrent added to downloads' })
        this.refresh();
      } else {
        response.text().then(text => this.setState({ snackbar: true, message: text }))
      }
    })
    .catch(err => this.setState({ snackbar: true, message: err.message }));
  }

  // magnet:?xt=urn:btih:ba1a7c8845a1063590fb6375b60db099e9122f35&dn=Children.of.the.Corn.Runaway.2018.BRRip.XviD.AC3-XVID&tr=http%3A%2F%2Ftracker.trackerfix.com%3A80%2Fannounce&tr=udp%3A%2F%2F9.rarbg.me%3A2710&tr=udp%3A%2F%2F9.rarbg.to%3A2710

  render() {
    return (
      <div className="library-screen">
        <Toolbar>
          <ToolbarGroup style={{ width: '100%' }}>
            <TextField hintText="Torrent URL or Magnet Link" onChange={this.handleChange} fullWidth={true}/>
          </ToolbarGroup>
          <ToolbarGroup>
           <RaisedButton label="Add" primary={true} disabled={this.state.isAdding} onTouchTap={this.startDownloading} />
          </ToolbarGroup>
        </Toolbar>
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
