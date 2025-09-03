"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Video from "next-video";
import getStarted from "/videos/main.mp4";
import Link from "next/link";

const HomePage = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const words = ["Future", "Home", "A New Era"];

  // Scroll animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.to(titleRef.current, {
        x: -500,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Typing effect
  useEffect(() => {
    let isMounted = true;
    const currentWord = words[currentWordIndex];

    const typeWord = async () => {
      if (!isMounted) return;
      setIsTyping(true);

      // Type forward
      for (let i = 0; i <= currentWord.length; i++) {
        if (!isMounted) return;
        setDisplayedText(currentWord.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      // Pause
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Erase
      for (let i = currentWord.length; i >= 0; i--) {
        if (!isMounted) return;
        setDisplayedText(currentWord.slice(0, i));
        await new Promise((resolve) => setTimeout(resolve, 50));
      }

      // Pause before next word
      await new Promise((resolve) => setTimeout(resolve, 300));

      if (isMounted) {
        setIsTyping(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    typeWord();

    return () => {
      isMounted = false;
    };
  }, [currentWordIndex, words]);

  return (
    <div className="min-h-screen flex flex-col">
      <div ref={heroRef} className="h-screen relative overflow-hidden">
        {/* Background Video */}
        <Video
          src={getStarted}
          className="absolute inset-0"
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
            <span className="relative inline-block min-w-[200px] sm:min-w-[250px] md:min-w-[300px]">
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
                {displayedText}
              </span>
              <span
                className={`inline-block w-[2px] h-[1em] bg-white ml-2 ${
                  isTyping ? "animate-blink" : ""
                }`}
              />
            </span>
          </h1>

          <Link
            href="/hoodies"
            className="px-6 py-3 border-2 border-white text-white bg-transparent font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-sm"
          >
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Cursor animation */}
      <style jsx>{`
        @keyframes blink {
          0%, 50%, 100% { opacity: 1; }
          25%, 75% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
