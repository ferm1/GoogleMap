import React, { Component } from 'react';
import { Input, Select, Button } from 'antd';

import './search.scss';
const { Option } = Select;

class Search extends Component {
    render() {
        return (
        <div className='search-component'>
            <form className='search-component-form'>
                <div>
                    <Input
                    name='query'
                    className='search'
                    size='large'
                    placeholder='search for (e.g Hardware)'
                    value={this.props.query}
                    onChange={(event) => this.props.onChange(event)}
                    />
                </div>
                <div>
                    <div className='search-option'>
                        <Input.Group compact>
                            <Input 
                              value={this.props.distance}
                              name='distance'
                              onChange={(event) => this.props.onInputChange (event)}
                            />
                            <Select defaultValue='Distance'>
                              <Option value='Distance'>Distance (km)</Option>
                              <Option value='Current location'>Current location</Option>
                            </Select>
                            <Button
                            className='btn-search'
                            type='primary'
                            shape='round'
                            size='medium'
                            htmltype='submit'
                            >
                             SEARCH
                            </Button>
                         </Input.Group>
                    </div>
                </div>
            </form>
        </div>
         );  
    }
}

export default Search; 