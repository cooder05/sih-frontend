import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
  MapContainerProps,
  TileLayerProps,
} from "react-leaflet";
import type { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import L from "leaflet";
import SplitText from "../components/ui/SplitText";

// Fix default marker icon
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Utility to create colored icons
const createColoredIcon = (color: string) =>
  L.icon({
    iconUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`,
    iconRetinaUrl: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|${color}`,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
  });

// HeatmapLayer component
const HeatmapLayer = ({ points }: { points: [number, number, number][] }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || points.length === 0) return;
    const layer = (L as any).heatLayer(points, {
      radius: 65,
      blur: 25,
      maxZoom: 17,
    }).addTo(map);

    return () => {
      map.removeLayer(layer);
    };
  }, [map, points]);

  return null;
};

const MapPage = () => {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<"OCEAN_DEBRIS" | "TSUNAMI_WARNING">(
    "OCEAN_DEBRIS"
  );

  const dummyHeatmapPoints: [number, number, number][] = [
    [20.5937, 78.9629, 1],
    [37.7749, -122.4194, 1],
    [51.5074, -0.1278, 1],
  ];

  const hazardMarkers = [
    { id: 1, lat: 20.5937, lng: 78.9629, type: "TSUNAMI_WARNING", description: "Dummy warning in India", color: "red", radius: 1000 },
    { id: 2, lat: 37.7749, lng: -122.4194, type: "TSUNAMI_WARNING", description: "Dummy warning in San Francisco", color: "orange", radius: 1200 },
    { id: 3, lat: 13.0827, lng: 80.2707, type: "FLOOD_ALERT", description: "Heavy rainfall causing flood risks in Chennai", color: "blue", radius: 1500 },
    { id: 4, lat: 11.748, lng: 79.768, type: "CYCLONE_WARNING", description: "Cyclone alert in Cuddalore region", color: "green", radius: 2000 },
    { id: 5, lat: 8.0883, lng: 77.5385, type: "TSUNAMI_WARNING", description: "High tsunami risk in Kanyakumari", color: "purple", radius: 2500 },
  ];

  // Save hazard markers to localStorage on mount
  useEffect(() => {
    localStorage.setItem("hazardMarkers", JSON.stringify(hazardMarkers));
    window.dispatchEvent(new Event("hazardMarkersUpdated")); // optional: notify other pages
  }, []);

  const mapCenter: LatLngExpression = [12.5, 80];
  const mapProps: MapContainerProps = {
    center: mapCenter,
    zoom: 6,
    className: "h-[500px] w-full",
  };

  const tileLayerProps: TileLayerProps = {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>',
  };

  return (
    <div className="pt-24 p-8 max-w-6xl mx-auto bg-dark-bg min-h-screen">
      <SplitText
        text="Crisis Map"
        className="text-4xl md:text-5xl font-bold text-royal-gold mb-8"
        delay={80}
        duration={0.6}
        tag="h1"
        textAlign="center"
      />
      <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">{t("homepage_about")}</p>

      {/* Data Layer Buttons */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
        <label className="text-foreground font-medium">Select Data Layer:</label>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedType("OCEAN_DEBRIS")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-elevate ${
              selectedType === "OCEAN_DEBRIS" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            Pollution Hotspots
          </button>
          <button
            onClick={() => setSelectedType("TSUNAMI_WARNING")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-elevate ${
              selectedType === "TSUNAMI_WARNING" ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground hover:bg-accent"
            }`}
          >
            Live Crisis Events
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="bg-card/50 border border-card-border rounded-lg overflow-hidden">
        <MapContainer {...mapProps}>
          <TileLayer {...tileLayerProps} />

          {selectedType === "OCEAN_DEBRIS" && dummyHeatmapPoints.length > 0 && <HeatmapLayer points={dummyHeatmapPoints} />}

          {selectedType === "TSUNAMI_WARNING" &&
            hazardMarkers.map((point) => (
              <Marker key={point.id} position={[point.lat, point.lng]} icon={createColoredIcon(point.color)}>
                <Popup>
                  <strong>{point.type.replace("_", " ")}</strong>
                  <br />
                  {point.description}
                  <br />
                  Lat: {point.lat.toFixed(4)}, Lng: {point.lng.toFixed(4)}
                </Popup>
                <Circle
                  center={[point.lat, point.lng]}
                  radius={point.radius}
                  pathOptions={{ color: point.color, fillColor: point.color, fillOpacity: 0.25 }}
                />
              </Marker>
            ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default MapPage;
