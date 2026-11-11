import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Anchor, Plane, Truck, Globe, Compass, ArrowRight, CheckCircle2, Navigation } from 'lucide-react';

export interface PortPoint {
  id: string;
  name: string;
  country: string;
  region: 'Asia' | 'Europe' | 'Middle East' | 'North America' | 'South America' | 'Africa' | 'Oceania';
  lat: number;
  lng: number;
  type: 'ocean' | 'air' | 'road' | 'hub';
  annualThroughput: string;
  berthDepth?: string;
  description: string;
}

export const REAL_PORTS: PortPoint[] = [
  {
    id: 'port-shanghai',
    name: 'Port of Shanghai (Yangshan)',
    country: 'China',
    region: 'Asia',
    lat: 31.2304,
    lng: 121.4737,
    type: 'ocean',
    annualThroughput: '47.3 Million TEU',
    berthDepth: '-17.5 meters',
    description: 'World’s #1 busiest container port. Primary origin hub for Trans-Pacific and Asia-Europe liner services.'
  },
  {
    id: 'port-singapore',
    name: 'Port of Singapore (PSA)',
    country: 'Singapore',
    region: 'Asia',
    lat: 1.2902,
    lng: 103.8519,
    type: 'ocean',
    annualThroughput: '37.5 Million TEU',
    berthDepth: '-18.0 meters',
    description: 'Global mega transshipment gateway connecting 600+ ports across Southeast Asia, Indian Ocean & Far East.'
  },
  {
    id: 'port-busan',
    name: 'Port of Busan',
    country: 'South Korea',
    region: 'Asia',
    lat: 35.1796,
    lng: 129.0756,
    type: 'ocean',
    annualThroughput: '22.7 Million TEU',
    berthDepth: '-17.0 meters',
    description: 'Premier East Asian container transshipment hub connecting Japan, Korea & Northern China.'
  },
  {
    id: 'port-rotterdam',
    name: 'Port of Rotterdam',
    country: 'Netherlands',
    region: 'Europe',
    lat: 51.9244,
    lng: 4.4777,
    type: 'ocean',
    annualThroughput: '15.3 Million TEU',
    berthDepth: '-24.0 meters',
    description: 'Europe’s largest seaport gateway with automated quay cranes & direct inland waterway connections.'
  },
  {
    id: 'port-antwerp',
    name: 'Port of Antwerp-Bruges',
    country: 'Belgium',
    region: 'Europe',
    lat: 51.2213,
    lng: 4.4051,
    type: 'ocean',
    annualThroughput: '12.5 Million TEU',
    berthDepth: '-16.0 meters',
    description: 'Key European chemical and industrial container hub with extensive rail freight intermodal links.'
  },
  {
    id: 'port-[#dubai]',
    name: 'Jebel Ali Port (DP World)',
    country: 'United Arab Emirates',
    region: 'Middle East',
    lat: 24.9857,
    lng: 55.0272,
    type: 'ocean',
    annualThroughput: '14.0 Million TEU',
    berthDepth: '-17.0 meters',
    description: 'Middle East flagship deepwater seaport & logistics hub bridging East-West maritime trade lanes.'
  },
  {
    id: 'port-la',
    name: 'Port of Los Angeles / Long Beach',
    country: 'United States',
    region: 'North America',
    lat: 33.7420,
    lng: -118.2673,
    type: 'ocean',
    annualThroughput: '10.6 Million TEU',
    berthDepth: '-16.5 meters',
    description: 'North America’s premier Pacific maritime gateway connecting Asian imports to US intermodal rail.'
  },
  {
    id: 'port-ny',
    name: 'Port of New York & New Jersey',
    country: 'United States',
    region: 'North America',
    lat: 40.6687,
    lng: -74.1598,
    type: 'ocean',
    annualThroughput: '9.5 Million TEU',
    berthDepth: '-15.2 meters',
    description: 'Largest East Coast shipping gateway serving the US Eastern Seaboard and Midwestern consumer markets.'
  },
  {
    id: 'port-santos',
    name: 'Port of Santos',
    country: 'Brazil',
    region: 'South America',
    lat: -23.9608,
    lng: -46.3339,
    type: 'ocean',
    annualThroughput: '4.8 Million TEU',
    berthDepth: '-14.5 meters',
    description: 'South America’s primary container and agricultural commodity shipping port.'
  },
  {
    id: 'port-durban',
    name: 'Port of Durban',
    country: 'South Africa',
    region: 'Africa',
    lat: -29.8587,
    lng: 31.0218,
    type: 'ocean',
    annualThroughput: '2.9 Million TEU',
    berthDepth: '-13.0 meters',
    description: 'Sub-Saharan Africa’s principal container gateway and regional commercial hub.'
  },
  {
    id: 'port-sydney',
    name: 'Port Botany (Sydney)',
    country: 'Australia',
    region: 'Oceania',
    lat: -33.9575,
    lng: 151.2163,
    type: 'ocean',
    annualThroughput: '2.7 Million TEU',
    berthDepth: '-14.5 meters',
    description: 'Australia’s main international container port serving Sydney and the New South Wales economy.'
  }
];

