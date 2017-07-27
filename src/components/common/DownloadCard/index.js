import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';
import CommunicationCallMade from 'react-material-icons/icons/communication/call-made';
import CommunicationCallReceived from 'react-material-icons/icons/communication/call-received';
import People from 'react-material-icons/icons/social/people';

import './style.css';

const DownloadCard = ({ item }) => (
  <Card className="download-card">
    <CardTitle title={item.name} titleStyle={{ fontSize: 15 }} />
    <CardText style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <CommunicationCallMade color="red" /> {item.uploadSpeed / 1024} Kb/s
      <CommunicationCallReceived color="green" /> {item.downloadSpeed / 1024} Kb/s
      <People color="grey" /> {item.numPeers}
    </CardText>
    <CardText>
      <LinearProgress mode="determinate" value={item.progress * 100} />
    </CardText>
  </Card>
);

export default DownloadCard;