import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import Header from './header.jsx';
import { Button, Icon, Collection, CollectionItem, Badge, Pagination } from 'react-materialize';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import KeyboardEventHandler from 'react-keyboard-event-handler';

var getPageData = (pageNumber, requestLimit, callback) => {
  axios.get(`http://localhost:3000/api/events?_page=${pageNumber}&_limit=${requestLimit}`).then(data => {
    callback(data);
  });
};

class Main extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      itemsPerPage: 10,
      infoOnPage: undefined,
      totalPages: undefined
    };
    getPageData(this.state.currentPage, this.state.itemsPerPage, ({ data, headers: { link } }) => {
      console.log('Link', link.split(','));
      // some janky way of extracting the last page info from header
      var maxPage = link
        .split(',')[2]
        .split('page=')[1]
        .split('&_limit')[0];
      console.log({ maxPage });
      this.setState({ infoOnPage: data, totalPage: maxPage });
    });
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  handleChangePage(event) {
    console.log(event);
    this.setState({ currentPage: event.selected }, () => {
      getPageData(this.state.currentPage, this.state.itemsPerPage, ({ data, headers: { link } }) => {
        this.setState({ infoOnPage: data });
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <Header />

        <KeyboardEventHandler
          handleKeys={['all']}
          onKeyEvent={key => {
            console.log(key);
            // props.setEventKey(key);
          }}
        />

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

        <ReactPaginate previousLabel={'previous'} nextLabel={'next'} breakLabel={<a href="">...</a>} breakClassName={'break-me'} pageCount={this.state.totalPage ? this.state.totalPage : 20} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={this.handleChangePage} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'} />
      </React.Fragment>
    );
  }
}
// <Button waves="light">
// EDIT ME<Icon left>save</Icon>
// </Button>

/*
{"date": "-298", "description": "The Samnites defeat the Romans under Lucius Cornelius Scipio Barbatus in the Battle of Camerinum, first battle of the Third Samnite War.", "lang": "en", "category1": "By place", "category2": "Roman Republic", "granularity": "year"} */

export default hot(module)(Main);
