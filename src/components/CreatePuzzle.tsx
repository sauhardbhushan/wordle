import { useState } from 'react';
import { encodeWord, isValidWord } from '../puzzles';

export default function CreatePuzzle() {
  const [word, setWord] = useState('');
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);

  const valid = isValidWord(word);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setLink(`${window.location.origin}/w/${encodeWord(word)}`);
    setCopied(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-gray-300 py-4">
        <h1 className="text-4xl font-bold text-center">Create a Wordle</h1>
      </header>

      <main className="flex-1 flex flex-col items-center py-8 max-w-lg mx-auto w-full px-4 gap-4">
        <form onSubmit={handleSubmit} className="flex gap-2 w-full">
          <input
            value={word}
            onChange={e => {
              setWord(e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase());
              setLink('');
            }}
            maxLength={8}
            placeholder="Secret word (3–8 letters)"
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 font-semibold tracking-widest"
          />
          <button
            type="submit"
            disabled={!valid}
            className="px-4 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Create link
          </button>
        </form>

        {link && (
          <div className="w-full flex flex-col gap-2">
            <code className="block w-full break-all bg-gray-100 rounded-md p-3 text-sm">{link}</code>
            <div className="flex gap-2">
              <button
                onClick={handleCopy}
                className="px-4 py-2 bg-gray-800 text-white rounded-md font-semibold hover:bg-gray-900 transition-colors"
              >
                {copied ? 'Copied!' : 'Copy link'}
              </button>
              <a
                href={link}
                className="px-4 py-2 border border-gray-300 rounded-md font-semibold hover:bg-gray-50 transition-colors"
              >
                Open
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
