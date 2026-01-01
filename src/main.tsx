import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Landing from './pages/Landing.tsx'
import LessonsMainPage from "./pages/Lessons/LessonsMainPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LessonIdPage from "./pages/Lessons/LessonIdPage.tsx";

if (window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)")) {
  document.getElementById('root')?.setAttribute('data-theme', 'dark');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Lessons" element={<LessonsMainPage />} />
        <Route path='/Lessons/:lessonId' element={<LessonIdPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)