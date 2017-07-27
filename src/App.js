import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Route } from 'react-router';

import Downloads from './components/screens/Downloads';
import Watch from './components/screens/Watch';
import Settings from './components/screens/Settings';
import Library from './components/screens/Library';

import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import LibraryIcon from 'material-ui/svg-icons/av/video-library';

import './App.css';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { open: false, title: 'Odin' }
    this.history = props.history;
  }

  setDrawerOpenStatus = (open) => this.setState({ open });

  setTitle = (title) => {
    this.setState({ title: `Odin  -  ${title}` });
  }

  goToDownloads = () => {
    this.setTitle('Downloads');
    this.history.push('/downloads');
    this.setDrawerOpenStatus(false);
  }

  goToLibrary = () => {
    this.setTitle('Library');
    this.history.push('/library');
    this.setDrawerOpenStatus(false);
  }

  goToWatch = () => {
    this.setTitle('Watch');
    this.history.push('/watch');
    this.setDrawerOpenStatus(false);
  }

  goToSettings = () => {
    this.setTitle('Settings');
    this.history.push('/settings');
    this.setDrawerOpenStatus(false);
  }

  render() {
    return (
      <div className="app-container">
          <AppBar title={this.state.title} onLeftIconButtonTouchTap={() => this.setState({ open: true })} />
          <Drawer
            docked={false}
            width={200}
            open={this.state.open}
            onRequestChange={this.setDrawerOpenStatus}
          >
            <MenuItem className="menu-item" onTouchTap={this.goToDownloads}><DownloadIcon />Downloads</MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.goToLibrary}><LibraryIcon />Library</MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.goToWatch}><EyeIcon />Watch</MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.goToSettings}><SettingsIcon />Settings</MenuItem>
        </Drawer>
        <div className="content">
          <Route path="/downloads" component={Downloads}/>
          <Route path="/watch" component={Watch}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/library" component={Library}/>
        </div>
      </div>
    );
  }
}

export default App;
