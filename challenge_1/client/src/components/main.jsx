import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Header from './header.jsx';
import { Button, Icon } from 'react-materialize';
import axios from 'axios';

class Main extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      infoOnPage: undefined
    };
    axios.get(`http://localhost:3000/api/events?_page=${this.state.currentPage}&_limit=10`).then(({ data }) => {
      console.log('query worked', data);
      this.setState({ infoOnPage: data });
    });
  }

  render() {
    // console.log(this.state.);
    return (
      <React.Fragment>
        <Header />
      </React.Fragment>
    );
  }
}
// <Button waves="light">
// EDIT ME<Icon left>save</Icon>
// </Button>

export default hot(module)(Main);
