import React from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

import config from '../../../config';

import './style.css';

const LibraryCard = ({ name, path, image, startStreaming }) => (
  <Card className="library-card">
    <img src={`http://${config.odin.host}:${config.odin.port}${image}`} />
    <CardTitle title={name} titleStyle={{ fontSize: 15 }} />
    <CardActions className='card-actions'>
      <FlatButton label="Watch" primary={true} onTouchTap={() => startStreaming(path)} />
    </CardActions>
  </Card>
);

export default LibraryCard;