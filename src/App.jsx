// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import LogoSvg from "./assets/starchaserlogo.svg?react";
// 🌟 เอา import useEffect และ bgMusic ออกได้เลยครับ เพราะไม่ได้ใช้ในหน้านี้แล้ว

function App() {
  // 🌟 ลบ useEffect ที่สั่ง bgMusic.unload() ทิ้งไปเลยครับ

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 p-6 flex justify-between items-center text-black ">
        <Link to="/" className="block">
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
