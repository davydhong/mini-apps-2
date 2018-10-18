import React from 'react';
import { hot } from 'react-hot-loader';
import ReactPaginate from 'react-paginate';

const Pagination = ({ currentPage, totalPage, handleChangePage }) => {
  return (
    <div style={{ textAlign: 'center' }} className="pagination-container">
      <ReactPaginate previousLabel={'previous'} nextLabel={'next'} breakLabel={<a href="">...</a>} forcePage={currentPage - 1} breakClassName={'break-me'} pageCount={totalPage ? totalPage : 20} marginPagesDisplayed={2} pageRangeDisplayed={5} onPageChange={handleChangePage} containerClassName={'pagination'} subContainerClassName={'pages pagination'} activeClassName={'active'} />
    </div>
  );
};
export default hot(module)(Pagination);
