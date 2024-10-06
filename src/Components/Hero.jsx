import React, { useState, useEffect, useRef } from 'react';

const FACT_CHANGE_INTERVAL = 5000;

function  Hero({ heroRef }) {
  const [facts, setFacts] = useState([]);
  const [currentFact, setCurrentFact] = useState(0);
  const [astronomyImage, setAstronomyImage] = useState('');

  useEffect(() => {
    const fetchFacts = async () => {
      const fetchedFacts = [
        "The Sun makes up more than 99.86% of the mass of the Solar System.",
        "Mercury is the smallest planet in the Solar System.",
        "Jupiter is the largest planet in the Solar System.",
        "Saturn has the lowest density of all the planets.",
        "Uranus rotates on its side, with an axial tilt of 98 degrees.",
        "Neptune has the strongest winds in the Solar System.",
        "Pluto is no longer considered a planet, but a dwarf planet.",
        "The Moon is about 1/4 the size of Earth.",
        "Mars is known as the Red Planet due to its reddish appearance.",
        "A day on Venus is longer than a year on Venus.",
        "The International Space Station (ISS) is the most expensive single object ever built.",
        "The Apollo missions sent six manned flights to the Moon, with twelve men walking on its surface.",
        "The first artificial satellite, Sputnik 1, was launched by the Soviet Union in 1957.",
        "The Hubble Space Telescope has been in operation since 1990.",
        "The Voyager 1 spacecraft is the farthest human-made object from Earth.",
        "The first human in space was Yuri Gagarin, aboard Vostok 1 in 1961.",
        "The first woman in space was Valentina Tereshkova, aboard Vostok 6 in 1963.",
        "The first American in space was Alan Shepard, aboard Freedom 7 in 1961.",
        "Neil Armstrong was the first person to walk on the Moon in 1969.",
        "The first space shuttle to fly was the Columbia in 1981.",
        "The Space Shuttle program ran from 1981 to 2011.",
        "The first privately funded human spaceflight was SpaceShipOne in 2004.",
        "The first commercial space station was MirCorp's Mir in 2000.",
        "The first private space station was the Bigelow Expandable Activity Module (BEAM) in 2016.",
        "The first private company to send a spacecraft to the Moon was SpaceIL's Beresheet in 2019.",
        "The first private company to send a spacecraft to Mars was SpaceX's Starship in the future.",
        "The first private company to send humans to space was SpaceX's Crew Dragon in 2020.",
        "The first private company to send humans to the ISS was SpaceX's Crew Dragon in 2020.",
        "The first private company to send humans to the Moon will be SpaceX's Starship in the future.",
        "The first private company to send humans to Mars will be SpaceX's Starship in the future.",
        "Black holes are regions in space where the gravitational pull is so strong that nothing, not even light, can escape.",
        "Pulsars are rapidly rotating neutron stars that emit beams of electromagnetic radiation.",
        "Quasars are extremely luminous active galactic nuclei powered by supermassive black holes.",
        "Galaxies are vast collections of stars, gas, dust, and dark matter bound together by gravity.",
        "The Milky Way is a spiral galaxy containing 100-400 billion stars.",
        "The Andromeda Galaxy is the closest major galaxy to the Milky Way.",
        "The observable universe is estimated to contain 2 trillion galaxies.",
        "Dark matter is a hypothetical form of matter thought to make up approximately 85% of the matter in the universe.",
        "Dark energy is a hypothetical form of energy thought to permeate all of space and cause the universe to accelerate in its expansion.",
        "The Big Bang theory is the prevailing cosmological model for the early development of the universe.",
        "Cosmic microwave background radiation is the oldest light in the universe, emitted about 380,000 years after the Big Bang.",
        "Inflationary theory suggests that the universe underwent a period of exponential expansion in its first fraction of a second.",
        "The universe is approximately 13.8 billion years old.",
        "The universe is expanding, and the rate of expansion is accelerating.",
        "The multiverse theory suggests that our universe is just one of many universes within a larger multiverse.",
        "String theory is a theoretical framework in which the point-like particles of particle physics are replaced by one-dimensional objects called strings.",
        "The Large Hadron Collider (LHC) is the world's largest and most powerful particle accelerator.",
        "The Higgs boson, discovered at the LHC in 2012, is a fundamental particle associated with the Higgs field, which gives other particles their mass.",
        "Antimatter is a material composed of antiparticles, which have the same mass as particles of ordinary matter but opposite charges.",
        "Positrons are the antiparticles of electrons, with the same mass but opposite charge.",
        "Neutrinos are subatomic particles that are electrically neutral and have a very small mass.",
        "Gravitational waves are ripples in spacetime caused by the acceleration of massive objects.",
        "The first direct detection of gravitational waves was made by LIGO in 2015, from the merger of two black holes.",
        "Exoplanets are planets that orbit stars outside our solar system.",
        "The first exoplanet discovered was 51 Pegasi b in 1995.",
        "The Kepler space telescope has discovered thousands of exoplanets.",
        "The TRAPPIST-1 system contains seven Earth-sized exoplanets, three of which are in the habitable zone.",
        "The habitable zone is the region around a star where the temperature is just right for liquid water to exist on the surface of a planet.",
        "The Drake Equation is a probabilistic argument used to estimate the number of active, communicative extraterrestrial civilizations in the Milky Way galaxy.",
        "The Fermi Paradox is the apparent contradiction between the high likelihood of the existence of extraterrestrial civilizations and the lack of contact or evidence for such civilizations.",
        "SETI (Search for Extraterrestrial Intelligence) is a collective term for scientific searches for intelligent extraterrestrial life.",
        "The 'Wow!' signal was a strong narrowband radio signal received by the Big Ear radio telescope in 1977, lasting for 72 seconds and never repeated.",
        "The Arecibo message was a radio message sent from the Arecibo Observatory in 1974, aimed at the globular star cluster M13, 25,000 light-years away.",
        "The Pioneer plaque and Voyager Golden Record are physical messages sent into space with the Pioneer and Voyager spacecraft, containing information about humanity and our location in the universe.",
        "The Breakthrough Listen project is a $100 million initiative to search for signs of intelligent life in the universe, funded by Yuri Milner.",
        "Fast radio bursts (FRBs) are transient radio pulses of unknown origin, lasting only a few milliseconds.",
        "The first repeating FRB, named FRB 121102, was discovered in 2016.",
        "The Event Horizon Telescope (EHT) is a global network of radio telescopes designed to image the event horizons of black holes.",
        "The first image of a black hole was taken by the EHT in 2019, showing the supermassive black hole at the center of the galaxy M87.",
        "The Chandrasekhar limit is the maximum mass of a stable white dwarf star, approximately 1.4 times the mass of the Sun.",
        "A supernova is a powerful and luminous explosion of a massive star at the end of its life.",
        "Gamma-ray bursts (GRBs) are the most powerful explosions in the universe, thought to be caused by the collapse of massive stars or the merger of neutron stars.",
        "The Crab Nebula is a supernova remnant, the result of a supernova explosion observed by Chinese astronomers in 1054 AD.",
        "Pulsars were discovered in 1967 by Jocelyn Bell Burnell and Antony Hewish.",
        "The first exoplanet discovered around a Sun-like star was 51 Pegasi b in 1995, by Michel Mayor and Didier Queloz.",
        "The Hubble Space Telescope has made over 1.5 million observations since its launch in 1990.",
        "The James Webb Space Telescope, launched in 2021, is the successor to the Hubble Space Telescope and will observe the universe in infrared light.",
        "The New Horizons spacecraft performed the first flyby of Pluto in 2015, providing the first close-up images of the dwarf planet.",
        "The Cassini-Huygens mission studied the Saturn system from 2004 to 2017, providing numerous insights into the planet, its rings, and its moons.",
        "The Mars rovers Spirit, Opportunity, Curiosity, and Perseverance have explored the surface of Mars, providing evidence of past water and potential habitability.",
        "The InSight lander, which touched down on Mars in 2018, is studying the planet's interior structure and seismic activity.",
        "The Parker Solar Probe, launched in 2018, is studying the Sun's outer corona and solar wind, approaching closer to the Sun than any previous spacecraft.",
        "The Lunar Reconnaissance Orbiter (LRO) has been studying the Moon since 2009, providing detailed maps and images of the lunar surface.",
        "The Chang'e 4 mission, launched by China in 2018, performed the first soft landing on the far side of the Moon and deployed the Yutu-2 rover.",
        "The Hayabusa2 mission, launched by Japan in 2014, collected samples from the asteroid Ryugu and returned them to Earth in 2020.",
        "The OSIRIS-REx mission, launched by NASA in 2016, collected samples from the asteroid Bennu and will return them to Earth in 2023.",
        "The Rosetta mission, launched by the European Space Agency in 2004, studied the comet 67P/Churyumov-Gerasimenko and deployed the Philae lander onto its surface.",
        "The New Horizons spacecraft, after its Pluto flyby, performed a flyby of the Kuiper Belt object Arrokoth in 2019, providing the first close-up images of a primitive solar system body."
    ];
      setFacts(fetchedFacts);
    };
    const fetchAstronomyImage = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_NASA_API_URL}`);
        console.log('API Response:', response); // Log the full response for debugging
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Log the data received
        if (data.url) {
          setAstronomyImage(data.url);
        } else {
          console.error('No image URL found in the response.');
        }
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };
    

    fetchFacts();
    fetchAstronomyImage();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prevFact) => (prevFact + 1) % facts.length);
    }, FACT_CHANGE_INTERVAL);

    return () => clearInterval(interval);
  }, [facts]);

  return (
    <div ref={heroRef} className='relative h-full w-full hero overflow-x-hidden pb-64'>
      <video loop autoPlay playsInline muted className='h-screen w-screen object-cover -z-10'>
        <source src="/space1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className='absolute inset-0 flex items-center justify-center'>
        <p className='text-6xl text-white font-spacefont'>Space Orrery Web</p>
      </div>

      {facts.length > 0 ? (
        <div className="absolute bottom-0 left-9 w-1/2 flex justify-center items-center mb-10 text-wrap">
          <p className="text-2xl text-white font-spacefont animate-fade">
            {facts[currentFact]}
          </p>
        </div>
      ) : (
        <div>Loading facts...</div>
      )}

      {astronomyImage ? (
        <div className='absolute bottom-10 right-10 w-auto h-56 flex flex-col gap-2 bg-black pt-4 px-4 pb-10 rounded-xl'>
          <p className='text-white font-spacefont'>ASTRONOMICAL PIC OF THE DAY</p>
          <img src={astronomyImage} alt="Astronomical Image of the Day" className='w-full h-full object-cover rounded-xl shadow-lg' />
        </div>
      ) : (
        <p className='text-white'>Loading image...</p>
      )}
    </div>
  );
}

export default Hero;
