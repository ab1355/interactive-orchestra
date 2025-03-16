
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.tsx'
import './index.css'
import './styles/animations.css'
import './styles/modelSelector.css'

// Log environment mode to help with debugging
console.log("App starting in mode:", import.meta.env.VITE_APP_MODE);
console.log("Build mode:", import.meta.env.MODE);
console.log("Base URL:", import.meta.env.BASE_URL);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
