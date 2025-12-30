import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './pages/Landing.tsx'
import Lessons from "./pages/Lessons.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Set initial theme based on user preference
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const rootElement = document.getElementById('root');

if (rootElement && prefersDark) {
  rootElement.setAttribute('data-theme', 'dark');
}

// Listen for changes in color scheme preference
if (window.matchMedia) {
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener('change', (e) => {
    if (rootElement) {
      if (e.matches) {
        rootElement.setAttribute('data-theme', 'dark');
      } else {
        rootElement.removeAttribute('data-theme');
      }
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Lessons" element={<Lessons />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
