import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents
} from "react-leaflet";

import { useState } from "react";

import L from "leaflet";

import "leaflet/dist/leaflet.css";



// FIX DEFAULT MARKER ISSUE

delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});



type Props = {

  setCoordinates: React.Dispatch<
    React.SetStateAction<{
      lat: number | null;
      lng: number | null;
    }>
  >;
};



function LocationMarker({ setCoordinates }: Props) {

  const [position, setPosition] =
    useState<[number, number] | null>(null);



  useMapEvents({

    click(e) {

      const lat = e.latlng.lat;

      const lng = e.latlng.lng;



      setPosition([lat, lng]);



      setCoordinates({

        lat,
        lng
      });
    }
  });



  return position ? (
    <Marker position={position} />
  ) : null;
}



export default function MapSelector({
  setCoordinates
}: Props) {

  return (

    <MapContainer

      center={[20.5937, 78.9629]}

      zoom={5}

      scrollWheelZoom={true}

      className="h-[500px] w-full rounded-3xl z-0"
    >

      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <LocationMarker
        setCoordinates={setCoordinates}
      />

    </MapContainer>
  );
}