export interface ShippingLane {
  id: string;
  name: string;
  mode: 'ocean' | 'air' | 'road';
  coordinates: [number, number][];
  color: string;
}

export const SHIPPING_LANES: ShippingLane[] = [
  {
    id: 'lane-transpacific',
    name: 'Trans-Pacific Express (Shanghai – Los Angeles)',
    mode: 'ocean',
    coordinates: [
      [31.2304, 121.4737],
      [33.7420, -118.2673]
    ],
    color: '#C8A45D'
  },
  {
    id: 'lane-asia-europe',
    name: 'Asia-Europe Maritime Corridor (Shanghai – Singapore – Dubai – Rotterdam)',
    mode: 'ocean',
    coordinates: [
      [31.2304, 121.4737],
      [1.2902, 103.8519],
      [24.9857, 55.0272],
      [29.9324, 32.5599], // Suez
      [51.9244, 4.4777]
    ],
    color: '#DFBF7A'
  },
  {
    id: 'lane-transatlantic',
    name: 'Transatlantic Liner (Rotterdam – New York)',
    mode: 'ocean',
    coordinates: [
      [51.9244, 4.4777],
      [40.6687, -74.1598]
    ],
    color: '#38BDF8'
  },
  {
    id: 'lane-panamerican',
    name: 'Pan-American Coastal Lane (New York – Santos)',
    mode: 'ocean',
    coordinates: [
      [40.6687, -74.1598],
      [10.3932, -75.4832], // Cartagena
      [-23.9608, -46.3339]
    ],
    color: '#EAB308'
  },
  {
    id: 'lane-asia-australasia',
    name: 'Asia-Oceania Trade Lane (Singapore – Sydney)',
    mode: 'ocean',
    coordinates: [
      [1.2902, 103.8519],
      [-33.9575, 151.2163]
    ],
    color: '#C8A45D'
  }
];

interface RealGlobalMapProps {
  activeRegion?: string;
  activeMode?: 'all' | 'ocean' | 'air' | 'road';
  onSelectPort?: (port: PortPoint) => void;
  onRequestQuote: () => void;
  height?: string;
}

