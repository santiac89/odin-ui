import React, { Component } from 'react';
import {Card, CardTitle, CardHeader} from 'material-ui/Card';
import config from 'config';

import './style.css';

export default class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = { isFetching: false, settings: undefined };
  }

  refresh = () => {
    fetch(`http://${config.odin.host}:${config.odin.port}/settings').then(response =>
      response.json().then(json => this.setState({ settings: json, isFetching: false }))
    )
  }

  componentDidMount = () => {
    this.refresh();
  }

  render() {
    return (<div className="settings-screen">
      <div className="settings-cards-container">
      <Card style={{ marginBottom: 15 }}>
        <CardTitle title="WebTorrent" />
        <CardHeader title="Download path" subtitle={this.state.settings && this.state.settings.webtorrent.paths.download} />
        <CardHeader title="Watch path" subtitle={this.state.settings && this.state.settings.webtorrent.paths.watch} />
      </Card>
      <Card style={{ marginBottom: 15 }}>
        <CardTitle title="Dropbox" />
        <CardHeader title="Token" subtitle={this.state.settings && this.state.settings.dropbox.token} />
        <CardHeader title="Torrents path" subtitle={this.state.settings && this.state.settings.dropbox.torrentsPath} />
      </Card>
      <Card>
        <CardTitle title="Pushbullet" />
        <CardHeader title="Token" subtitle={this.state.settings && this.state.settings.pushbullet.token} />
      </Card>
      </div>
    </div>)
  }
}
