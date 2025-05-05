"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LeafletMap({ apiKey }: { apiKey: string }) {
    return (
        <MapContainer
            center={[50.8122433016718, -1.0878638801721163]}
            zoom={13}
            scrollWheelZoom={true}
            className="min-h-[30rem] min-w-[30rem]"
        >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></TileLayer>
        </MapContainer>
    );
}
