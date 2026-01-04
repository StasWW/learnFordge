import '../styles/pages/Landing.css'
import Navbar from "../components/landing/Navbar.tsx";
import Header from "../components/landing/Header.tsx";
import FeaturesCarousel from "../components/landing/FeaturesCarousel.tsx";
import FAQ from "../components/landing/FAQ.tsx";

export default function Landing() {
  return (
    <div className="landing-page">
      <Navbar />
      <Header />
      <FeaturesCarousel />
      <FAQ />
    </div>
  )
}
