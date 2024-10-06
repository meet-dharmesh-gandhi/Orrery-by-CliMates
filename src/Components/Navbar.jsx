import React, { useState, useEffect } from "react";

function Navbar({ scrollToHero, scrollToOrrery, scrollToLibrary }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = document.querySelector('.hero').offsetHeight;
      if (window.scrollY > heroHeight) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="bg-black w-3/4 h-16 fixed top-2 text-yellow-50 left-44 z-10 rounded-xl opacity-75 flex transition-opacity duration-300 neon-border"
    >
      <div
        className={`font-spacefont h-full w-1/4 text-2xl flex justify-center items-center ${
          isScrolled ? 'opacity-100' : 'opacity-0'
        }`}
      >
        Space Orrery Web
      </div>
      <ul className="flex w-3/4 justify-around items-center font-spacefont text-2xl cursor-pointer">
        <li onClick={scrollToHero}>Home</li>
        <li onClick={scrollToOrrery}>Orrery</li>
        <li onClick={scrollToLibrary}>Library</li>
      </ul>
    </div>
  );
}

export default Navbar;
