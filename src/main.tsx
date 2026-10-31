import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { purgeLegacyPrivateStorage } from './lib/storage';
import './index.css';

// Remove private data left by older builds before the app renders.
purgeLegacyPrivateStorage();

createRoot(document.getElementById('root')!).render(<App />);
