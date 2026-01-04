import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ThemeToggle from './components/ThemeToggle.tsx';
import Landing from './pages/Landing.tsx';
import Lessons from './pages/Lessons.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Lessons" element={<Lessons />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
