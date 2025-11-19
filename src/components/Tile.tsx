import { useEffect, useState } from 'react';

interface TileProps {
  letter: string;
  status: 'empty' | 'correct' | 'present' | 'absent';
  delay?: number;
}

export default function Tile({ letter, status, delay = 0 }: TileProps) {
  const [shouldReveal, setShouldReveal] = useState(false);

  useEffect(() => {
    if (status !== 'empty' && delay > 0) {
      const timer = setTimeout(() => {
        setShouldReveal(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    } else if (status !== 'empty') {
      setShouldReveal(true);
    }
  }, [status, delay]);

  const getDefaultBackgroundColor = () => {
    return letter ? 'bg-white border-gray-400' : 'bg-white border-gray-300';
  }

  const getBackgroundColor = () => {
    if (!shouldReveal && status !== 'empty') return 'bg-white border-gray-400';

    switch (status) {
      case 'correct':
        return 'bg-green-600 border-green-600';
      case 'present':
        return 'bg-yellow-500 border-yellow-500';
      case 'absent':
        return 'bg-gray-400 border-gray-400';
      default:
        return getDefaultBackgroundColor()
    }
  };

  const getTextColor = () => {
    return shouldReveal && status !== 'empty' ? 'text-white' : 'text-gray-900';
  };

  return (
    <div
      className={`w-14 h-14 border-2 flex items-center justify-center text-2xl font-bold uppercase transition-all duration-500 ${getBackgroundColor()} ${getTextColor()} ${
        shouldReveal && status !== 'empty' ? `animate-flip animate-color` : ''
      } ${letter && status === 'empty' ? `animate-pop border-gray-500 ` : ''}`}
    >
      {letter}
    </div>
  );
}
