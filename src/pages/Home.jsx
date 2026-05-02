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

  // 🌟 เพิ่ม Ref 2 ตัวนี้สำหรับจัดการ Horizontal Scroll
  const horizontalSectionRef = useRef(null);
  const horizontalWrapperRef = useRef(null);

  useEffect(() => {
    if (!isIntroDone) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isIntroDone]);

  // 🌟 พลังของ GSAP: เปลี่ยน Scroll ลง เป็นเลื่อนซ้าย
  useGSAP(
    () => {
      if (!isIntroDone) return;

      const section = horizontalSectionRef.current;
      const wrapper = horizontalWrapperRef.current;

      // คำนวณระยะทางที่ต้องเลื่อนแกน X (เอาความกว้างทั้งหมด ลบความกว้างหน้าจอ)
      const getScrollAmount = () => -(wrapper.scrollWidth - window.innerWidth);

      gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top", // เริ่มทำงานและล็อคจอเมื่อขอบบนของ Section แตะขอบจอบน
          end: () => `+=${wrapper.scrollWidth - window.innerWidth}`, // ระยะทาง Scroll เท่ากับระยะที่จะเลื่อนการ์ด
          pin: true, // ล็อคหน้าจอนี้ไว้จนกว่าจะเลื่อนการ์ดหมด
          scrub: 1, // หน่วงเวลา 1 วินาทีให้ดูสมูท สมูทแบบเว็บ Awwwards!
          invalidateOnRefresh: true, // คำนวณระยะใหม่เสมอเวลาย่อ/ขยายจอ
        },
      });
    },
    { scope: containerRef, dependencies: [isIntroDone] },
  );

  return (
    <div
      ref={containerRef}
      className="bg-[#77FF00] min-h-screen overflow-hidden"
    >
      {!isIntroDone && <IntroScreen onComplete={() => setIsIntroDone(true)} />}

      <main className="text-black font-sans relative z-0 min-h-screen">
        {/* --- ส่วน Hero Section (ปรับโครงสร้างนิดหน่อย) --- */}
        <div className="container mx-auto px-5 md:px-8 flex flex-col md:flex-row items-center md:items-stretch gap-2 md:gap-12 pt-24 md:pt-32 min-h-[90vh]">
          <div className="flex-1 w-full relative h-[45vh] md:h-auto order-1 md:order-2 flex justify-center items-end">
            <img
              src={JoeImg}
              className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-2xl"
              alt="Profile"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center order-2 md:order-1 pb-12 md:pb-0 z-10">
            <h2 className="fade-up text-xs md:text-sm font-bold tracking-widest uppercase mb-3 opacity-70">
              Creative Technologist
            </h2>
            <h1 className="fade-up text-[14vw] md:text-8xl font-black uppercase leading-[0.85] tracking-tighter mb-6">
              Jolyne <br /> ⭑Starchaser
            </h1>
            <p className="fade-up text-sm md:text-lg max-w-xl leading-relaxed mb-8 opacity-90">
              Creative and adaptable Software Developer transitioning from a
              successful 4-year career in graphic design...
            </p>
            <button className="fade-up bg-black text-[#77FF00] px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm w-full md:w-fit hover:scale-105 active:scale-95 transition-transform shadow-xl">
              View My Work
            </button>
          </div>
        </div>

        {/* --- 🌟 ส่วน Video Gallery (GSAP Horizontal Scroll) --- */}
        {/* ใช้ h-screen เพื่อให้ Section นี้ยึดเต็มจอเวลาโดน Pin */}
        <section
          ref={horizontalSectionRef}
          className="h-screen w-full flex flex-col justify-center overflow-hidden bg-[#77FF00]"
        >
          <div className="container mx-auto px-5 mb-8 flex justify-between items-end border-b-4 border-black pb-4 shrink-0">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
              Showreel
            </h2>
          </div>

          {/* 🌟 พระเอกของการจัดกึ่งกลาง: ใช้ px-[calc(...)] เพื่อดันการ์ดใบแรกและใบสุดท้ายให้อยู่กลางจอเป๊ะๆ */}
          {/* บนมือถือ: 50vw - (85vw/2) | บน Desktop: 50vw - (400px/2) */}
          <div
            ref={horizontalWrapperRef}
            className="flex gap-8 md:gap-16 w-max px-3 md:px-5 items-start"
          >
            {videoData.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        </section>

        {/* Spacer เผื่อเนื้อหาด้านล่าง (ใส่ Instagram กลับเข้ามาตรงนี้ได้ครับถ้ามี) */}
      </main>
    </div>
  );
}
