"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import index from "@/../../public/bg_index.png";

interface Hotspot {
  id: number;
  title: string;
  description: string;
  top: string;
  left: string;
  icon: string;
  // NOVOS CONTROLES DE POSIÇÃO DO TOOLTIP
  tooltipAlign?: "left" | "center" | "right";
  tooltipPosition?: "top" | "bottom";
}

const hotspots: Hotspot[] = [
  {
    id: 1,
    title: "Fundo Infinito de Alvenaria",
    description:
      "Um espaço generoso de 6x4m perfeito para retratos de moda, ensaios comerciais e produções de vídeo.",
    top: "35%",
    left: "22%",
    icon: "🎬",
    tooltipAlign: "left", // Muito à esquerda? Abre para a direita (alinhado à esquerda do pin)
    tooltipPosition: "bottom",
  },
  {
    id: 2,
    title: "Iluminação Profissional ARRI & Aputure",
    description:
      "Iluminadores e modificadores de ponta que garantem controle total sobre a atmosfera da cena.",
    top: "18%",
    left: "55%",
    icon: "💡",
    tooltipAlign: "center", // No meio? Abre centralizado
    tooltipPosition: "bottom",
  },
  {
    id: 3,
    title: "Câmeras e Lentes Cinematográficas",
    description:
      "Sistemas Sony e RED prontos para captação com alcance dinâmico de altíssima fidelidade.",
    top: "55%",
    left: "70%",
    icon: "🎥",
    tooltipAlign: "right", // Muito à direita? Abre para a esquerda (alinhado à direita do pin)
    tooltipPosition: "bottom",
  },
  {
    id: 4,
    title: "Área de Convivência & Camarim",
    description:
      "Espaço projetado para o bem-estar e conforto do cliente, equipado com maquiagem profissional.",
    top: "75%",
    left: "40%",
    icon: "☕",
    tooltipAlign: "center",
    tooltipPosition: "top", // Muito embaixo? Abre para cima para não cortar a base
  },
];

export const StudioTourSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  const rotateXMouse = useMotionValue(0);
  const rotateYMouse = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const rotateXSpring = useSpring(rotateXMouse, springConfig);
  const rotateYSpring = useSpring(rotateYMouse, springConfig);

  const rotateX = useTransform(rotateXSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(rotateYSpring, [-0.5, 0.5], [-10, 10]);

  const bgTranslateX = useTransform(rotateYSpring, [-0.5, 0.5], [-20, 20]);
  const bgTranslateY = useTransform(rotateXSpring, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateXMouse.set(y);
    rotateYMouse.set(x);
  };

  const handleMouseLeave = () => {
    rotateXMouse.set(0);
    rotateYMouse.set(0);
  };

  return (
    <section
      id="studio-tour"
      className="py-20 md:py-28 bg-[#0646C9]/30 relative overflow-hidden"
      style={{
        backgroundImage: `url(${index.src})`,
        backgroundSize: "700px",
      }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Nosso Espaço Físico"
          title="Tour Virtual do Estúdio"
          description="Explore a nossa infraestrutura equipada com tecnologia cinematográfica de ponta para elevar o patamar das suas produções."
        />

        <div className="mt-12 md:mt-20 flex justify-center items-center perspective-1000 w-full h-[300px] sm:h-[450px] md:h-[600px] z-10">
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            // REMOVIDO: overflow-hidden daqui para permitir que os tooltips "pulem" para fora
            className="relative w-full max-w-5xl h-full rounded-3xl shadow-2xl bg-black cursor-none"
            data-cursor="hovered"
          >
            {/* O MÁSCARA DA IMAGEM: O overflow-hidden agora vive só aqui para segurar o parallax */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none border border-white/10">
              <motion.div
                style={{ x: bgTranslateX, y: bgTranslateY, scale: 1.15 }}
                className="absolute inset-0 w-full h-full"
              >
                <img
                  src="/estudio_9.jpg"
                  alt="Espaço Interno do Estúdio"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30"></div>
              </motion.div>
            </div>

            {/* Overlay Escuro quando tem hotspot aberto */}
            <AnimatePresence>
              {activeHotspot && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setActiveHotspot(null)}
                  className="absolute inset-0 bg-black z-10 pointer-events-auto rounded-3xl"
                />
              )}
            </AnimatePresence>

            {/* Pins e Tooltips (Agora eles podem flutuar livremente) */}
            {hotspots.map((spot) => (
              <div
                key={spot.id}
                style={{
                  top: spot.top,
                  left: spot.left,
                  transform: "translate3d(-50%, -50%, 50px)", // Projeta o PIN um pouco pra fora
                }}
                className="absolute z-20"
              >
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  onClick={() =>
                    setActiveHotspot(
                      activeHotspot?.id === spot.id ? null : spot,
                    )
                  }
                  className="relative flex items-center justify-center size-10 md:size-12 rounded-full bg-white text-black shadow-lg focus:outline-none"
                >
                  <span className="absolute inset-0 rounded-full bg-[#2ECC71]/40 animate-ping-large pointer-events-none"></span>
                  <span className="text-lg md:text-xl font-bold">
                    {spot.icon}
                  </span>
                </motion.button>

                {/* Tooltip Dinâmico */}
                <AnimatePresence>
                  {activeHotspot?.id === spot.id && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        y: spot.tooltipPosition === "top" ? 10 : -10,
                      }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        y: spot.tooltipPosition === "top" ? 10 : -10,
                      }}
                      transition={{ type: "spring", damping: 15 }}
                      style={{
                        transform: "translateZ(80px)", // Projeta o Tooltip AINDA MAIS pra fora que o PIN
                      }}
                      className={`absolute w-[260px] md:w-[320px] p-5 rounded-2xl bg-black/95 backdrop-blur-md border border-white/20 text-left shadow-2xl z-30
                        ${
                          // LÓGICA DE ALINHAMENTO HORIZONTAL
                          spot.tooltipAlign === "left"
                            ? "left-0"
                            : spot.tooltipAlign === "right"
                              ? "right-0"
                              : "left-1/2 -translate-x-1/2" // center
                        }
                        ${
                          // LÓGICA DE ALINHAMENTO VERTICAL
                          spot.tooltipPosition === "top"
                            ? "bottom-full mb-4"
                            : "top-full mt-4"
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-serif text-lg text-emerald-400 font-bold leading-tight">
                          {spot.title}
                        </h4>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveHotspot(null);
                          }}
                          className="text-white/40 hover:text-white text-sm ml-3"
                        >
                          ✕
                        </button>
                      </div>
                      <p className="text-white/80 text-xs md:text-sm leading-relaxed">
                        {spot.description}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
