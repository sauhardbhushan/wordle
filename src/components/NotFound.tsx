export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-3xl font-bold">Puzzle not found</h1>
      <p className="text-gray-600">This link doesn't point to a valid Wordle.</p>
      <a
        href="/new"
        className="px-6 py-2 bg-green-600 text-white rounded-md font-semibold hover:bg-green-700 transition-colors"
      >
        Create one
      </a>
    </div>
  );
}
