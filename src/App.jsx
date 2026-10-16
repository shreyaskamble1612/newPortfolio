import { Navbar } from "./components/navbar";
import { Home } from "./components/Home";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Skills } from "./components/Skills";
import { Project } from "./components/Project";
import { Contact } from "./components/Contact";
import { CustomCursor } from "./components/CustomCursor";
import "./App.css";

export function App() {
  return (
    <div className="portfolio-app">
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
