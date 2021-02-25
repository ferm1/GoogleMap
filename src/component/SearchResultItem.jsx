import React, { Component } from 'react';
import { PushpinOutlined, TagOutlined} from '@ant-design/icons';
import './search-result-item.scss';

class SearchResultItem extends Component {
    render(){
        const { result } = this.props;
        const tags = result.tags.split(',');
        return(
            <div className='search-result-item'>
                <div className='result-item__name'>
                    <span>{ result.name}</span>
                    <span className='result_item__distance'>{ result.distance.toFixed(2)} KM</span>
                </div>
                <div className='result-item__description'>
                    <PushpinOutlined />
                    <span>{ result.address}</span>
                </div>
                <div>
                    <TagOutlined />
                    {tags && tags.map((tag, index) => <span key={index} className='tags'>{tag}</span>)}
                </div>
            </div>
        );
    }
}

export default SearchResultItem;