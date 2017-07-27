import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './style.css';

const LibraryCard = ({ name, path, startStreaming }) => (
  <Card className="library-card">
    <CardTitle title={name} titleStyle={{ fontSize: 15 }} />
    <CardText>
      <RaisedButton label="Watch" primary={true} onTouchTap={() => startStreaming(path)} />
    </CardText>
  </Card>
);

export default LibraryCard;