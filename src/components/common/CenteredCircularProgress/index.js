import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const style = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  position: 'fixed',
  top: 0,
  left: 0
}

const CenteredCircularProgress = () => (
  <CircularProgress style={style} size={60} thickness={7} />
);

export default CenteredCircularProgress;