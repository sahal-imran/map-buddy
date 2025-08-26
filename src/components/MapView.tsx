import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  location?: [number, number];
}

export function MapView({
  location = [42.0433878, -87.9428176],
}: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const marker = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current, {
      center: location,
      zoom: 15,
      zoomControl: true,
      attributionControl: false,
    });

    // Add tile layer (OpenStreetMap)
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map.current);

    // Custom marker icon
    const customIcon = L.divIcon({
      className: "custom-marker",
      html: `
        <div style="
          width: 20px;
          height: 20px;
          background: hsl(38, 92%, 50%);
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        "></div>
      `,
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });

    // Add marker
    marker.current = L.marker(location, { icon: customIcon }).addTo(
      map.current
    );

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    if (map.current && marker.current) {
      marker.current.setLatLng(location);
      map.current.setView(location, 15);
    }
  }, [location]);

  return (
    <div className="relative w-full h-full bg-fleet-panel border border-fleet-border rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      <div className="absolute top-4 left-4 bg-fleet-panel/90 backdrop-blur-sm rounded-lg px-3 py-2 border border-fleet-border">
        <div className="text-xs text-fleet-text-muted">Event Location</div>
        <div className="text-sm font-medium text-foreground">
          W Huntington Commons Rd
        </div>
      </div>
    </div>
  );
}
