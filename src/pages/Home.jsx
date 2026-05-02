import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import IntroScreen from "../components/IntroScreen";
import JoeImg from "../assets/joe.webp";

export default function Home() {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const containerRef = useRef(null);

  // ล็อคไม่ให้ Scroll ได้จนกว่า Intro จะเล่นจบและสไลด์หายไป
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

  // แอนิเมชันหน้า Home (เอา ScrollTrigger ออกก่อน ใช้แค่ Delay รอให้ม่านเปิดสุด)

  return (
    <div ref={containerRef} className="bg-[#77FF00] min-h-screen">
      {/* หน้า Intro ลอยทับอยู่ข้างบนสุด */}
      {!isIntroDone && <IntroScreen onComplete={() => setIsIntroDone(true)} />}

      {/* เนื้อหาหน้า Home ที่ซ่อนอยู่ข้างล่าง พอ Intro สไลด์ขึ้นไปก็จะเห็นหน้านี้ */}
      <main className="text-black font-sans elative z-0 min-h-screen content-center container mx-auto">
        <div className="flex flex-col md:flex-row items-stretch gap-8 md:gap-12">
          <div className="flex-1 flex flex-col justify-center">
            <h2 className="fade-up text-[#000000] font-semibold tracking-widest uppercase mb-4">
              Creative Technologist
            </h2>

            <h1 className="fade-up text-5xl md:text-8xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
              Jolyne <br /> ⭑Starchaser
            </h1>

            <p className="fade-up text-black text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              Creative and adaptable Software Developer transitioning from a
              successful 4-year career in graphic design, recently completing a
              MERN stack bootcamp. Combines strong frontend capabilities (HTML,
              CSS, JavaScript) with advanced design expertise (Figma, Adobe
              Creative Suite) to deliver intuitive user experiences. A proactive
              problem-solver with a continuous learning mindset, ready to drive
              impactful results in a collaborative team
            </p>

            <button className="fade-up bg-[#77FF00] text-black  font-bold uppercase tracking-wide flex justify-first">
              View My Work
            </button>
          </div>
          <div className="flex-1 w-full relative min-h-[400px] md:min-h-0">
            <img src={JoeImg} className=""></img>
          </div>
        </div>
      </main>
    </div>
  );
}
