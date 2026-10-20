'use client';

import { useEffect, useRef } from 'react';
import type { Property } from '@/lib/data';

export function MapPanel({ properties, focusCity }: { properties: Property[]; focusCity?: string }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  useEffect(() => {
    let mounted = true;
    import('leaflet').then((leaflet) => {
      if (!mounted || !mapRef.current || mapInstance.current) return;
      const L = leaflet.default;
      const first = properties[0] || { lat: 28.6139, lng: 77.209 };
      const map = L.map(mapRef.current, { zoomControl: false }).setView([first.lat, first.lng], 11);
      L.control.zoom({ position: 'bottomright' }).addTo(map);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);
      properties.forEach((property, index) => {
        const marker = L.circleMarker([property.lat, property.lng], { radius: index === 0 ? 9 : 7, color: '#5554d8', fillColor: index === 0 ? '#20b9a7' : '#6a68e3', fillOpacity: .9, weight: 3 });
        marker.bindPopup(`<strong>${property.name}</strong><br/>${property.area}, ${property.city}<br/><b>${property.priceLabel}</b>`).addTo(map);
      });
      mapInstance.current = map;
    });
    return () => { mounted = false; mapInstance.current?.remove(); mapInstance.current = null; };
  }, [properties, focusCity]);
  return <div className="relative h-full min-h-[360px] overflow-hidden rounded-[22px] border border-[var(--line)] bg-[#dfeaf0]"><div ref={mapRef} className="h-full min-h-[360px] w-full" /><div className="pointer-events-none absolute left-3 top-3 rounded-xl bg-[var(--surface)]/90 px-3 py-2 text-[11px] font-bold text-[var(--text)] shadow-sm backdrop-blur">{focusCity ? `Showing ${focusCity}` : 'Live discovery map'} <span className="ml-1 text-[#118c7f]">●</span></div></div>;
}
