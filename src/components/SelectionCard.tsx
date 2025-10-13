import { cn } from '@/lib/utils';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion } from 'framer-motion';
import { Check, Star, LucideIcon } from 'lucide-react';

interface Badge {
  text: string;
  icon: LucideIcon;
  color: string;
}

interface SelectionCardProps {
  id: string;
  selected: boolean;
  onClick: (id: string) => void;
  title: string;
  description: string;
  visualType: 'trend' | 'map' | 'competition';
  badges?: Badge[];
  recommended?: boolean;
  className?: string;
}

// Generate random trend data
const generateTrendData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    value: Math.floor(Math.random() * 100) + 20,
  }));
};

// Generate random competition data
const generateCompetitionData = () => {
  return [
    { category: 'Low', value: Math.floor(Math.random() * 30) + 10 },
    { category: 'Med', value: Math.floor(Math.random() * 40) + 20 },
    { category: 'High', value: Math.floor(Math.random() * 50) + 30 },
  ];
};

// World map visualization with heat points using react-simple-maps
const GeographicMap = ({ selected }: { selected: boolean }) => {
  const mapColor = selected ? '#1e40af' : '#64748b';
  const heatColor = selected ? '#ef4444' : '#f87171';

  // Heat point locations (coordinates: [longitude, latitude])
  const markers = [
    { name: 'North America', coordinates: [-100, 40], size: 8 },
    { name: 'Europe', coordinates: [15, 50], size: 7 },
    { name: 'Asia', coordinates: [105, 35], size: 10 },
    { name: 'India', coordinates: [78, 20], size: 6 },
    { name: 'South America', coordinates: [-60, -15], size: 5 },
    { name: 'Australia', coordinates: [135, -25], size: 4 },
    { name: 'Africa', coordinates: [20, 0], size: 5 },
  ];

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{
        scale: 120,
        center: [0, 20],
      }}
      className="w-full h-full"
    >
      <Geographies geography="https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={mapColor}
              stroke={selected ? '#60a5fa' : '#94a3b8'}
              strokeWidth={0.5}
              style={{
                default: { outline: 'none', opacity: 0.7 },
                hover: { outline: 'none', opacity: 0.9 },
                pressed: { outline: 'none', opacity: 0.7 },
              }}
            />
          ))
        }
      </Geographies>

      {/* Heat markers showing search activity */}
      {markers.map(({ name, coordinates, size }) => (
        <Marker key={name} coordinates={coordinates}>
          <g>
            {/* Outer pulse circle */}
            <circle
              r={size}
              fill={heatColor}
              opacity={0.3}
            >
              <animate
                attributeName="r"
                values={`${size};${size + 4};${size}`}
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>
            {/* Inner solid circle */}
            <circle r={size * 0.6} fill={heatColor} opacity={0.8} />
          </g>
        </Marker>
      ))}
    </ComposableMap>
  );
};

const SelectionCard = ({ id, selected, onClick, title, description, visualType, badges, recommended, className }: SelectionCardProps) => {
  const trendData = generateTrendData();
  const competitionData = generateCompetitionData();

  const renderVisualization = () => {
    const chartColor = selected ? '#ffffff' : '#64748b';
    const bgClass = selected 
      ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
      : 'bg-gradient-to-br from-slate-100 to-slate-200';

    switch (visualType) {
      case 'trend':
        return (
          <div className={cn('aspect-square w-full rounded-2xl p-4 transition-all', bgClass)}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColor} opacity={0.3} />
                <XAxis dataKey="month" tick={{ fill: chartColor, fontSize: 10 }} />
                <YAxis tick={{ fill: chartColor, fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ 
                    background: selected ? '#1e40af' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    color: selected ? '#fff' : '#000'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={selected ? '#fbbf24' : '#3b82f6'} 
                  strokeWidth={3}
                  dot={{ fill: selected ? '#fbbf24' : '#3b82f6', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        );

      case 'map':
        return (
          <div className={cn('aspect-square w-full rounded-2xl p-4 transition-all flex items-center justify-center', bgClass)}>
            <GeographicMap selected={selected} />
          </div>
        );

      case 'competition':
        return (
          <div className={cn('aspect-square w-full rounded-2xl p-4 transition-all', bgClass)}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitionData}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColor} opacity={0.3} />
                <XAxis dataKey="category" tick={{ fill: chartColor, fontSize: 10 }} />
                <YAxis tick={{ fill: chartColor, fontSize: 10 }} />
                <Tooltip 
                  contentStyle={{ 
                    background: selected ? '#1e40af' : '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    color: selected ? '#fff' : '#000'
                  }}
                />
                <Bar 
                  dataKey="value" 
                  fill={selected ? '#fbbf24' : '#3b82f6'}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      onClick={() => onClick(id)}
      whileHover={{ y: -8 }}
      className={cn(
        'bg-white/95 backdrop-blur-xl rounded-3xl p-8 min-h-[480px] cursor-pointer transition-all duration-300 shadow-2xl',
        'flex flex-col relative overflow-hidden group border border-white/20',
        selected && 'ring-4 ring-blue-300 ring-offset-4 ring-offset-slate-900',
        className
      )}
    >
      {/* Checkbox in top-right */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: selected ? 1 : 0 }}
        className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg"
      >
        <Check className="h-5 w-5 text-white" strokeWidth={3} />
      </motion.div>

      {/* Recommended Star Badge */}
      {recommended && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="absolute top-4 left-4 z-20 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-bold shadow-lg"
        >
          <Star className="h-3 w-3 fill-current" />
          Recommended
        </motion.div>
      )}

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Visualization Area */}
      {renderVisualization()}
      
      {/* Card Info */}
      <div className="space-y-3 mt-6 relative z-10">
        <h3 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-slate-600">{description}</p>

        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-2">
            {badges.map((badge, index) => {
              const BadgeIcon = badge.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    'px-2 py-1 rounded-md text-xs font-medium text-white flex items-center gap-1',
                    badge.color
                  )}
                >
                  <BadgeIcon className="h-3 w-3" />
                  {badge.text}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Hover overlay with "View Details" hint */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent flex items-end justify-center pb-6 pointer-events-none"
      >
        <span className="text-white font-semibold text-sm">Click to {selected ? 'deselect' : 'select'}</span>
      </motion.div>
    </motion.div>
  );
};

export default SelectionCard;
