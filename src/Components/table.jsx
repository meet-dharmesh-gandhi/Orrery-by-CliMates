import Sun from "./sun";
import Planet from "./planets";
import Creation from "./creation";
import { useState } from "react";

function Table({ libraryRef }) {
  const [activeComponent, setActiveComponent] = useState(<Sun />);
  const [activeItem, setActiveItem] = useState("sun");

  const renderData = (e) => {
    const { id } = e.target;
    setActiveItem(id);
    if (id === "creation") {
      setActiveComponent(<Creation />);
    } else if (id === "sun") {
      setActiveComponent(<Sun />);
    } else if (id === "planets") {
      setActiveComponent(<Planet />);
    }
  };

  return (
    <div className="flex h-screen bg-[#001448] font-spacefont text-white" ref={libraryRef} >
      <div className="w-1/5 border-2 border-black flex flex-col items-center pt-10 bg-[#22376e] text-[#e0e0e0]">
        <h1>The Solar</h1>
        <h1 className="mb-36">Library</h1>
        <ul className="list-none">
          <li>
            <ul
              className={`cursor-pointer rounded-lg mb-20 p-5 ${activeItem === "creation" ? "bg-blue-500 text-white" : "text-gray-400"}`}
              id="creation"
              onClick={renderData}
            >
              The Creation
            </ul>
            <ul
              className={`cursor-pointer rounded-lg mb-20 p-5 ${activeItem === "sun" ? "bg-blue-500 text-white" : "text-gray-400"}`}
              id="sun"
              onClick={renderData}
            >
              The Sun
            </ul>
            <ul
              className={`cursor-pointer rounded-lg mb-20 p-5 ${activeItem === "planets" ? "bg-blue-500 text-white" : "text-gray-400"}`}
              id="planets"
              onClick={renderData}
            >
              The Planets
            </ul>
          </li>
        </ul>
      </div>
      <div className="w-4/5 border-2 border-black relative">
        <div className="h-12 border-b-2 border-black flex justify-center items-center font-bold text-xl">
          <p>|| पूर्णमदः पूर्णमिदं पूर्णात्पुर्णमुदच्यते ||</p>
        </div>
        <div className="h-[88%] p-7 overflow-y-scroll">
          {activeComponent}
        </div>
        <div className="absolute bottom-0 right-5 border-2 border-black p-1 px-5 font-spacefont cursor-pointer mb-2 hover:bg-blue-500 hover:text-white">
          <p>Next Page</p>
        </div>
      </div>
    </div>
  );
}

export default Table;
