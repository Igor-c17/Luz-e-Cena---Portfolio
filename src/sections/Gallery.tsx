"use client";
import { useState, useRef, MouseEvent, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import image1 from "@/../../public/estudio_1.jpg";
import image2 from "@/../../public/estudio_2.jpg";
import image3 from "@/../../public/estudio_cam.png";
import image4 from "@/../../public/estudio_4.jpg";
import image5 from "@/../../public/estudio_5.jpg";
import image6 from "@/../../public/estudio_6.jpg";
import image7 from "@/../../public/estudio_7.png";
import image8 from "@/../../public/estudio_8.png";
import image9 from "@/../../public/estudio_9.jpg";
import image10 from "@/../../public/estudio_10.png";

const images = [
  { id: 1, src: image1.src, alt: "Fachada do Estúdio" },
  { id: 2, src: image2.src, alt: "Retrato Corporativo" },
  { id: 3, src: image3.src, alt: "Estúdio Luz" },
  { id: 4, src: image7.src, alt: "Editorial" },
  { id: 5, src: image10.src, alt: "Gestante" },
  { id: 6, src: image6.src, alt: "Fine Art" },
  { id: 7, src: image8.src, alt: "Gestante" },
  { id: 8, src: image5.src, alt: "Fine Art" },
  { id: 9, src: image4.src, alt: "Fine Art" },
];

export function Gallery() {
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Referência para o container mobile ler o scroll
  const carouselRef = useRef<HTMLDivElement>(null);

  // Lógica exclusiva do Desktop
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!indicatorRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - 2.5;
    indicatorRef.current.style.transform = `translateX(${x}px)`;
  };

  return (
    <div className="bg-section pt-0 pb-10">
      <SectionHeader
        eyebrow="Nosso Espaço"
        title="Estrutura Que Impulsiona Ideias"
        description="Nosso estúdio foi projetado para oferecer conforto, funcionalidade e inspiração em cada detalhe."
      />

      <div className="w-full flex items-center justify-center py-10 md:py-0 overflow-hidden">
        {/* 💻 VERSÃO DESKTOP: Acordeão fluido */}
        <div
          className="hidden md:block relative w-[1000px] max-w-[95vw] mx-auto py-8 px-2"
          onMouseMove={handleMouseMove}
        >
          <div
            ref={indicatorRef}
            className="absolute top-2 left-0 w-[5px] h-[5px] bg-white rounded-full pointer-events-none z-10 transition-transform duration-75 ease-out"
          />

          <div className="flex gap-2 w-full h-[500px] mt-6">
            {images.map((item, i) => (
              <motion.div
                key={item.id}
                layout
                onMouseEnter={() => setHoveredIndex(i)}
                className="relative h-full rounded-2xl overflow-hidden cursor-pointer"
                animate={{
                  flex: hoveredIndex === i ? 3 : 1,
                  filter:
                    hoveredIndex === i ? "brightness(1.1)" : "brightness(0.5)",
                }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* 📱 VERSÃO MOBILE/TABLET: Carrossel com Parallax */}
        <div className="w-full md:hidden flex flex-col gap-4">
          {/* Container do Carrossel AGORA COM MOTION.DIV E LAYOUTSCROLL */}
          <motion.div
            ref={carouselRef}
            layoutScroll
            className="flex overflow-x-auto snap-x snap-mandatory sm:pb-14 px-6 pb-8 gap-4 w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {images.map((item) => (
              <MobileParallaxCard
                key={item.id}
                item={item}
                carouselRef={carouselRef}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// Sub-componente isolado para garantir que a matemática não vaze as bordas
function MobileParallaxCard({
  item,
  carouselRef,
}: {
  item: any;
  carouselRef: React.RefObject<HTMLDivElement>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Lê a rolagem do container pai (forçando o eixo X para evitar bugs em iOS)
  const { scrollXProgress } = useScroll({
    container: carouselRef,
    target: cardRef,
    axis: "x",
    offset: ["start end", "end start"],
  });

  // Diminuí levemente o alcance do parallax para garantir segurança total nas bordas
  const x = useTransform(scrollXProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={cardRef}
      className="snap-center shrink-0 w-[85vw] h-[60vh] sm:w-[60vw] rounded-2xl overflow-hidden relative shadow-2xl flex justify-center items-center bg-black"
    >
      {isMounted ? (
        <motion.img
          src={item.src}
          alt={item.alt}
          style={{ x }}
          // A MÁGICA: w-[150%] deixa a imagem bem larga. -left-[25%] puxa ela para a esquerda,
          // centralizando perfeitamente a "sobra" nos dois cantos para o parallax empurrar sem vazar.
          className="absolute top-0 -left-[25%] w-[150%] h-full object-cover max-w-none"
        />
      ) : (
        <img
          src={item.src}
          alt={item.alt}
          className="absolute top-0 -left-[25%] w-[150%] h-full object-cover max-w-none"
        />
      )}
    </div>
  );
}
