import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import querystring from 'querystring';

import config from '../../../config';

import './style.css';

export default class Watch extends Component {

  constructor(props) {
    super(props);
    this.state = { url: '', isFetching: false, params: '', playerHtml: '',isFetchingPlayer: true };
  }

  startPlayer = () => {
    setTimeout(() => document.querySelector('.player').play(), 4000)
  }

  startStreaming = () => {
    const params = querystring.stringify({ url: this.state.url })
    fetch(`http://${config.odin.host}:${config.odin.port}/torrentPlayer?${params}`)
      .then(response => response.text())
      .then(playerHtml => this.setState({ playerHtml, isFetchingPlayer: false }))
      .then(this.startPlayer)
  }

  handleChange = (event) => {
    this.setState({
      url: event.target.value,
    });
  };

  render() {
    return (<div className="watch-screen">
      <Toolbar>
        <ToolbarGroup style={{ width: '100%' }}>
          <TextField hintText="Torrent URL or Magnet Link" onChange={this.handleChange} fullWidth={true}/>
        </ToolbarGroup>
        <ToolbarGroup>
         <RaisedButton label="Watch" primary={true} onTouchTap={this.startStreaming} />
        </ToolbarGroup>
      </Toolbar>
      <div className="video-container" dangerouslySetInnerHTML={{__html: this.state.playerHtml}}>
      </div>
    </div>)
  }
}
