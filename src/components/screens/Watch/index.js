import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import querystring from 'querystring';

import CenteredCircularProgress from '../../common/CenteredCircularProgress';
import config from '../../../config';

import './style.css';

export default class Watch extends Component {

  constructor(props) {
    super(props);
    this.state = { url: '', torrentPath: '', isFetchingPlayer: false, isPlayingMovie: false, isFetchingMovie: false, params: '', playerHtml: '' };
  }

  startPlayer = () => {
    const player = document.querySelector('.player');
    player.oncanplay = () => {
      this.setState({ isFetchingMovie: false, isPlayingMovie: true })
      player.play()
    }
  }

  startStreaming = () => {
    this.setState({ isFetchingPlayer: true, isFetchingMovie: true });

    const params = querystring.stringify({ url: this.state.url })

    fetch(`http://${config.odin.host}:${config.odin.port}/watch?${params}`)
      .then(response => response.json())
      .then(json => this.setState({ playerHtml: json.html, torrentPath: json.path, isFetchingPlayer: false }))
      .then(this.startPlayer)
      .catch(err => this.setState({ playerHtml: '', isFetchingPlayer: false, isFetchingMovie: false }))
  }

  handleChange = (event) => this.setState({ url: event.target.value });

  onSubtitleUpload = () => {
    var data = new FormData()

    data.append('file', this.upload.files[0]);

    const params = querystring.stringify({ path: this.state.torrentPath });

    fetch(`http://${config.odin.host}:${config.odin.port}/subtitles?${params}`, {
      method: 'POST',
      body: data
    })
  }

  render() {
    return (<div className="watch-screen">
      <Toolbar>
        <ToolbarGroup style={{ width: '100%' }}>
          <TextField hintText="Torrent URL or Magnet Link" onChange={this.handleChange} fullWidth={true}/>
        </ToolbarGroup>
        <ToolbarGroup>
         <RaisedButton label="Watch" primary={true} onTouchTap={this.startStreaming} />
         { this.state.isPlayingMovie &&
           <div>
              <RaisedButton primary={true} label='+ Subtitle' onClick={(e) => this.upload.click() } />
              <input type="file" name="subtitle" onChange={this.onSubtitleUpload} ref={(ref) => this.upload = ref} style={{ display: 'none' }} />
           </div>
         }
        </ToolbarGroup>
      </Toolbar>
        { (this.state.isFetchingPlayer || this.state.isFetchingMovie) && <CenteredCircularProgress /> }
        { !this.state.isFetchingPlayer && <div className="video-container" dangerouslySetInnerHTML={{__html: this.state.playerHtml}} /> }
    </div>)
  }
}
