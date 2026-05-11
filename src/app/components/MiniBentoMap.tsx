'use client';
import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';

const miniMarkers = [
  { id: 'mm-1', lat: 19.076, lng: 72.877, name: 'Arjun M.', skill: 'Developer' },
  { id: 'mm-2', lat: 19.095, lng: 72.855, name: 'Priya S.', skill: 'Designer' },
  { id: 'mm-3', lat: 19.058, lng: 72.895, name: 'Ravi K.', skill: 'Electrician' },
  { id: 'mm-4', lat: 19.082, lng: 72.840, name: 'Anjali N.', skill: 'Yoga' },
];

export default function MiniBentoMap() {
  return (
    <MapContainer
      center={[19.076, 72.877]}
      zoom={12}
      style={{ height: '160px', width: '100%', borderRadius: '0.75rem' }}
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      doubleClickZoom={false}
      attributionControl={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {miniMarkers?.map(m => (
        <CircleMarker
          key={m?.id}
          center={[m?.lat, m?.lng]}
          radius={8}
          pathOptions={{ color: '#06b6d4', fillColor: '#06b6d4', fillOpacity: 0.8, weight: 2 }}
        >
          <Popup>
            <div style={{ color: '#e2e8f0', fontSize: '12px', minWidth: '100px' }}>
              <strong>{m?.name}</strong><br />{m?.skill}
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}