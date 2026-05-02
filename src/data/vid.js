// src/data/videoData.js

export const videoData = [
  {
    id: 1,
    title: "Creative Portfolio Reel 2026",
    description: "A showcase of my latest web development and design projects.",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // ตัวอย่างลิงก์วิดีโอภายนอก
    thumbnail: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop", 
    category: "Showreel",
    duration: "01:45"
  },
  {
    id: 2,
    title: "GSAP Animation Tutorial",
    description: "Learn how to create smooth scrolling animations with GSAP.",
    // ถ้าใช้ไฟล์ในเครื่อง ให้ import หรือชี้ path ไปที่โฟลเดอร์ public/
    videoUrl: "/videos/gsap-tutorial.mp4", 
    thumbnail: "/images/gsap-cover.jpg",
    category: "Tutorial",
    duration: "05:20"
  },
  {
    id: 3,
    title: "MERN Stack E-commerce",
    description: "Full-stack application built with MongoDB, Express, React, and Node.js.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // ตัวอย่างลิงก์ Embed YouTube
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop",
    category: "Web Dev",
    duration: "12:00"
  }
];