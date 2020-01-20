import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Pagination extends Component {
    render() {
        const num_pages = this.totalPages();
        const page = this.props.page;
        const pages = this.getPageNumbers().map(num => (
            <li className="page-item" key={num}>
                {page == num ? (
                    <a className="page-link">{num}</a>
                ) : (
                    <a className="page-link" href="#" onClick={() => this.props.jumpTo(num)}>{num}</a>
                )}
            </li>
        ));
        const first_page = 1;
        const last_page = num_pages;
        return (
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" href="#" onClick={() => this.props.jumpTo(first_page)}>First</a></li>
                    {pages}
                    <li className="page-item"><a className="page-link" href="#" onClick={() =>this.props.jumpTo(last_page)}>Last</a></li>
                </ul>
            </nav>
        );
    }

    getPageNumbers() {
        const num_pages = this.totalPages();
        const page = this.props.page;
        // TODO: better bounds
        if( num_pages > 5 ){
            console.log(num_pages)
            if(page == 1) {
                return [page, page + 1, page + 2, page + 3, page + 4];
            }else if(page == 2) {
                return [page-1, page, page+1, page+2, page+3];
            }else if( page == num_pages) {
                return [page-4, page-3, page-2, page-1, page];
            }else if( page == num_pages-1) {
                return [page-3, page-2, page-1, page, page+1];
            }else{
                return [page-2, page-1, page, page+1, page+2];
            }

        } else {
           return [...Array(num_pages-1).keys()].map(num => num + 1)
        }
    }

    totalPages() {
        let addon;
        if((this.props.total % this.props.per_page) == 0) {
            addon = 0
        }else{
            addon = this.props.per_page - this.props.total % this.props.per_page;
        }
        return ((this.props.total + addon) / this.props.per_page) || 1;
    }
}

Pagination.propTypes = {
    jumpTo: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    per_page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired
};


export default Pagination;
