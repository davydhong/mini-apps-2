import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Header from './header.jsx';
import { Collection, CollectionItem, Badge } from 'react-materialize';
import axios from 'axios';
import Pginate from './pagination.jsx';
import KeyboardControl from './keyboardControl.jsx';
import Search from './search.jsx';

// ************************
//    Helper Functions
// ************************
const getPageData = (keyword, pageNumber, requestLimit, callback) => {
  axios.get(`http://localhost:3000/api/events?q=${keyword}&_page=${pageNumber}&_limit=${requestLimit}`).then(data => {
    callback(data);
  });
};

const getMaxPage = str =>
  str
    .split(',')[2]
    .split('page=')[1]
    .split('&_limit')[0];

class Main extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      searchKeyword: '',
      infoOnPage: undefined,
      totalPages: undefined
    };
    getPageData(this.state.searchKeyword, this.state.currentPage, this.state.itemsPerPage, ({ data, headers: { link } }) => {
      // extracting the last page info from header
      let maxPage = getMaxPage(link);
      this.setState({ infoOnPage: data, totalPage: maxPage });
    });
    this.handleChangePage = this.handleChangePage.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  // ************************
  //      Event Handles
  // ************************

  handleSearch(event) {
    let searchText = event.target.value;
    this.setState({ searchKeyword: searchText });
    getPageData(this.state.searchKeyword, this.state.currentPage, this.state.itemsPerPage, ({ data, headers: { link } }) => {
      // extracting the last page info from header
      let maxPage = getMaxPage(link);
      console.log({ data, maxPage });
      this.setState({ infoOnPage: data, totalPage: maxPage });
    });
  }
  handleChangePage(event) {
    this.setState({ currentPage: event.selected ? event.selected : event }, () => {
      getPageData(this.state.searchKeyword, this.state.currentPage, this.state.itemsPerPage, ({ data }) => {
        this.setState({ infoOnPage: data });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />

        <KeyboardControl handleChangePage={this.handleChangePage} currentPage={this.state.currentPage} />
        <Search handleSearch={this.handleSearch} />
        {/***********************
        //     Content Section
        // ************************/}
        <Collection id="info-container">
          {this.state.infoOnPage
            ? this.state.infoOnPage.map(({ date, description, lang, category1, category2, granularity }, idx) => (
                <CollectionItem href="" className={`${lang} ${category1} ${granularity}`} key={idx}>
                  <Badge>{date}</Badge>
                  <Badge newIcon={false}>{category2}</Badge> {description}
                </CollectionItem>
              ))
            : null}
        </Collection>
        <Pginate currentPage={this.state.currentPage} totalPage={this.state.totalPage} handleChangePage={this.handleChangePage} />
      </React.Fragment>
    );
  }
}

export default hot(module)(Main);
