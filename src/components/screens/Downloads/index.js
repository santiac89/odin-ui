import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';

import DownloadCard from '../../common/DownloadCard';
import CenteredCircularProgress from '../../common/CenteredCircularProgress';
import config from '../../../config';

import './style.css';

export default class Downloads extends Component {

  constructor(props) {
    super(props);
    this.state = { downloads: null, isFetching: true, isAdding: false, snackbar: false, message: '' };
  }

  componentDidMount = () => {
    this.refresh();
  }

  refresh = () => {
    fetch(`http://${config.odin.host}:${config.odin.port}/torrents`)
      .then(response => response.json())
      .then(downloads => this.setState({ downloads, isFetching: false }))
      .catch(err => this.setState({ isFetching: false, downloads: [], snackbar: true, message: err.message }));
  }

  handleRequestClose = () => this.setState({ snackbar: false });

  handleChange = (event) => this.setState({ url: event.target.value });

  startDownloading = () => {
    fetch(`http://${config.odin.host}:${config.odin.port}/torrents`, {
      body: JSON.stringify({
        url: this.state.url
      }),
      method: 'POST'
    })
    .then(response => response.json())
    .then(() => this.setState({ isFetching: false }))
    .catch(err => this.setState({ isFetching: false, snackbar: true, message: err.message }));
  }

  render() {
    return (
      <div className="downloads-screen">
      <Toolbar>
        <ToolbarGroup style={{ width: '100%' }}>
          <TextField hintText="Torrent URL or Magnet Link" onChange={this.handleChange} fullWidth={true}/>
        </ToolbarGroup>
        <ToolbarGroup>
         <RaisedButton label="Add" primary={true} disabled={this.state.isAdding} onTouchTap={this.startDownloading} />
        </ToolbarGroup>
      </Toolbar>
        { (this.state.isFetching || this.state.isAdding) && <CenteredCircularProgress /> }
        <div className="cards-container">
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
