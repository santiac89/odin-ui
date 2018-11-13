import React, { Component } from 'react';

import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { Route, Redirect } from 'react-router';

import Downloads from './components/screens/Downloads';
import Watch from './components/screens/Watch';
import Settings from './components/screens/Settings';
import Home from './components/screens/Home';

import DownloadIcon from 'material-ui/svg-icons/file/file-download';
import SettingsIcon from 'material-ui/svg-icons/action/settings';
import EyeIcon from 'material-ui/svg-icons/image/remove-red-eye';
import ActionHome from 'material-ui/svg-icons/action/home';

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
    this.history.push('/downloads');
    this.setDrawerOpenStatus(false);
  }

  goToHome = () => {
    this.setState({ title: `Odin` });
    this.history.push('/home');
    this.setDrawerOpenStatus(false);
  }

  goToWatch = () => {
    this.history.push('/watch');
    this.setDrawerOpenStatus(false);
  }

  goToSettings = () => {
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
            <MenuItem className="menu-item" onTouchTap={this.goToHome}><ActionHome />Home</MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.goToDownloads}><DownloadIcon />Downloads</MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.goToWatch}><EyeIcon />Watch</MenuItem>
            <MenuItem className="menu-item" onTouchTap={this.goToSettings}><SettingsIcon />Settings</MenuItem>
        </Drawer>
        <div className="content">
          <Route exact path="/" render={() => <Redirect to="/home"/>}>

          </Route>
          <Route path="/downloads" component={Downloads}/>
          <Route path="/watch" component={Watch}/>
          <Route path="/settings" component={Settings}/>
          <Route path="/home" component={Home}/>
        </div>
      </div>
    );
  }
}

export default App;
