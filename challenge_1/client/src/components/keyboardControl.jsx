import React from 'react';
import KeyboardEventHandler from 'react-keyboard-event-handler';
import { hot } from 'react-hot-loader';

const KeyboardControl = ({ handleChangePage, currentPage }) => (
  <KeyboardEventHandler
    handleKeys={['all']}
    onKeyEvent={key => {
      if (key === 'left') {
        handleChangePage(currentPage - 1);
      }
      if (key === 'right') {
        handleChangePage(currentPage + 1);
      }
    }}
  />
);

export default hot(module)(KeyboardControl);