export const RealGlobalMap: React.FC<RealGlobalMapProps> = ({
  activeRegion = 'All',
  activeMode = 'all',
  onSelectPort,
  onRequestQuote,
  height = '500px'
}) => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [selectedPort, setSelectedPort] = useState<PortPoint | null>(REAL_PORTS[0]);
  const markersRef = useRef<L.Marker[]>([]);
  const polylinesRef = useRef<L.Polyline[]>([]);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Prevent re-initializing existing map instance
    if (!mapInstanceRef.current) {
      // Initialize Leaflet map with dark theme CartoDB basemap
      const map = L.map(mapContainerRef.current, {
        center: [20, 15],
        zoom: 2,
        minZoom: 2,
        maxZoom: 10,
        zoomControl: true,
        attributionControl: false
      });

      // CartoDB Dark Matter tile layer for dark navy corporate aesthetic
      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
        subdomains: 'abcd'
      }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Clear previous markers & polylines
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
    polylinesRef.current.forEach(p => p.remove());
    polylinesRef.current = [];

    // Filter ports based on active region and mode
    const filteredPorts = REAL_PORTS.filter(p => {
      const matchRegion = activeRegion === 'All' || p.region === activeRegion;
      const matchMode = activeMode === 'all' || p.type === activeMode || p.type === 'hub';
      return matchRegion && matchMode;
    });

    // Custom Gold Port Icon Definition
    const createCustomIcon = (isCurrentSelected: boolean) => {
      const size = isCurrentSelected ? 28 : 22;
      return L.divIcon({
        className: 'custom-leaflet-port-icon',
        html: `
          <div style="
            width: ${size}px;
            height: ${size}px;
            background: ${isCurrentSelected ? '#DFBF7A' : '#C8A45D'};
            border: 2px solid #071B36;
            border-radius: 50%;
            box-shadow: 0 0 12px ${isCurrentSelected ? 'rgba(223,191,122,0.9)' : 'rgba(200,164,93,0.6)'};
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <div style="
              width: 8px;
              height: 8px;
              background: #071B36;
              border-radius: 50%;
            "></div>
          </div>
        `,
        iconSize: [size, size],
        iconAnchor: [size / 2, size / 2]
      });
    };

    // Render Markers for Ports
    filteredPorts.forEach(port => {
      const isSelected = selectedPort?.id === port.id;
      const marker = L.marker([port.lat, port.lng], {
        icon: createCustomIcon(isSelected),
        title: `${port.name} (${port.country})`
      }).addTo(map);

      marker.on('click', () => {
        setSelectedPort(port);
        if (onSelectPort) onSelectPort(port);
        map.flyTo([port.lat, port.lng], Math.max(map.getZoom(), 4), { duration: 1.2 });
      });

      markersRef.current.push(marker);
    });

    // Draw Shipping Lanes (Polylines)
    SHIPPING_LANES.forEach(lane => {
      if (activeMode === 'all' || activeMode === lane.mode) {
        const polyline = L.polyline(lane.coordinates, {
          color: lane.color,
          weight: 2.5,
          opacity: 0.75,
          dashArray: '6, 8'
        }).addTo(map);

        polylinesRef.current.push(polyline);
      }
    });

    // Pan/Zoom map to fit active region if specific region selected
    if (activeRegion !== 'All' && filteredPorts.length > 0) {
      const bounds = L.latLngBounds(filteredPorts.map(p => [p.lat, p.lng]));
      map.flyToBounds(bounds, { padding: [40, 40], duration: 1.2 });
    }

  }, [activeRegion, activeMode, selectedPort?.id]);

  return (
    <div className="w-full space-y-4">
      {/* Real Interactive Leaflet Container */}
      <div className="relative w-full rounded-2xl overflow-hidden border border-[#C8A45D]/40 shadow-2xl bg-[#071B36]">
        
        {/* Leaflet Map Div */}
        <div ref={mapContainerRef} style={{ height }} className="w-full z-10" />

        {/* Floating Map Legend Overlay */}
        <div className="absolute top-4 right-4 z-[400] bg-[#071B36]/90 border border-[#C8A45D]/40 rounded-xl p-3 backdrop-blur-md text-[11px] text-slate-200 shadow-xl space-y-1.5 hidden sm:block">
          <div className="flex items-center gap-2 font-bold text-xs text-[#DFBF7A] pb-1 border-b border-slate-700/60">
            <Navigation className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>REAL GLOBAL PORT MAP</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#C8A45D] border border-[#071B36]" />
            <span>Deepwater Container Port</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#C8A45D] border border-dashed" />
            <span>Active Ocean Liner Corridor</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-0.5 bg-[#38BDF8]" />
            <span>Transatlantic Air Corridor</span>
          </div>
        </div>
      </div>

      {/* Selected Real Port Detail Panel */}
      {selectedPort && (
        <div className="bg-[#0A2242] border border-[#C8A45D]/50 rounded-2xl p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 animate-fadeIn">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#C8A45D] text-[#071B36]">
                {selectedPort.region} Gateway
              </span>
              <h3 className="text-lg font-bold text-white tracking-wide">
                {selectedPort.name}
              </h3>
              <span className="text-xs text-slate-400 font-mono">({selectedPort.country})</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {selectedPort.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 text-xs text-slate-300 font-mono">
              <div>
                <span className="text-slate-500 block text-[10px]">THROUGHPUT</span>
                <strong className="text-[#DFBF7A]">{selectedPort.annualThroughput}</strong>
              </div>
              {selectedPort.berthDepth && (
                <div>
                  <span className="text-slate-500 block text-[10px]">BERTH DEPTH</span>
                  <strong className="text-white">{selectedPort.berthDepth}</strong>
                </div>
              )}
              <div>
                <span className="text-slate-500 block text-[10px]">COORDINATES</span>
                <span className="text-slate-300">{selectedPort.lat.toFixed(4)}°N, {selectedPort.lng.toFixed(4)}°E</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onRequestQuote}
              className="px-6 py-3 bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#071B36] font-extrabold text-xs uppercase tracking-wider rounded-xl transition shadow-lg cursor-pointer flex items-center gap-2"
            >
              <span>INQUIRE ON THIS GATEWAY</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
