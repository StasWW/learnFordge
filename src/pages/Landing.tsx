import { useEffect } from "react";
import '../styles/pages/Landing.css'
import Navbar from "../components/landing/Navbar.tsx";
import Header from "../components/landing/Header.tsx";
import FeaturesCarousel from "../components/landing/FeaturesCarousel.tsx";
import FAQ from "../components/landing/FAQ.tsx";

export default function Landing() {
  useEffect(() => {
    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".btn-primary, .nav-login")
    );

    if (!buttons.length) {
      return;
    }

    const clamp = (value: number) => Math.max(0, Math.min(100, value));
    const setButtonVars = (button: HTMLElement, x: number, y: number) => {
      const xPos = clamp(x);
      const yPos = clamp(y);
      button.style.setProperty("--btn-bg-x", `${xPos}%`);
      button.style.setProperty("--btn-bg-y", `${yPos}%`);
      button.style.setProperty("--btn-glow-x", `${xPos}%`);
      button.style.setProperty("--btn-glow-y", `${yPos}%`);
    };

    const handlePointerMove = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement | null;
      if (!target) {
        return;
      }
      const rect = target.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      setButtonVars(target, x, y);
    };

    const handlePointerLeave = (event: PointerEvent) => {
      const target = event.currentTarget as HTMLElement | null;
      if (!target) {
        return;
      }
      setButtonVars(target, 50, 50);
    };

    buttons.forEach((button) => {
      setButtonVars(button, 50, 50);
      button.addEventListener("pointerenter", handlePointerMove);
      button.addEventListener("pointermove", handlePointerMove);
      button.addEventListener("pointerleave", handlePointerLeave);
    });

    return () => {
      buttons.forEach((button) => {
        button.removeEventListener("pointerenter", handlePointerMove);
        button.removeEventListener("pointermove", handlePointerMove);
        button.removeEventListener("pointerleave", handlePointerLeave);
      });
    };
  }, []);

  return (
    <div className="landing-page">
      <Navbar />
      <Header />
      <FeaturesCarousel />
      <FAQ />
    </div>
  )
}
