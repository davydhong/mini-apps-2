import React from 'react';
import { Autocomplete, Row, Icon } from 'react-materialize';
import { hot } from 'react-hot-loader';
import keywords from './keywords.js';

const Search = ({ handleSearch }) => {
  return (
    <Row>
      <Autocomplete title="Keywords" limit={5} data={keywords} onChange = {handleSearch}/>
    </Row>
  );
};

export default hot(module)(Search);
