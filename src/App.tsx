import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  return (
    <div className="relative min-h-screen text-white overflow-x-hidden selection:bg-[#915eff] selection:text-white">
      {/* High-Performance Ambient Backdrop */}
      <div className="ambient-bg" />
      <div className="grid-overlay" />

      <Navbar />
      
      <main className="flex flex-col gap-20 py-10">
        <Hero />
        <div className="container mx-auto px-6 md:px-12 flex flex-col gap-32">
          <About />
          <Skills />
          <Experience />
          <Projects />
          <Contact />
        </div>
      </main>

      <footer className="py-12 mt-20 border-t border-white/5 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="flex flex-col gap-1">
            <p className="font-mono text-xs text-white/40 tracking-widest uppercase">
              © {new Date().getFullYear()} Amirhossein Bemani Vandish
            </p>
            <p className="font-mono text-xs text-white/30 tracking-widest uppercase">
              Data Science · Fullstack Engineering
            </p>
          </div>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="https://github.com/amir-bemani" target="_blank" rel="noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-300">
              GitHub
            </a>
            <a href="https://linkedin.com/in/amirbemani" target="_blank" rel="noreferrer"
              className="text-white/40 hover:text-white transition-colors duration-300">
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

