import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DownloadCard from '../../common/DownloadCard';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import Snackbar from 'material-ui/Snackbar';
import config from 'config';

import './style.css';

export default class Downloads extends Component {

  constructor(props) {
    super(props)
    this.state = { downloads: null, isFetching: true, snackbar: false, message: '' }
  }

  componentDidMount = () => this.refresh()

  refresh = () => {
    fetch('http://${config.}:3000/torrents')
      .then(response => response.json())
      .then(downloads => this.setState({ downloads, isFetching: false }))
  }

  handleRequestClose = () => this.setState({ snackbar: false })

  startDownloading = () => {
    fetch(
      `http://${config.odin.host}:${config.odin.port}/download`,
      {
        method: 'put',
        body: JSON.stringify({ url: this.state.url }),
        headers: new Headers({'content-type': 'application/json'})
      }
    ).then((response) => {
      if (response.ok) {
        this.setState({ snackbar: true, message: 'Torrent added to downloads' })
        this.refresh();
      } else {
        response.text().then(text => this.setState({ snackbar: true, message: text }))
      }
    })
  }

  handleChange = (event) => this.setState({ url: event.target.value })

  render() {
    return (
      <div className="downloads-screen">
      <Toolbar>
        <ToolbarGroup style={{ width: '100%' }}>
          <TextField hintText="Torrent URL or Magnet Link" onChange={this.handleChange} fullWidth={true}/>
        </ToolbarGroup>
        <ToolbarGroup>
         <RaisedButton label="Add" primary={true} onTouchTap={this.startDownloading} />
        </ToolbarGroup>
      </Toolbar>
        <div className="cards-container">
        { this.state.isFetching && <CircularProgress size={60} thickness={7} /> }
        { !this.state.isFetching && this.state.downloads.map(download =>
          <DownloadCard key={download.hash} item={download} />
        )}
        </div>
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
