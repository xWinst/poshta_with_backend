import { FC } from "react";
import { GoogleMap, useJsApiLoader, MarkerF } from "@react-google-maps/api";
import s from "./Map.module.scss";

type Position = {
    lat: number;
    lng: number;
};

const Map: FC<Position> = (position) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_API_KEY || "",
    });
    return (
        <div className={s.container}>
            {isLoaded && (
                <GoogleMap
                    mapContainerStyle={{
                        width: "100%",
                        height: "100%",
                    }}
                    center={position}
                    zoom={17}
                >
                    <MarkerF position={position} />
                </GoogleMap>
            )}
        </div>
    );
};

export default Map;
