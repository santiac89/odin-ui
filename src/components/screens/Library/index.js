import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
import querystring from 'querystring';

import LibraryCard from '../../common/LibraryCard';
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
      playerHtml: ''
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
    setTimeout(() => document.querySelector('.player').play(), 4000)
  }

  startStreaming = (path) => {
    const params = querystring.stringify({ path })
    fetch(`http://${config.odin.host}:${config.odin.port}/diskPlayer?${params}`)
      .then(response => response.text())
      .then(playerHtml => this.setState({ playerHtml, isFetchingPlayer: false }))
      .then(this.startPlayer)
  }

  render() {
    return (
      <div className="library-screen">
        <div className="cards-container">
        { this.state.isFetchingLibrary && <CircularProgress size={60} thickness={7} /> }
        { !this.state.isFetchingLibrary && this.state.files.map(file =>
          <LibraryCard key={file.path} name={file.name} path={file.path} startStreaming={this.startStreaming} />
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
