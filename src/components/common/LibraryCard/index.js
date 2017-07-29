import React from 'react';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import './style.css';

const LibraryCard = ({ name, path, startStreaming }) => (
  <Card className="library-card">
    <CardTitle title={name} titleStyle={{ fontSize: 15 }} />
    <CardActions className='card-actions'>
      <FlatButton label="Watch" primary={true} onTouchTap={() => startStreaming(path)} />
    </CardActions>
  </Card>
);

export default LibraryCard;