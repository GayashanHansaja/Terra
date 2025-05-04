import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'

export default function CountryMapView({ latlng, countryName }) {
    if (!latlng || latlng.length !== 2) return null

    const position = [latlng[0], latlng[1]]

    return (
        <div className="h-96 overflow-hidden rounded-2xl border border-white/10 shadow-lg">
            <MapContainer
                center={position}
                zoom={5}
                scrollWheelZoom={false}
                style={{ height: '100%', width: '100%' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                    <Popup>{countryName}</Popup>
                </Marker>
            </MapContainer>
        </div>
    )
}
