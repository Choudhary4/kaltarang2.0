import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Hero from "./Pages/Hero";
import About from "./Pages/About";
import VideoSection from "./Pages/Video";
import HighlightsPage from "./Pages/Event";
import SponsorsSection from "./Pages/Sponser";
import GalleryCircle from "./Pages/Gallery";
import Merch from "./Pages/Merch";
import Footer from "./Components/Footer";
import LoadingAnimation from "./Components/LoadingAnimation";
import StartScreen from "./Components/StartScreen";
import MoonReveal from "./Components/MoonReveal";
import CompetitionsSection from './Pages/Plannet'
import "./index.css"; // Ensure Tailwind is imported properly

function MainWebsite() {
  return (
    <>
      <div className="relative min-h-screen w-full bg-grid bg-cover bg-center">
        <Navbar />
        <Hero />
      </div>
      <About />
      <VideoSection />
      <SponsorsSection />
      <HighlightsPage />
      <CompetitionsSection />
      <GalleryCircle />
      <Merch />
      <Footer />
    </>
  );
}

function App() {
  return (
    <Routes>
        <Route path="/" element={<LoadingAnimation />} />
        <Route path="/start" element={<StartScreen />} />
        <Route path="/moon" element={<MoonReveal />} />
        <Route path="/home" element={<MainWebsite />} />
    </Routes>
  );
}

export default App;
