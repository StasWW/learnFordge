import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './pages/Landing.tsx'
import Lessons from "./pages/Lessons.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

if (window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)")) {
  document.getElementById('root')?.setAttribute('data-theme', 'dark');
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
