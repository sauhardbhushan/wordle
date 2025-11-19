import { TARGET_WORD, MAX_GUESSES, WORD_LENGTH } from '../constants';
import Tile from './Tile';

interface GameBoardProps {
  guesses: string[];
  currentGuess: string;
  shake: boolean;
}

export default function GameBoard({ guesses, currentGuess, shake }: GameBoardProps) {
  const emptyRows = MAX_GUESSES - guesses.length - (currentGuess ? 1 : 0);

  return (
    <div className="grid gap-1.5 mb-8">
      {guesses.map((guess, i) => (
        <Row key={i} word={guess} isSubmitted rowIndex={i} />
      ))}

      {currentGuess && (
        <Row word={currentGuess} isSubmitted={false} shake={shake} />
      )}

      {Array.from({ length: emptyRows }).map((_, i) => (
        <Row key={`empty-${i}`} word="" isSubmitted={false} />
      ))}
    </div>
  );
}

interface RowProps {
  word: string;
  isSubmitted: boolean;
  rowIndex?: number;
  shake?: boolean;
}

function Row({ word, isSubmitted, rowIndex = 0, shake = false }: RowProps) {
  const tiles = word.padEnd(WORD_LENGTH, ' ').split('');

  const getTileStatus = (letter: string, index: number) => {
    if (!isSubmitted || letter === ' ') return 'empty';

    if (TARGET_WORD[index] === letter) {
      return 'correct';
    }

    const targetLetterCounts: Record<string, number> = {};
    TARGET_WORD.split('').forEach(l => {
      targetLetterCounts[l] = (targetLetterCounts[l] || 0) + 1;
    });

    for (let i = 0; i < WORD_LENGTH; i++) {
      if (TARGET_WORD[i] === word[i]) {
        targetLetterCounts[word[i]]--;
      }
    }

    for (let i = 0; i < index; i++) {
      if (word[i] === letter && TARGET_WORD[i] !== word[i]) {
        if (targetLetterCounts[letter] > 0) {
          targetLetterCounts[letter]--;
        }
      }
    }

    if (targetLetterCounts[letter] > 0) {
      return 'present';
    }

    return 'absent';
  };

  return (
    <div className={`flex gap-1.5 ${shake ? 'animate-shake' : ''}`}>
      {tiles.map((letter, i) => (
        <Tile
          key={i}
          letter={letter.trim()}
          status={getTileStatus(letter, i)}
          delay={i * 0.3}
        />
      ))}
    </div>
  );
}
