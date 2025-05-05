import { extractCO2, readStoredData, sensorLocations } from "@/lib/data";
import { GOOGLE_API_KEY, OPENSTREETMAP_API_KEY } from "@/lib/env";
import MapFrame from "./mapframe";

export default function Page() {
    const co2data = extractCO2();
    return (
        <MapFrame
            data={{ co2: co2data, sensors: sensorLocations }}
            apiKeys={{
                google: GOOGLE_API_KEY,
                openstreetmap: OPENSTREETMAP_API_KEY,
            }}
        />
    );
}
