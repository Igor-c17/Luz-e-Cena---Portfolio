"use client";

import { useRef } from "react";
import Image from "next/image";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import letreiro from "@/../../public/luz_e_cena_letreiro.png";
import logo from "@/../../public/logo.png";
import onda from "@/../../public/onda.png";
import explore from "@/../../public/explorar.png";
import { HeroOrbit } from "@/components/HeroOrbit";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra o plugin do GSAP apenas no lado do cliente
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const titleLineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      // 1. Text Reveal das linhas do título (Créditos de filme subindo de baixo para cima)
      gsap.from(titleLineRefs.current, {
        yPercent: 100,
        opacity: 0,
        stagger: 0.15,
        duration: 1.4,
        ease: "power4.out",
        delay: 0.2,
      });

      // 2. Revelação suave da Logo, Letreiro e descrição
      gsap.from(".hero-logo", {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      });

      gsap.from(".hero-badge, .hero-desc, .hero-buttons", {
        opacity: 0,
        y: 20,
        stagger: 0.2,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.6,
      });

      // 3. Zoom-out parallax do vídeo de fundo ao rolar a página
      if (videoContainerRef.current) {
        gsap.fromTo(
          videoContainerRef.current,
          { scale: 1.2, filter: "brightness(0.8)" },
          {
            scale: 1.0,
            filter: "brightness(0.4)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    },
    { scope: containerRef },
  );

  const titleLines = [
    "Onde a Luz Encontra",
    "Propósito e a",
    "Criatividade Ganha Forma",
  ];

  return (
    <div
      ref={containerRef}
      className="py-32 md:py-48 lg:py-60 relative z-0 overflow-hidden min-h-screen flex items-center justify-center"
      id="home"
    >
      {/* 🎥 Vídeo de Fundo em Looping com Zoom Parallax */}

      {/* Textura de Granulado Cinematográfico */}
      <div
        className="absolute inset-0 -z-20 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url(${grainImage.src})`,
        }}
      ></div>

      {/* Elementos Estelares Orbitantes do Design Original (Sob o Overlay) */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%,transparent)] opacity-40 pointer-events-none -z-10">
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>

        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-8 text-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={440}
          rotation={79}
          shouldOrbit
          orbitDuration="32s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-5 text-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={520}
          rotation={-41}
          shouldOrbit
          orbitDuration="34s"
          shouldSpin
          spinDuration="3s"
        >
          <div className="size-2 rounded-full bg-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-10 text-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={550}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-12 text-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-8 text-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={650}
          rotation={-5}
          shouldOrbit
          orbitDuration="42s"
          shouldSpin
          spinDuration="3s"
        >
          <div className="size-2 rounded-full bg-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-14 text-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={720}
          rotation={85}
          shouldOrbit
          orbitDuration="46s"
          shouldSpin
          spinDuration="6s"
        >
          <div className="size-3 rounded-full bg-[#0646C9]/60" />
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="48s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-28 text-[#0646C9]/60" />
        </HeroOrbit>
      </div>

      <div className="container relative z-10 text-center">
        <div className="flex flex-col items-center">
          <div className="relative w-full h-[240px] flex items-center justify-center">
            <Image
              src={logo}
              className="size-[150px] md:size-[160px] absolute pointer-events-none z-0 hero-loger hero-logo"
              alt="Estúdio Luz e Cena Logo"
              priority
            />
            <Image
              src={letreiro}
              className="size-[200px] md:size-[250px] absolute top-[90px] pointer-events-none z-0 hero-letreiro hero-logo"
              alt="Letreiro Luz e Cena"
              priority
            />
          </div>

          <div className="bg-[#0a3996]/40 border border-[#0850e0]/80 px-4 py-1.5 inline-flex items-center gap-4 rounded-lg z-10 hero-badge mt-4">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
            </div>
            <div className="text-sm font-medium text-white">
              Disponível Para Novos Projetos
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-6">
          {/* GSAP Text Reveal Title */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-center tracking-wide leading-tight mt-6">
            {titleLines.map((line, idx) => (
              <span
                key={idx}
                className="block overflow-hidden h-[1.2em] relative"
              >
                <span
                  ref={(el) => {
                    titleLineRefs.current[idx] = el;
                  }}
                  className="inline-block origin-bottom-left select-none text-transparent bg-clip-text bg-gradient-to-r from-[#0646C9] via-[#0646C9] to-[#0646C9]/70"
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <div className="relative inline-block hero-desc max-w-xl mx-auto">
            <p className="mt-7 text-center text-[#0646C9]/80 text-base md:text-lg p_shine leading-relaxed">
              O Luz e Cena habita o universo da expressão visual autêntica, da
              criatividade sem limites e da sofisticação acessível. Suas
              fronteiras são a vulgaridade, a padronização e a pressa que mata a
              alma criativa. Seus símbolos são a luz natural que abraça, os
              cenários que se transformam, a escuta atenta e os sorrisos
              genuínos que florescem.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center mt-10 gap-4 hero-buttons">
          <a href="#studio-tour" className="w-full md:w-auto">
            <button className="inline-flex items-center justify-center gap-2 border border-[#0646C9]/30 hover:border-[#0646C9] bg-black/40 hover:bg-black/60 px-6 h-12 rounded-xl neon transition-all duration-300 w-full">
              <Image
                src={explore}
                className="size-4 relative pointer-events-none z-0 opacity-70"
                alt="Explorar Ícone"
              />
              <span className="font-semibold text-white">
                Explore o Estúdio
              </span>
              <ArrowDown className="size-4 text-white" />
            </button>
          </a>
          <a href="#contact" className="w-full md:w-auto">
            <button className="inline-flex items-center justify-center gap-2 border border-white/20 bg-[#0a3996] hover:bg-[#0850e0] text-white h-12 px-6 rounded-xl transition-all duration-300 w-full shadow-lg shadow-[#0a3996]/50">
              <span>
                <Image
                  src={onda}
                  className="size-5 pointer-events-none z-0"
                  alt="Onda Ícone"
                />
              </span>
              <span className="font-semibold">Vamos Conversar!</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
