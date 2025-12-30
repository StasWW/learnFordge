import '../styles/pages/Landing.css'
import Header from "../components/landing/Header.tsx";
import FeaturesCarousel from "../components/landing/FeaturesCarousel.tsx";
import FAQ from "../components/landing/FAQ.tsx";

export default function Landing() {
  return (
    <div className="landing-page">
      <Header />
      <FeaturesCarousel />
      <FAQ />
    </div>
  )
}
