import { Delete } from 'lucide-react';

interface KeyboardProps {
  onKeyClick: (key: string) => void;
  letterStatus: Record<string, 'correct' | 'present' | 'absent'>;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACK'],
];

export default function Keyboard({ onKeyClick, letterStatus }: KeyboardProps) {
  const getKeyColor = (key: string) => {
    const status = letterStatus[key];
    if (!status) return 'bg-gray-300 hover:bg-gray-400';

    switch (status) {
      case 'correct':
        return 'bg-green-600 text-white';
      case 'present':
        return 'bg-yellow-500 text-white';
      case 'absent':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-300 hover:bg-gray-400';
    }
  };

  return (
    <div className="w-full max-w-lg">
      {KEYBOARD_ROWS.map((row, i) => (
        <div key={i} className="flex gap-1.5 justify-center mb-2">
          {row.map((key) => {
            const isSpecial = key === 'ENTER' || key === 'BACK';
            return (
              <button
                key={key}
                onClick={() => onKeyClick(key)}
                className={`${
                  isSpecial ? 'px-4' : 'w-10'
                } h-14 rounded font-bold text-sm flex items-center justify-center transition-colors ${getKeyColor(key)}`}
              >
                {key === 'BACK' ? (
                  <Delete size={20} />
                ) : (
                  key
                )}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
