"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HomePage = () => {
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const rightTitleMainRef = useRef<HTMLDivElement>(null);
  const rightTitleSubMain1Ref = useRef<HTMLDivElement>(null);
  const rightTitleSubMain2Ref = useRef<HTMLDivElement>(null);
  const rightTitleSubMain3Ref = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const words = ["Future", "Home", "A New Era"];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Image scroll up effect
      gsap.to(imageRef.current, {
        y: -window.innerHeight - 200,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

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

      gsap.to(rightTitleMainRef.current, {
        x: 500,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
      gsap.to(rightTitleSubMain1Ref.current, {
        x: 500,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.6,
        },
      });
      gsap.to(rightTitleSubMain2Ref.current, {
        x: 500,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2,
        },
      });
      gsap.to(rightTitleSubMain3Ref.current, {
        x: 500,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2.4,
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
        await new Promise(resolve => setTimeout(resolve, 100)); // Typing speed
      }
      
      // Pause at full word
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Type backward (erase)
      for (let i = currentWord.length; i >= 0; i--) {
        setDisplayedText(currentWord.slice(0, i));
        await new Promise(resolve => setTimeout(resolve, 50)); // Erasing speed (faster)
      }
      
      // Pause before next word
      await new Promise(resolve => setTimeout(resolve, 300));
      
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
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div
        ref={heroRef}
        className="bg-black h-[calc(100vh-73px)] relative overflow-hidden"
      >
        {/* Title */}
        <div className="">
          <h1
            ref={titleRef}
            className="font-in text-start text-white text-8xl font-semibold pt-32 pl-8"
          >
            Welcome to <br />
            <span 
              ref={wordRef}
              className="relative inline-block min-w-[300px]"
            >
                <span className="text-6xl">{displayedText}</span>
              <span 
                className={`inline-block w-[1px] h-[0.5em] bg-white ml-2 ${
                  isTyping ? 'animate-pulse' : 'animate-ping'
                }`}
                style={{ animation: 'blink 1s infinite' }}
              />
            </span>
          </h1>
          <button className="mt-10 ml-7 px-6 py-3 border text-black bg-white font-semibold rounded-full hover:bg-black hover:text-white transition-all duration-300 transform hover:scale-105">
            Explore Collection
          </button>
        </div>

        {/* Main Image */}
        <div ref={imageRef} className="absolute top-[0rem] left-[20rem]">
          <Image
            src="/images/main-1.png"
            alt="img"
            width={1000}
            height={1000}
            priority
          />
        </div>

        {/* Introductory Text - Right Side */}
        <div
          className="absolute right-8 top-1/2 transform -translate-y-1/2 max-w-[400px] z-10"
        >
          <h2 ref={rightTitleMainRef} className="main-text-right text-3xl text-white font-bold mb-6 leading-tight">
            Step into tomorrow. <br />
            <span className="text-white">Wear the revolution.</span>
          </h2>

          <div className="space-y-4 text-gray-300">
            <p ref={rightTitleSubMain1Ref} className="main-left-subtext-1 text-lg leading-relaxed">
              At <span className="text-white font-semibold">Hoodie</span>,
              we do not just create clothing – we engineer experiences.
            </p>

            <p ref={rightTitleSubMain2Ref} className="main-left-subtext-2 text-base leading-relaxed">
              Our cutting-edge garments blend advanced technology with visionary
              design, crafting apparel that adapts to your lifestyle and
              amplifies your potential.
            </p>
            <p ref={rightTitleSubMain3Ref} className="main-left-subtext-3 text-sm italic text-gray-400">
              Our designs do not follow trends – they create them.
            </p>
          </div>
        </div>
      </div>

      <div className="h-screen bg-gray-100">
        <div className="flex items-center justify-center h-full">
          <h2 className="text-4xl font-bold text-gray-800">Next Section</h2>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default HomePage;