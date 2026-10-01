import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import CreatePuzzle from './components/CreatePuzzle.tsx';
import NotFound from './components/NotFound.tsx';
import { resolveRoute } from './puzzles';
import './index.css';

const route = resolveRoute(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {route.kind === 'play' && <App targetWord={route.word} />}
    {route.kind === 'create' && <CreatePuzzle />}
    {route.kind === 'notFound' && <NotFound />}
  </StrictMode>
);
