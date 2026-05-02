import { useEffect, useRef } from "react";

export default function VideoCard({ video }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // ใช้ Intersection Observer เพื่อดูว่าวิดีโออยู่กลางจอหรือไม่
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current.play();
        } else {
          videoRef.current.pause();
          videoRef.current.currentTime = 0; // รีเซ็ตวิดีโอเมื่อปัดออก
        }
      },
      { threshold: 0.8 }, // ต้องเห็นวิดีโออย่างน้อย 80% ถึงจะเริ่มเล่น
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current);
    };
  }, []);

  return (
    <div className="snap-center shrink-0 w-[85vw] md:w-[400px] aspect-[9/16] bg-black rounded-[2rem] overflow-hidden relative shadow-2xl">
      <video
        ref={videoRef}
        src={video.videoUrl}
        className="w-full h-full object-cover"
        loop
        muted // ต้อง Muted ไว้เพื่อให้ Auto-play ทำงานได้ทุก Browser
        playsInline
        controls
      />

      {/* Overlay ข้อมูลวิดีโอ */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-8 flex flex-col justify-end pointer-events-none">
        <h3 className="text-[#77FF00] text-2xl font-black  italic leading-none mb-2">
          {video.title}
        </h3>
        <p className="text-white/70 text-sm line-clamp-2">
          {video.description}
        </p>
      </div>
    </div>
  );
}
