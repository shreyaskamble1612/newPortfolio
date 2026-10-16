import { Navbar } from "./components/navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Project } from "./components/Project";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";
import { Scroll3DScene } from "./components/Scroll3DScene";
import { CarGame3D } from "./components/CarGame3D";
import { useScroll3DReveal } from "./hooks/useScroll3DReveal";
import "./App.css";

export function App() {
  // Activate scroll-triggered 3D perspective reveals
  useScroll3DReveal();

  return (
    <div className="portfolio-app">
      {/* Dynamic 3D Scene with Scroll-Reactive Geometry & Particles */}
      <Scroll3DScene />
      {/* 3D Cyber Highway Racer Car Game */}
      <CarGame3D />
      <CustomCursor />
      <Navbar />
      <main>
        <Home />
        <About />
        <Experience />
        <Skills />
        <Project />
        <Contact />
      </main>
    </div>
  );
}

export default App;
