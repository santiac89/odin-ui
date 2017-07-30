import React, { Component } from 'react';
import {Card, CardTitle, CardMedia} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import config from '../../../config';

import './style.css';

export default class LibraryCard extends Component {
  constructor(props) {
    super(props)
    this.state = { imgFailed: false }
  }

  onError = () => {
    this.setState({ imgFailed: true })
  }

  render() {
    const { name, image, path, startStreaming } = this.props;
    let cardContent;

    if (!this.state.imgFailed) {
      cardContent = (
        <CardMedia className="overlay" overlay={
          <CardTitle title={name} titleStyle={{ fontSize: 15 }} />}>
           <img
            src={`http://${config.odin.host}:${config.odin.port}${image}`}
            onError={this.onError}
            alt={`http://${config.odin.host}:${config.odin.port}${image}`}
           />
          <FlatButton labelStyle={{ fontSize: '50px' }} className='watch-button' label="&#9658;"  onTouchTap={() => startStreaming(path)} />
        </CardMedia>
      )
    } else {
      cardContent = (
        <CardMedia className="overlay" overlay={<CardTitle title={name} titleStyle={{ fontSize: 15 }} />}>
          <img src="/placeholder.png" alt='placeholder' />
          <FlatButton labelStyle={{ fontSize: '50px' }} className='watch-button' label="&#9658;" onTouchTap={() => startStreaming(path)} />
        </CardMedia>
      )
    }

    return (<Card className="library-card">{cardContent}</Card>)
  }
}
