import React, { Component } from 'react';
import{ Map as GoogleMap, GoogleApiWrapper, Marker} from 'google-maps-react';

import './map.scss';

class Map extends Component {
    render() {
        return <div className='map-component'>
            <GoogleMap
                 google={this.props.google}
                 onGoogleApi
                 >
                     <Marker />
                 </GoogleMap>
        </div>;
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDPZeAM2Lqy7ZMp4Mo_3Zr8F0OOmmFGU24',
})(Map);