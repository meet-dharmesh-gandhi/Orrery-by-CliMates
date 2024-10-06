import React, { useRef } from 'react';
import Hero from './Components/Hero';
import Orrery from './Components//Orrery';  // Assuming you have this component
import Navbar from './Components//Navbar';
import Table from './Components/table';

function App() {
  const heroRef = useRef(null);
  const orreryRef = useRef(null);
  const libraryRef = useRef(null);

  const scrollToHero = () => {
    if (heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToOrrery = () => {
    if (orreryRef.current) {
      orreryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToLibrary = () => {
    if (libraryRef.current) {
      libraryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="App">
      <Navbar 
        scrollToHero={scrollToHero} 
        scrollToOrrery={scrollToOrrery} 
        scrollToLibrary={scrollToLibrary} 
      />
      <Hero heroRef={heroRef} />
      <Orrery orreryRef={orreryRef} />
      <Table libraryRef={libraryRef} />
    </div>
  );
}

export default App;
