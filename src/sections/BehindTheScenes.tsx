"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import rawImage from "@/../../public/estudio_6.jpg";
import gradedImage from "@/../../public/estudio_7.png";
import index from "@/../../public/bg_index.png";

export const BehindTheScenesSection = () => {
  const [sliderPosition, setSliderPosition] = useState<number>(50); // Inicia na metade
  const [isDragging, setIsDragging] = useState<boolean>(false);

  return (
    <section
      id="behind-the-scenes"
      className="py-20 md:py-28 bg-[#0646C9]/20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${index.src})`,
        backgroundSize: "700px",
      }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="A Mágica da Cor"
          title="Colorização Cinematográfica"
          description="Veja a diferença entre a captura bruta do set (RAW) e a finalização com nosso Cinematic Color Grading profissional."
        />

        <div className="mt-12 md:mt-20 flex justify-center items-center">
          <div className="relative w-full max-w-4xl h-[300px] sm:h-[450px] md:h-[550px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-black">
            {/* 1. Imagem de Fundo (Colorizada / DEPOIS) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={gradedImage.src}
                alt="Foto Finalizada"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md text-white text-xs md:text-sm px-4 py-1.5 rounded-full font-bold tracking-widest uppercase border border-white/10">
                Depois: Color Grading
              </div>
            </div>

            {/* 2. Imagem de Cima (Bruta / ANTES) - Usando Clip-Path para não esmagar */}
            <div
              className="absolute inset-0 w-full h-full z-10"
              style={{
                // O clip-path funciona como uma guilhotina. Corta tudo que passa da porcentagem do slider.
                clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
              }}
            >
              <img
                src={rawImage.src}
                alt="Foto RAW"
                className="w-full h-full object-cover pointer-events-none"
              />
              <div className="absolute bottom-6 left-6 bg-[#0646C9]/80 backdrop-blur-md text-white text-xs md:text-sm px-4 py-1.5 rounded-full font-bold tracking-widest uppercase border border-white/10">
                Antes: Captura RAW
              </div>
            </div>

            {/* 3. Linha e Bolinha Divisória */}
            <div
              className="absolute top-0 bottom-0 w-1 bg-white z-20 pointer-events-none"
              style={{ left: `calc(${sliderPosition}% - 2px)` }}
            >
              {/* Bolinha animada que reage quando estamos arrastando */}
              <motion.div
                // Passamos o eixo X e Y direto pro Framer Motion controlar
                style={{ x: "-50%", y: "-50%" }}
                animate={{ scale: isDragging ? 1.2 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                // Tiramos os -translate daqui e deixamos só o top e left
                className="absolute top-1/2 left-1/2 size-10 sm:size-12 rounded-full bg-white text-black shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center border-2 border-black/10"
              >
                <div className="flex gap-1 items-center justify-center text-black/70">
                  <span className="text-[10px] sm:text-xs font-black">◀</span>
                  <span className="text-[10px] sm:text-xs font-black">▶</span>
                </div>
              </motion.div>
            </div>

            {/* 4. O SEGREDO: O Input Range Invisível */}
            {/* É ele quem faz o trabalho sujo de rastrear o mouse/dedo sem bugar */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={(e) => setSliderPosition(Number(e.target.value))}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
