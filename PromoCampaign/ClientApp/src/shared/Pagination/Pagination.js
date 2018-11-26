import React, { Component } from 'react';
import './Pagination.scss';

class Pagination extends Component {

    shouldComponentUpdate(nextProps) {
        if (this.props.currentPage === 1 ||
                this.props.currentPage !== nextProps.currentPage) {
                    return true;
                }

        return false;
    }

	changePage = (page) => {
		this.setState({currentPage: page})
		this.props.onChangePage(page);
	}

	previous = () => {
		if (this.props.currentPage === 1)
            return;
        
        const page = this.props.currentPage - 1;
            
        this.setState({
            currentPage: page
        });

        this.props.onChangePage(page);
	}

	next = (totalPages) => {
		if (this.props.currentPage === totalPages)
            return;
        
        const page = this.props.currentPage + 1;
            
        this.setState({
            currentPage: page
        });
        this.props.onChangePage(page);
    }
    

    render() {
        const pagesCount = Math.ceil(this.props.totalItems / this.props.pageSize); 
		const pages = [];
		for (var i = 1; i <= pagesCount; i++)
            pages.push(i);

        let nav = null;

        if (this.props.totalItems > this.props.pageSize) {
            const previousArrowClass = this.props.currentPage === 1 
                ? 'disabled'
                : '';

            const previousArrow = (
                <li className={previousArrowClass}>
                    <a onClick={this.previous} aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
            );
            
            const pageNumbers = pages
                .map(p => {
                    const classes = this.props.currentPage === p 
                        ? 'active'
                        : '';
                    return (
                        <li 
                            key={p}
                            className={classes} 
                            onClick={(event) => this.changePage(p)}>
                            <a>{ p }</a>
                        </li>
                    );
                });
            const nextArrowClass = this.props.currentPage === pages.length
                ? 'disabled'
                : '';
    
            const nextArrow = (
                <li className={nextArrowClass}>
                    <a onClick={() => {this.next(pages.length)}} aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            );

            nav = (
                <nav>
                    <ul className="pagination">
                        {previousArrow}
                        {pageNumbers}
                        {nextArrow}
                    </ul>
                </nav>
            );
        }
        return (
            <nav >
                <ul className="pagination">
                    {nav}
                </ul>
            </nav> 
        );
    }
}

export default Pagination;