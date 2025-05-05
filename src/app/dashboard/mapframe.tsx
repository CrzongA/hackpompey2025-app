"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import moment from "moment";
import { cloneElement, ReactElement, useMemo } from "react";
import LeafletMap from "./leaflet";
import GMaps from "./gmap";
import { useState } from "react";
import { apiKeyType } from "@/lib/types";
import dynamic from "next/dynamic";

export default function MapFrame({
    data,
    apiKeys,
}: // children,
{
    data: { co2: any; sensors: { id: string; lat: string; lng: string }[] };
    apiKeys: apiKeyType;
    // children: ReactElement;
}) {
    const [showHeatmap, setShowHeatmap] = useState(true);
    const { co2, sensors } = data;
    const [time, setTime] = useState(
        moment(co2[0]["Timestamp"], "DD-MM-YYYY hh:mm").valueOf()
    );
    const LeafletWrapper = useMemo(
        () => dynamic(() => import("./leaflet"), { ssr: false }),
        []
    );

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    HackPompey
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>
                                    CO<sub>2</sub> Visualization
                                </BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <Card className="min-h-[40rem]">
                        <div className="flex flex-col w-full h-full">
                            <div className="m-2 flex flex-row w-full">
                                <Button
                                    onClick={() =>
                                        setShowHeatmap((state) => !state)
                                    }
                                >
                                    Heatmap
                                </Button>
                            </div>
                            <div className="m-2 flex flex-row">
                                <h3 className="mx-2">Time</h3>
                                <h4>
                                    {moment(time).format("MM-DD-YYYY hh:mm")}
                                </h4>
                                <Slider
                                    className="m-4"
                                    defaultValue={[time]}
                                    value={[time]}
                                    min={moment(
                                        co2[0]["Timestamp"],
                                        "DD-MM-YYYY hh:mm"
                                    ).valueOf()}
                                    max={moment(
                                        co2[co2.length - 1]["Timestamp"],
                                        "DD-MM-YYYY hh:mm"
                                    ).valueOf()}
                                    onValueChange={(val) => {
                                        // console.log(val);
                                        setTime(val[0]);
                                    }}
                                    step={3600000}
                                />
                            </div>
                            {/* <GMaps
                                showHeatmap={showHeatmap}
                                co2={co2}
                                sensors={sensors}
                                time={time}
                                apiKey={apiKeys["google"]}
                            /> */}
                            <LeafletWrapper
                                    apiKey={apiKeys["openstreetmap"]}
                                />
                            {/* <LeafletMap
                                apiKey={apiKeys["openstreetmap"]}
                                /> */}
                        </div>
                    </Card>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
