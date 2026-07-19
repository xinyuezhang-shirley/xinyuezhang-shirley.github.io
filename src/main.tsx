import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { recordPortfolioSession } from './lib/recordPortfolioSession'

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
} else {
  console.error('Root element not found!');
}

// Background session ping — never blocks paint or navigation.
recordPortfolioSession();

