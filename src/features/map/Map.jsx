import React, { Component } from 'react';
import{ Map as GoogleMap, GoogleApiWrapper, Marker, Circle} from 'google-maps-react';

import './map.scss';

class Map extends Component {
    render() {
        const { currentPosition, distance } = this.props;
        const distanceInKm = parseFloat(distance) * 1000;
        return <div className='map-component'>
            <GoogleMap google={this.props.google} onGoogleApi initialCenter={currentPosition}>
                     <Marker />
                     <Circle 
                        center={currentPosition}
                        radius={distanceInKm}
                        strokeColor='#017ac7'
                        strokeOpacity={0.3}
                        stokeWeight={1}
                        fillColor='#017ac7'
                        fillOpacity={0.1}
                     />
                 </GoogleMap>
        </div>;
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCDS1ORV6UWK9q_FvooyR1e-uuVTryf7hE',
})(Map);