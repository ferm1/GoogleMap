import React, { Component } from 'react';
import { Layout } from 'antd';
import Brand from '../features/brand/Brand';
import Search from '../features/search/Search';
import Map from '../features/map/Map';
import SearchResult from '../features/search-result/SearchResult';
import { getStores } from '../services/store';
import { haversineInKM } from '../utilities/math'

import './main.scss';

const { Content } = Layout;

class Main extends Component {
    state = {
        stores: [],
        currentPosition: null,
        query: '',
        distance: '1',
    };

    componentDidMount(){
        window.navigator.geolocation.getCurrentPosition(({ coords }) => {
            const currentPosition = {
                lat: coords.latitude,
                lng: coords.longitude,
            };
            this.setState({ currentPosition });
            this.getStores();
        });
    }

    onInputChange(event) {
        const stateKey = event.target.name;
        this.setState({ [stateKey]: event.target.value});
    }

    async getStores(){
        const { data } = await getStores();
        const stores = this.mapStoreDistance(data);
        this.setState({ stores });
    }

    mapStoreDistance(data = []){
        const stores = data.reduce((mappedStores, store) => {
            const { lat, lng } = this.state.currentPosition;
            const distance = haversineInKM(lat, lng, store.latitude, store.longitude);
            return [...mappedStores, { ...store, distance }];
        }, []);
        debugger;
        return stores;
    }

    render() {
        return (
            <div className='main-layout'>
                <Content className='content'>
                    <Brand />
                    <Search 
                    query={this.state.query} 
                    distance={this.state.distance} 
                    onChange={(event) => this.onInputChange(event)}
                    />
                    <div className='search-content'>
                    <Map currentPosition={this.state.currentPosition} />
                    <SearchResult />
                    </div>
                </Content>
            </div>
        );
    }
}

export default Main;