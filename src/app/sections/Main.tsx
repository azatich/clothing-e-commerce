"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Video from 'next-video';
import getStarted from '/videos/main.mp4';
import Link from "next/link";


const HomePage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const words = ["Future", "Home", "A New Era"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        x: -500,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Typed animation effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];

    const typeWord = async () => {
      setIsTyping(true);

      // Type forward
      for (let i = 0; i <= currentWord.length; i++) {
        setDisplayedText(currentWord.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100)); // Typing speed
      }

      // Pause at full word
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Type backward (erase)
      for (let i = currentWord.length; i >= 0; i--) {
        setDisplayedText(currentWord.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 50)); // Erasing speed (faster)
      }

      // Pause before next word
      await new Promise((resolve) => setTimeout(resolve, 300));

      setIsTyping(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    };

    const timer = setTimeout(() => {
      typeWord();
    }, 500);

    return () => clearTimeout(timer);
  }, [currentWordIndex]);

  // Start initial animation
  useEffect(() => {
    setDisplayedText("Future");
    const timer = setTimeout(() => {
      setCurrentWordIndex(0);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div ref={heroRef} className="h-screen relative overflow-hidden">
        {/* Background Video */}
        <Video
          src={getStarted}
          className="w-full h-full object-cover"
          // Add these props for better control
          muted
          loop
          autoPlay
          playsInline
        />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col justify-center items-center z-20 px-4 sm:px-8">
          <h1
            ref={titleRef}
            className="font-in text-center text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extralight mb-8 drop-shadow-2xl"
          >
            Welcome to <br />
            <span 
              ref={wordRef} 
              className="relative inline-block min-w-[200px] sm:min-w-[250px] md:min-w-[300px]"
            >
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {displayedText}
              </span>
              <span
                className={`inline-block w-[1px] h-[0.5em] bg-white ml-2 ${
                  isTyping ? "animate-pulse" : "animate-ping"
                }`}
                style={{ animation: "blink 1s infinite" }}
              />
            </span>
          </h1>
          
          <Link href='/hoodies' className="px-6 py-3 border-2 border-white text-white bg-transparent font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm">
            Explore Collection
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;