"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

// Imports das imagens
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
import image11 from "@/../../public/model_1.jpeg";
import image12 from "@/../../public/model_2.jpeg";
import image13 from "@/../../public/model_3.jpeg";
import image14 from "@/../../public/model_4.jpeg";

const baseImages = [
  {
    id: 1,
    src: image1.src,
    title: "Set Cenográfico",
    desc: "Criação de atmosferas reais e formas geométricas",
  },
  {
    id: 10,
    src: image11.src,
    title: "Editorial Terracota",
    desc: "Moda, arquitetura e identidade marcante",
  },
  {
    id: 11,
    src: image12.src,
    title: "Brisa de Verão",
    desc: "Movimento fluido e estética cinematográfica",
  },
  {
    id: 13,
    src: image14.src,
    title: "Minimalismo Editorial",
    desc: "Pureza das formas e elegância atemporal",
  },
  {
    id: 12,
    src: image13.src,
    title: "Luz Dourada",
    desc: "Alta costura, sofisticação e brilho único",
  },
  {
    id: 2,
    src: image2.src,
    title: "Identidade Luz e Cena",
    desc: "Nossa fachada e o início de grandes ideias",
  },
  {
    id: 3,
    src: image3.src,
    title: "Equipamento no Set",
    desc: "Bastidores e captação técnica",
  },

  {
    id: 4,
    src: image7.src,
    title: "Pavilhão Técnico",
    desc: "Estrutura completa com camarim e fundos infinitos",
  },
  {
    id: 5,
    src: image10.src,
    title: "Geometria Pop",
    desc: "Direção de arte conceitual e foco no design",
  },
  {
    id: 6,
    src: image6.src,
    title: "O Portal Orgânico",
    desc: "Cenário vivo integrado com luz de recorte natural",
  },

  {
    id: 9,
    src: image4.src,
    title: "Estética Minimalista",
    desc: "Foco nos detalhes cruciais",
  },
];

// Triplicamos o array para criar a ilusão de esteira infinita perfeita para os dois lados
const infiniteImages = [...baseImages, ...baseImages, ...baseImages];

export function Gallery() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Estados de controle do arrasto manual
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);

  // Valores de movimento controlados pelo Framer Motion (com mola para suavizar)
  const xPos = useMotionValue(0);
  const smoothedX = useSpring(xPos, { damping: 30, stiffness: 200, mass: 0.5 });

  // Largura de um bloco completo de imagens para sabermos quando resetar a esteira
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    const calculateWidth = () => {
      if (trackRef.current) {
        // Pega a largura total real e divide por 3 (já que triplicamos o array)
        const totalWidth = trackRef.current.scrollWidth;
        const singleSetWidth = totalWidth / 3;
        setContentWidth(singleSetWidth);

        // Inicializa o carrossel centralizado no segundo bloco de imagens
        xPos.set(-singleSetWidth);
        currentX.current = -singleSetWidth;
      }
    };

    // Pequeno timeout para garantir que as imagens já renderizaram na DOM antes do cálculo
    const timer = setTimeout(calculateWidth, 100);

    window.addEventListener("resize", calculateWidth);
    return () => {
      window.removeEventListener("resize", calculateWidth);
      clearTimeout(timer);
    };
  }, [xPos]);

  // Loop de renderização contínuo para checar as bordas e fazer o reset invisível
  useAnimationFrame(() => {
    if (contentWidth === 0) return;

    let currentPosition = xPos.get();

    // Se arrastou muito para a esquerda (fim do segundo bloco), joga de volta pro início
    if (currentPosition <= -contentWidth * 2) {
      const overflow = currentPosition + contentWidth * 2;
      currentPosition = -contentWidth + overflow;
      xPos.set(currentPosition);
      currentX.current = currentPosition;
    }

    // Se arrastou muito para a direita (início do segundo bloco), joga pro final
    if (currentPosition >= 0) {
      const overflow = currentPosition;
      currentPosition = -contentWidth + overflow;
      xPos.set(currentPosition);
      currentX.current = currentPosition;
    }
  });

  // Captura o início do clique/toque
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startX.current = e.clientX - currentX.current;

    // Altera o cursor global do site dinamicamente se você usar um cursor customizado
    document.body.style.cursor = "grabbing";
  };

  // Captura a movimentação do mouse/dedo
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const newX = e.clientX - startX.current;
    xPos.set(newX);
    currentX.current = newX;
  };

  // Captura o fim do clique/toque
  const handlePointerUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "default";
  };

  return (
    <section
      id="gallery"
      className="bg-section py-20 md:py-28 overflow-hidden relative select-none"
    >
      <div className="container mx-auto px-4 shrink-0">
        <SectionHeader
          eyebrow="Nosso Portfólio"
          title="Fazer da Luz uma Obra de Arte"
          description="Arraste livremente para os lados e explore nossa galeria infinita de momentos marcantes."
        />
      </div>

      {/* Janela de Visualização (Viewport) */}
      <div
        className="w-full mt-12 md:mt-20 overflow-hidden cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* A Esteira rolante das fotos */}
        <motion.div
          ref={trackRef}
          style={{ x: smoothedX }}
          className="flex gap-6 px-4 shrink-0 flex-nowrap pointer-events-none"
        >
          {infiniteImages.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="relative w-[80vw] sm:w-[50vw] md:w-[450px] h-[50vh] md:h-[55vh] rounded-3xl overflow-hidden group shrink-0 border border-white/10 shadow-2xl bg-black"
            >
              <img
                src={item.src}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.8] group-hover:brightness-100"
                draggable={false}
              />

              {/* Sombreamento da foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-300"></div>

              {/* Textos dos cards */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-[#2ECC71] text-xs font-bold uppercase tracking-wider mb-1">
                  {item.desc}
                </p>
                <h4 className="font-serif text-xl md:text-2xl text-white font-bold leading-tight">
                  {item.title}
                </h4>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
