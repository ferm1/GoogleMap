import React, { Component } from 'react';
import SearchResultItem from '../../component/SearchResultItem';

class SearchResult extends Component {
    render() {
        return (
            <div className='search-result-component'>
              {this.props.stores &&
                this.props.stores.map((store) => 
                   <SearchResultItem key={store.id} result={store} />
                )}
            </div>
        );
    }
}

export default SearchResult;