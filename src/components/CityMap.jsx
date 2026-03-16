import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

const cityCoordinates = {
  Edinburgh: [55.9533, -3.1883],
  Tokyo: [35.6762, 139.6503],
  "San Francisco": [37.7749, -122.4194],
  "New York": [40.7128, -74.0060],
  London: [51.5072, -0.1276],
  Sidney: [-33.8688, 151.2093], 
  Singapore: [1.3521, 103.8198]
}

function CityMap({ mapCities }) {

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden">

        <MapContainer
            center={[20,0]}
            zoom={2}
            className="h-full w-full"
        >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        {mapCities.map(city => {
            const coords = cityCoordinates[city]
            
            if (!coords) return null
            
            return (
                <Marker key={city} position={coords}>
                <Popup>
                    <div className="text-sm font-medium">{city}</div>
                </Popup>
            </Marker>
            )
        })}

        </MapContainer>
    </div>
  )
}

export default CityMap;