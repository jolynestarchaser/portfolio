import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import starSvg from "../assets/star.svg";
import { Howler } from "howler";
import { bgMusic } from "../utils/sounds";

export default function IntroScreen({ onComplete }) {
  const containerRef = useRef(null);
  const scrollPromptRef = useRef(null);
  const titleWrapperRef = useRef(null);

  const finalWord = "CRE4TIVITY";
  const finalWordChars = finalWord.split("");
  const charRefs = useRef([]);
  const chars = "CRE4TIVITY!@#$%^&*()_+-=[]{}|;':,./<>?";

  useGSAP(
    () => {
      // A. Timeline แอนิเมชันข้อความสุ่มทีละตัว
      const tlText = gsap.timeline();

      finalWordChars.forEach((char, index) => {
        const charElement = charRefs.current[index];
        const privateScrambleObj = { progress: 0 };
        tlText.to(
          privateScrambleObj,
          {
            progress: 1,
            duration: 0.8,
            ease: "power1.out",
            onStart: () => gsap.to(charElement, { opacity: 1, duration: 0.1 }),
            onUpdate: () => {
              if (privateScrambleObj.progress < 0.9) {
                charElement.innerText =
                  chars[Math.floor(Math.random() * chars.length)];
              } else {
                charElement.innerText = char;
              }
            },
            onComplete: () => (charElement.innerText = char),
          },
          index * 0.1,
        );
      });

      const subtitle = containerRef.current.querySelector("p");
      if (subtitle) {
        tlText.from(
          subtitle,
          { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" },
          "-=0.2",
        );
      }

      // B. จังหวะ Transition เมื่อข้อความจบ
      tlText.eventCallback("onComplete", () => {
        gsap.to(scrollPromptRef.current, {
          opacity: 1,
          y: 10,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });

        let isTransitioning = false; 

        const triggerStarTransition = () => {
          if (isTransitioning) return; 
          isTransitioning = true; 

          window.removeEventListener("wheel", triggerStarTransition);
          window.removeEventListener("touchstart", triggerStarTransition);

          if (Howler.ctx && Howler.ctx.state === 'suspended') {
            Howler.ctx.resume().then(() => {
              if (!bgMusic.playing()) { 
                bgMusic.play();
                bgMusic.fade(0, 0.3, 2000);
              }
            });
          } else {
            if (!bgMusic.playing()) { 
              bgMusic.play();
              bgMusic.fade(0, 0.3, 2000);
            }
          }

          const tlTransition = gsap.timeline();

          tlTransition.to([titleWrapperRef.current, scrollPromptRef.current], {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "power3.inOut"
          });

          tlTransition.to(containerRef.current, {
            "--star-size": "4000px", 
            duration: 1.5,
            ease: "power4.inOut",
            onComplete: () => {
              if (onComplete) onComplete();
            }
          }, "-=0.5"); 
        };

        window.addEventListener("wheel", triggerStarTransition);
        window.addEventListener("touchstart", triggerStarTransition);
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 w-full flex flex-col items-center justify-center bg-[#000000] text-[#77FF00] font-sans"
      style={{
        "--star-size": "0px", 
        WebkitMaskImage: `url("${starSvg}"), linear-gradient(white, white)`,
        WebkitMaskPosition: "center, center",
        WebkitMaskRepeat: "no-repeat, no-repeat",
        WebkitMaskSize: "var(--star-size), 100%",
        WebkitMaskComposite: "destination-out",
        maskComposite: "exclude", 
      }}
    >
      <div className="absolute top-6 left-6 text-sm font-semibold opacity-70">
        Welcome
      </div>

      <div
        ref={titleWrapperRef}
        className="text-center flex flex-col items-center"
      >
        <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-4 flex gap-1">
          {finalWordChars.map((char, index) => (
            <span
              key={index}
              ref={(el) => (charRefs.current[index] = el)}
              className="opacity-0"
            >
              {char}
            </span>
          ))}
        </h1>
        <p className="text-lg md:text-3xl font-extrabold uppercase tracking-widest">
          Is the key to conquer the world
        </p>
      </div>

      <div
        ref={scrollPromptRef}
        className="absolute bottom-10 opacity-0 flex flex-col items-center font-bold tracking-widest uppercase text-sm"
      >
        <span>Scroll to Reveal</span>
        <span>↓</span>
      </div>
    </div>
  );
}