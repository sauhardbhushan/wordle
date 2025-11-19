import { useState, useEffect } from 'react';
import { Heart} from 'lucide-react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import { TARGET_WORD } from './constants';

function App() {
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameStatus !== 'playing') return;

      if (e.key === 'Enter') {
        handleSubmitGuess();
      } else if (e.key === 'Backspace') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key) && currentGuess.length < 5) {
        setCurrentGuess(prev => (prev + e.key).toUpperCase());
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentGuess, gameStatus, guesses]);

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 5) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    setCurrentGuess('');

    if (currentGuess === TARGET_WORD) {
      setGameStatus('won');
    } else if (newGuesses.length === 6) {
      setGameStatus('lost');
    }
  };

  const handleKeyClick = (key: string) => {
    if (gameStatus !== 'playing') return;

    if (key === 'ENTER') {
      handleSubmitGuess();
    } else if (key === 'BACK') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (currentGuess.length < 5) {
      setCurrentGuess(prev => prev + key);
    }
  };

  const getLetterStatus = () => {
    const status: Record<string, 'correct' | 'present' | 'absent'> = {};

    guesses.forEach(guess => {
      const targetLetterCounts: Record<string, number> = {};
      TARGET_WORD.split('').forEach(letter => {
        targetLetterCounts[letter] = (targetLetterCounts[letter] || 0) + 1;
      });

      const correctPositions = new Set<number>();
      guess.split('').forEach((letter, i) => {
        if (TARGET_WORD[i] === letter) {
          correctPositions.add(i);
          status[letter] = 'correct';
          targetLetterCounts[letter]--;
        }
      });

      guess.split('').forEach((letter, i) => {
        if (!correctPositions.has(i)) {
          if (targetLetterCounts[letter] > 0) {
            if (status[letter] !== 'correct') {
              status[letter] = 'present';
            }
            targetLetterCounts[letter]--;
          } else {
            if (!status[letter]) {
              status[letter] = 'absent';
            }
          }
        }
      });
    });

    return status;
  };

  const getGameEndText = () => {
    if (gameStatus === 'won') {
      return (
        <span className="flex gap-2 align-items-center justify-content-center">
        <Heart fill="red"/> 
        <span>Sorry kitten!</span>
      </span>
      )
    }
    return (
      <span className="flex gap-2 align-items-center">
        <Heart fill="red"/> 
        <span>Try again baby!</span>
      </span>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-300 py-4">
        <h1 className="text-4xl font-bold text-center">Wordle</h1>
      </header>

      <main className="flex-1 flex flex-col items-center justify-between py-8 max-w-lg mx-auto w-full px-4">
        <GameBoard
          guesses={guesses}
          currentGuess={currentGuess}
          shake={shake}
        />

        {gameStatus !== 'playing' && (
          <div className="text-center mb-4">
            <p className="text-2xl font-bold mb-2">
              {getGameEndText()}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors"
            >
              Play Again
            </button>
          </div>
        )}

        <Keyboard onKeyClick={handleKeyClick} letterStatus={getLetterStatus()} />
      </main>
    </div>
  );
}

export default App;
