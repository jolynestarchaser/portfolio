// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LogoSvg from "./assets/starchaserlogo.svg?react";
import { useEffect } from "react";
import { bgMusic } from "./utils/sounds.js";

function App() {
  useEffect(() => {
    return () => {
      bgMusic.unload(); // คืน Memory เมื่อปิดเว็บ
    };
  }, []);
  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center text-black ">
        <Link to="/" className="block">
          {/* เปลี่ยนจาก text-black เป็น text-white ครับ */}
          <LogoSvg className="h-8 md:h-10 w-auto text-black transition-colors" />
        </Link>
        <ul className="flex gap-6 text-sm font-medium">
          <li>
            <Link to="/work" className="hover:text-gray-300 transition-colors">
              Work
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-300 transition-colors">
              About
            </Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
