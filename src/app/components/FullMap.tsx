'use client';
import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useApp } from '@/context/AppContext';

export default function FullMap() {
  const { professionals, filterCategory, setSelectedProfessional, setIsHireModalOpen } = useApp();

  const filtered = filterCategory === 'All'
    ? professionals
    : professionals.filter(p => p.category === filterCategory);

  const getColor = (availability: string) => {
    if (availability === 'online') return '#06b6d4';
    if (availability === 'busy') return '#f59e0b';
    return '#64748b';
  };

  return (
    <MapContainer
      center={[20.5937, 78.9629]}
      zoom={5}
      style={{ height: '600px', width: '100%' }}
      zoomControl
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />
      {filtered.map(pro => (
        <CircleMarker
          key={pro.id}
          center={[pro.lat, pro.lng]}
          radius={12}
          pathOptions={{
            color: getColor(pro.availability),
            fillColor: getColor(pro.availability),
            fillOpacity: 0.85,
            weight: 2,
          }}
        >
          <Popup>
            <div style={{ minWidth: '200px', fontFamily: 'Manrope, sans-serif' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <img
                  src={pro.avatar}
                  alt={`${pro.name} profile`}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #06b6d4' }}
                />
                <div>
                  <div style={{ fontWeight: '700', fontSize: '14px', color: '#e2e8f0' }}>{pro.name}</div>
                  <div style={{ fontSize: '12px', color: '#06b6d4' }}>{pro.skill}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px', color: '#94a3b8' }}>
                <span>⭐ {pro.rating} ({pro.reviewCount})</span>
                <span>₹{pro.hourlyRate}/hr</span>
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8', marginBottom: '8px' }}>
                📍 {pro.area}, {pro.city}
              </div>
              <button
                onClick={() => {
                  setSelectedProfessional(pro);
                  setIsHireModalOpen(true);
                }}
                style={{
                  width: '100%',
                  padding: '8px',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  color: '#0a0a1a',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  fontFamily: 'Manrope, sans-serif',
                }}
              >
                Hire Now →
              </button>
            </div>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}