import React, { Component } from 'react';
import{ Map as GoogleMap, GoogleApiWrapper, Marker} from 'google-maps-react';

import './map.scss';

class Map extends Component {
    render() {
        const { currentPosition } = this.props;
        return <div className='map-component'>
            <GoogleMap google={this.props.google} onGoogleApi initialCenter={currentPosition}>
                     <Marker />
                 </GoogleMap>
        </div>;
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCDS1ORV6UWK9q_FvooyR1e-uuVTryf7hE',
})(Map);