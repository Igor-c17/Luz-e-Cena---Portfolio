"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";

// Importações das imagens de portfólio (usando os mesmos assets reais existentes na pasta public)
import img1 from "@/../../public/estudio_7.png"; // Editorial
import img2 from "@/../../public/estudio_2.jpg"; // Retrato Corporativo
import img3 from "@/../../public/estudio_9.jpg"; // Fine Art
import img4 from "@/../../public/estudio_10.png"; // Gestante
import img5 from "@/../../public/estudio_4.jpg"; // Fine Art
import img6 from "@/../../public/estudio_6.jpg"; // Fine Art
import img7 from "@/../../public/estudio_8.png"; // Gestante
import img8 from "@/../../public/estudio_5.jpg"; // Fine Art
import img9 from "@/../../public/estudio_1.jpg"; // Fachada/Retrato

interface PortfolioPhoto {
  id: number;
  src: string;
  title: string;
  category: string;
}

const column1Photos: PortfolioPhoto[] = [
  { id: 1, src: img1.src, title: "Narrativa Editorial", category: "Moda" },
  { id: 2, src: img2.src, title: "Essência Corporativa", category: "Retrato" },
  { id: 3, src: img3.src, title: "Luz e Expressão", category: "Fine Art" },
];

const column2Photos: PortfolioPhoto[] = [
  { id: 4, src: img4.src, title: "Sensibilidade Materna", category: "Gestante" },
  { id: 5, src: img5.src, title: "Geometria e Sombras", category: "Conceitual" },
  { id: 6, src: img6.src, title: "Textura do Olhar", category: "Fine Art" },
];

const column3Photos: PortfolioPhoto[] = [
  { id: 7, src: img7.src, title: "Amor em Foco", category: "Gestante" },
  { id: 8, src: img8.src, title: "Minimalismo Estético", category: "Editorial" },
  { id: 9, src: img9.src, title: "Composição de Luz", category: "Cenografia" },
];

export function PortfolioParallaxSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Capturar o progresso do scroll vertical da seção inteira
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Mapear o progresso do scroll para deslocamentos y distintos para criar o parallax
  // Coluna 1: Deslocamento sutil (sobe um pouco)
  const yColumn1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  // Coluna 2: Deslocamento oposto ou mais estático (desce um pouco para contrastar)
  const yColumn2 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  // Coluna 3: Deslocamento agressivo (sobe bastante, sensação de primeiro plano)
  const yColumn3 = useTransform(scrollYProgress, [0, 1], [-50, -200]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-section relative overflow-hidden min-h-screen flex flex-col justify-center"
      id="portfolio"
    >
      {/* Luz decorativa suave */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3f7efd]/5 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="container px-4 mx-auto w-full">
        <SectionHeader
          eyebrow="Portfólio Cinematográfico"
          title="Histórias Contadas em Frames"
          description="Nossa galeria de obras selecionadas. Cada imagem é um estudo de luz, sombra e narrativa, criada com técnica precisa e alma criativa."
        />

        {/* 💻 Grid de Colunas Parallax (Desktop) */}
        <div className="hidden md:grid grid-cols-3 gap-8 mt-20 h-[1000px] overflow-hidden rounded-3xl relative px-4">
          
          {/* Coluna 1 */}
          <motion.div style={{ y: yColumn1 }} className="flex flex-col gap-8">
            {column1Photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </motion.div>

          {/* Coluna 2 */}
          <motion.div style={{ y: yColumn2 }} className="flex flex-col gap-8 pt-20">
            {column2Photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </motion.div>

          {/* Coluna 3 */}
          <motion.div style={{ y: yColumn3 }} className="flex flex-col gap-8">
            {column3Photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} />
            ))}
          </motion.div>

        </div>

        {/* 📱 Layout Responsivo Simples para Telas Pequenas (Mobile) */}
        <div className="md:hidden flex flex-col gap-6 mt-12 px-2">
          {[...column1Photos, ...column2Photos, ...column3Photos].slice(0, 5).map((photo) => (
            <div key={photo.id} className="relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl group">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-6">
                <span className="text-xs uppercase tracking-wider text-[#3f7efd] mb-1 font-semibold">
                  {photo.category}
                </span>
                <h4 className="font-serif text-lg text-white">
                  {photo.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Sub-componente para os cards de foto com efeitos de hover premium
function PhotoCard({ photo }: { photo: PortfolioPhoto }) {
  return (
    <div className="relative rounded-3xl overflow-hidden aspect-[3/4] shadow-2xl group cursor-pointer bg-black/40 border border-white/5 hover:border-[#3f7efd]/30 transition-all duration-500">
      {/* Imagem de Fundo com zoom suave ao passar o mouse */}
      <img
        src={photo.src}
        alt={photo.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />

      {/* Overlay Escuro Gradual que clareia ou escurece */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300 flex flex-col justify-end p-8" />

      {/* Conteúdo Informativo */}
      <div className="absolute bottom-0 left-0 w-full p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-xs uppercase tracking-widest text-[#3f7efd] font-semibold mb-2 block">
          {photo.category}
        </span>
        <h4 className="font-serif text-xl text-white mb-1 group-hover:text-white transition-colors duration-300">
          {photo.title}
        </h4>
        <p className="text-xs text-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          Clique para ver a produção completa →
        </p>
      </div>
    </div>
  );
}
