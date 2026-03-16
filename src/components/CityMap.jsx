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
    <MapContainer
      center={[20,0]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

      {mapCities.map(city => {
        const coords = cityCoordinates[city]

        if (!coords) return null

        return (
          <Marker key={city} position={coords}>
            <Popup>{city}</Popup>
          </Marker>
        )
      })}

    </MapContainer>
  )
}

export default CityMap;