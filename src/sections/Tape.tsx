"use client";

import { useRef } from "react";
import StarIcon from "@/assets/icons/star.svg";
import { Fragment } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const words = [
  "Impactante",
  "Imersivo",
  "Cinematográfico",
  "Preciso",
  "Criativo",
  "Sofisticado",
  "Envolvente",
  "Dinâmico",
  "Memorável",
  "Autêntico",
  "Profissional",
];

export const TapeSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;

      // Animação de translação horizontal infinita base da fita
      const tween = gsap.to(track, {
        xPercent: -50,
        ease: "none",
        duration: 35,
        repeat: -1,
      });

      // ScrollTrigger para capturar a velocidade de rolagem e acelerar a fita
      ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          // Obtém a velocidade de rolagem e converte para um fator de aceleração
          const scrollVelocity = Math.abs(self.getVelocity());
          const speedMultiplier = 1 + scrollVelocity * 0.005;

          // Acelera instantaneamente a fita e desacelera suavemente de volta ao valor de cruzeiro (1.0)
          gsap.to(tween, {
            timeScale: speedMultiplier,
            duration: 0.2,
            overwrite: "auto",
            onComplete: () => {
              gsap.to(tween, {
                timeScale: 1.0,
                duration: 1.2,
                ease: "power2.out",
              });
            },
          });
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="py-16 lg:py-24 overflow-x-clip bg-section"
    >
      <div className="bg-gradient-to-r from-[#2ECC71] to-[#3f7efd] -rotate-3 -mx-1 sm:relative sm:bottom-5">
        <div className="flex [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          {/* Trilha horizontal contendo as palavras duplicadas para o loop infinito */}
          <div
            ref={trackRef}
            className="flex flex-none gap-4 py-3 pr-4 flex-nowrap"
          >
            {[
              ...new Array(2).fill(0).map((_, idx) => (
                <Fragment key={idx}>
                  {words.map((word) => (
                    <div key={word} className="inline-flex gap-4 items-center">
                      <span className="text-gray-900 uppercase font-extrabold text-sm whitespace-nowrap">
                        {word}
                      </span>
                      <StarIcon className="size-6 text-gray-900 -rotate-12 shrink-0" />
                    </div>
                  ))}
                </Fragment>
              )),
            ]}
          </div>
        </div>
      </div>
    </div>
  );
};
