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
        searchQuery:{
            distance: 1,
            query:'',
            stores:[],
        },
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
            return [ ...mappedStores, { ...store, distance }];
        }, []);
        return stores;
    }

    onSearch(){
        const { distance, query, stores } = this.state;
        const filteredStores = this.filteredStores({ distance, query, stores});
        const searchQuery = { distance, query, stores: filteredStores };
        this.setState({ searchQuery });
    }

    filteredStores({ distance, query, stores }) {
        const filteredStores = stores.filter((store) => {
            const isStoredInRange = store.distance <= parseInt(distance);
            if ( !query || !isStoredInRange) return isStoredInRange;
            const isStoreQueried =
             store.name.toLowerCase().includes(query.toLowerCase()) ||
             store.tags.toLowerCase().includes(query.toLowerCase());
            return isStoredInRange && isStoreQueried;
        });
        return filteredStores;
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
                    onSubmit={() => this.onSearch()}
                    />
                    <div className='search-content'>
                    <Map 
                    currentPosition={this.state.currentPosition} 
                    distance={this.state.searchQuery.distance}
                    stores={this.state.searchQuery.stores}
                    />
                    <SearchResult stores={this.state.searchQuery.stores}/>
                    </div>
                </Content>
            </div>
        );
    }
}

export default Main;