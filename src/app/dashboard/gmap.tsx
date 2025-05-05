"use client";
import { Card, CardTitle } from "@/components/ui/card";
import {
    APIProvider,
    Map,
    MapCameraChangedEvent,
    AdvancedMarker,
    useMap,
    useMapsLibrary,
} from "@vis.gl/react-google-maps";
import moment from "moment";
import { SatelliteDish } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

export type MapProps = {
    time: string;
    showHeatmap: boolean;
    co2: any;
    sensors: sensorDataType;
    apiKey: string;
};

export type sensorDataType = {
    name: string;
    id: string;
    lat: string;
    lng: string;
}[];

const Heatmap = ({
    data,
    show,
    sensors,
    time,
}: {
    data: any;
    show: boolean;
    sensors: sensorDataType;
    time: number;
}) => {
    const map = useMap();
    const visualization = useMapsLibrary("visualization");

    const heatmap = useMemo(() => {
        if (!visualization) return null;
        if (show)
            return new google.maps.visualization.HeatmapLayer({
                radius: 100,
                opacity: 0.5,
            });
    }, [visualization]);

    useEffect(() => {
        if (!heatmap) return;

        const target = data.find(
            (item: any) =>
                moment(item["Timestamp"], "DD-MM-YYYY hh:mm").valueOf() == time
        );
        // console.log(target)
        if (target)
            heatmap.setData(
                sensors.map((item) => {
                    const { id, lat, lng } = item;
                    console.log(target[`CO2_${id}`]);
                    const low1 = 200;
                    const high1 = 500;
                    const low2 = 0;
                    const high2 = 1000;
                    const weight =
                        low2 +
                        ((target[`CO2_${id}`] - low1) * (high2 - low2)) /
                            (high1 - low1);

                    return {
                        location: new google.maps.LatLng(lat, lng),
                        weight: weight,
                        // weigth: 100,
                    };
                })
            );
    }, [heatmap, data, time]);

    useEffect(() => {
        if (!heatmap) return;

        heatmap.setMap(map);

        return () => {
            heatmap.setMap(null);
        };
    }, [heatmap, map]);

    return null;
};

export default function GMaps({
    showHeatmap,
    co2,
    sensors,
    time,
    apiKey,
}: {
    showHeatmap: boolean;
    co2: any;
    sensors: sensorDataType;
    time: number;
    apiKey: string;
}) {
    return (
        <APIProvider
            apiKey={apiKey}
            onLoad={() => console.log("Maps API has loaded.")}
        >
            <Map
                disableDefaultUI
                defaultZoom={13}
                defaultCenter={{
                    lat: 50.8122433016718,
                    lng: -1.0878638801721163,
                }}
                onCameraChanged={(ev: MapCameraChangedEvent) =>
                    console.log(
                        "camera changed:",
                        ev.detail.center,
                        "zoom:",
                        ev.detail.zoom
                    )
                }
                mapId="6bd0193009087678"
            >
                <Heatmap
                    data={co2}
                    show={showHeatmap}
                    sensors={sensors}
                    time={time}
                />
                {sensors.map((item, i) => {
                    return (
                        <AdvancedMarker
                            key={i}
                            position={{
                                lat: parseFloat(item.lat),
                                lng: parseFloat(item.lng),
                            }}
                        >
                            <Card className="">
                                <CardTitle className="text-center">
                                    {item.name}
                                </CardTitle>
                                <SatelliteDish className="text-center" />
                            </Card>
                        </AdvancedMarker>
                    );
                })}
            </Map>
        </APIProvider>
    );
}
