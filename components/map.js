import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';

import { Icon } from 'components';

const Map = ({ location_coordinates, zoom, address }) => {
    return (
        <div className="h-full w-full">
            <GoogleMapReact
                // style={{width: "100%", height: "500"}}
                bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY }}
                defaultCenter={{
                    lat: location_coordinates.latitude,
                    lng: location_coordinates.longitude,
                }}
                defaultZoom={zoom}>
                <LocationPin
                    lat={location_coordinates.latitude}
                    lng={location_coordinates.longitude}
                    text={address}
                />
            </GoogleMapReact>
        </div>
    );
};

const LocationPin = ({ text }) => (
    <div className="z-10">
        <span className="w-8 h-8 inline-block text-blue-500">
            <Icon name="pin" />
        </span>
        <span className="font-tertiary text-sm inline-block min-w-max-content">{text}</span>
    </div>
);

Map.propTypes = {
    location_coordinates: PropTypes.object.isRequired,
    address: PropTypes.string.isRequired,
    zoom: PropTypes.number,
};

Map.defaultProps = {
    zoom: 15,
};

export default Map;
