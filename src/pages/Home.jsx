import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroScreen from "../components/IntroScreen";
import JoeImg from "../assets/joe.webp";
import InstraGram from "../components/InstraGram";
import { videoData } from "../data/vid";
import VideoCard from "../components/VideoCard";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isIntroDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isIntroDone]);

  return (
    <div
      ref={containerRef}
      className="bg-[#77FF00] min-h-screen overflow-hidden"
    >
      {!isIntroDone && <IntroScreen onComplete={() => setIsIntroDone(true)} />}

      <main className="text-black font-sans relative z-0 min-h-screen container mx-auto px-5 md:px-8">
        {/* --- ส่วน Hero Section --- */}
        {/* มือถือเป็น flex-col รูปอยู่บน / Desktop เป็น flex-row รูปอยู่ขวา */}
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-2 md:gap-12 pt-24 md:pt-32 min-h-[90vh]">
          {/* ฝั่งรูปภาพ (บนมือถือจะถูกดึงขึ้นมาเป็นอันดับ 1 ด้วย order-1) */}
          <div className="flex-1 w-full relative h-[45vh] md:h-auto order-1 md:order-2 flex justify-center items-end">
            <img
              src={JoeImg}
              // ใช้ object-contain และ object-bottom เพื่อไม่ให้รูปคนโดนตัดหัวบนมือถือ
              className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-2xl"
              alt="Profile"
            />
          </div>

          {/* ฝั่งข้อความ (บนมือถือจะเป็นอันดับ 2 ด้วย order-2) */}
          <div className="flex-1 flex flex-col justify-center order-2 md:order-1 pb-12 md:pb-0 z-10">
            <h2 className="fade-up text-xs md:text-sm font-bold tracking-widest uppercase mb-3 opacity-70">
              Creative Technologist
            </h2>

            {/* ใช้ text-[14vw] เพื่อให้ตัวหนังสือปรับขนาดพอดีขอบจอมือถือเป๊ะๆ */}
            <h1 className="fade-up text-[14vw] md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-6">
              Jolyne <br /> ⭑Starchaser
            </h1>

            <p className="fade-up text-sm md:text-lg max-w-xl leading-relaxed mb-8 opacity-90">
              Creative and adaptable Software Developer transitioning from a
              successful 4-year career in graphic design, recently completing a
              MERN stack bootcamp. Combines strong frontend capabilities with
              advanced design expertise.
            </p>

            {/* ปุ่มกด: มือถือกว้างเต็มจอ (w-full) ทรงแคปซูล / Desktop กว้างพอดีคำ (md:w-fit) */}
            <button className="fade-up bg-black text-[#77FF00] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm w-full md:w-fit hover:scale-105 active:scale-95 transition-transform shadow-xl">
              View My Work
            </button>
          </div>
        </div>

        {/* --- ส่วน Video Gallery (Horizontal Swipe) --- */}
        <section className="mt-20 mb-32 overflow-hidden">
          {/* หัวข้อ */}
          <div className="container mx-auto px-5 mb-10 flex items-end justify-between border-b-4 border-black pb-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase">
              Showreel
            </h2>
          </div>

          {/* 🌟 กล่อง Carousel ปัดซ้ายขวา */}
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory px-5 md:px-[10vw] pb-10 hide-scrollbar">
            {/* 🌟 วนลูปเรียกใช้ VideoCard ที่เรา Import มา */}
            {videoData.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}

            {/* กล่องใสๆ ดันขอบตัวสุดท้ายให้มีที่ว่างตอนปัดสุดจอ */}
            <div className="shrink-0 md:w-[10vw] h-full"></div>
          </div>
        </section>
      </main>
    </div>
  );
}
