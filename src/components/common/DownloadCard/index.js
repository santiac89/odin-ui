import React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import LinearProgress from 'material-ui/LinearProgress';

import UploadIcon from 'material-ui/svg-icons/communication/call-made';
import DownloadIcon from 'material-ui/svg-icons/communication/call-received';
import PeopleIcon from 'material-ui/svg-icons/social/people';

import './style.css';

const DownloadCard = ({ item }) => (
  <Card className="download-card">
    <CardTitle title={item.name} titleStyle={{ fontSize: 15 }} />
    <CardText style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <UploadIcon color="red" /> {item.uploadSpeed / 1024} Kb/s
      <DownloadIcon color="green" /> {item.downloadSpeed / 1024} Kb/s
      <PeopleIcon color="grey" /> {item.numPeers}
    </CardText>
    <CardText>
      <LinearProgress mode="determinate" value={item.progress * 100} />
    </CardText>
  </Card>
);

export default DownloadCard;