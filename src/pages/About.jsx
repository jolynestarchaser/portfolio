import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import IntroScreen from "../components/IntroScreen";
import JoeImg from "../assets/joe.webp";
import InstraGram from "../components/InstraGram";
import { videoData } from "../data/vid";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const [isIntroDone, setIsIntroDone] = useState(false);
  const containerRef = useRef(null);

    return (
    <div
      ref={containerRef}
      className="bg-[#77FF00] min-h-screen overflow-hidden"
    >
  
    </div>
  );
}
