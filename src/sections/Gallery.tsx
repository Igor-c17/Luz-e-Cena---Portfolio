"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import index from "@/../../public/bg_index.png";

// Importações de fotos locais
import image1 from "@/../../public/estudio_1.jpg";
import image4 from "@/../../public/estudio_4.jpg";
import image2 from "@/../../public/estudio_2.jpg";
import image6 from "@/../../public/estudio_6.jpg";
import image7 from "@/../../public/estudio_7.png";
import image10 from "@/../../public/estudio_10.png";
import image8 from "@/../../public/estudio_cam.png";
import model1 from "@/../../public/model_1.jpeg";
import model2 from "@/../../public/model_2.jpeg";
import model3 from "@/../../public/model_3.jpeg";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
}

const environmentImages: GalleryImage[] = [
  {
    id: 0,
    src: image2.src,
    alt: "Espaço Clareira - Vista Geral",
  },
  {
    id: 1,
    src: image1.src,
    alt: "Espaço Clareira - Set de Produção",
  },
  {
    id: 2,
    src: image4.src,
    alt: "Espaço Clareira - Detalhe de Iluminação",
  },
  {
    id: 3,
    src: image6.src,
    alt: "Espaço Clareira - Detalhe de Iluminação",
  },
  {
    id: 4,
    src: model1.src,
    alt: "Espaço Clareira - Detalhe de Iluminação",
  },
  {
    id: 5,
    src: model2.src,
    alt: "Espaço Clareira - Detalhe de Iluminação",
  },
  {
    id: 6,
    src: model3.src,
    alt: "Espaço Clareira - Detalhe de Iluminação",
  },
  {
    id: 7,
    src: image7.src,
    alt: "Espaço Clareira - Detalhe de Iluminação",
  },
  {
    id: 8,
    src: image10.src,
    alt: "Espaço Clareira - Detalhe de Iluminação",
  },
  {
    id: 9,
    src: image8.src,
    alt: "Espaço Clareira - Detalhe de Iluminação",
  },
];

const tags = [
  "Editoriais de Moda",
  "Ensaios Fotográficos",
  "Lifestyle",
  "Videoclipes",
  "Produção de Conteúdo",
];

const tagsModelMinimal = [
  "Campanhas Editoriais",
  "Fotografia Conceitual",
  "Lookbooks de Luxo",
  "Direção de Arte",
  "Minimalismo Visual",
];

export function Gallery() {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  // Funções de navegação do Lightbox
  const handlePrev = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev !== null
        ? prev === 0
          ? environmentImages.length - 1
          : prev - 1
        : null,
    );
  }, []);

  const handleNext = useCallback(() => {
    setActiveImageIndex((prev) =>
      prev !== null
        ? prev === environmentImages.length - 1
          ? 0
          : prev + 1
        : null,
    );
  }, []);

  const handleClose = useCallback(() => {
    setActiveImageIndex(null);
  }, []);

  // Atalhos de teclado (Acessibilidade)
  useEffect(() => {
    if (activeImageIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeImageIndex, handlePrev, handleNext, handleClose]);

  return (
    <section
      id="gallery"
      className="bg-[#EAEFF8] py-20 md:py-28 overflow-hidden relative select-none"
      style={{
        backgroundImage: `url(${index.src})`,
        backgroundSize: "700px",
      }}
    >
      <div className="container mx-auto px-4">
        {/* Cabeçalho da Seção */}
        <div className="mb-16 ">
          <div className="flex justify-center">
            <p className="uppercase font-semibold tracking-widest bg-gradient-to-r from-[#7CA3F6] to-[#0646C9] text-transparent bg-clip-text text-center">
              Nossos Ambientes
            </p>
          </div>
          <h2 className="font-serif text-3xl text-center mt-6 text-[#0646C9]">
            Cada ambiente, uma possibilidade
          </h2>
          <p className="  text-xl text-center text-[#0646C9]/60 md:text-lg lg:text-xl mt-4 max-w-md mx-auto">
            Nossos cenários foram projetados para oferecer versatilidade
            estética e flexibilidade de luz a cada tomada.
          </p>
        </div>

        {/* Layout Grid Lado a Lado (Desktop) / Empilhado (Mobile) */}
        <div
          className="mt-12 md:mt-20 p-6 md:p-10 lg:p-12 bg-gray-800  rounded-[2rem] shadow-2xl border border-white/10"
          style={{
            backgroundImage: `url(${index.src})`,
            backgroundSize: "700px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LADO ESQUERDO: Bloco composto retangular de imagens */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Imagem Principal Maior em Destaque */}
              <div className="md:col-span-2">
                <div
                  onClick={() => setActiveImageIndex(0)}
                  className="relative h-[250px] md:h-[400px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[0].src}
                    alt={environmentImages[0].alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Imagens Menores Empilhadas Verticalmente ao Lado */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <div
                  onClick={() => setActiveImageIndex(1)}
                  className="relative h-[117px] md:h-[192px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[1].src}
                    alt={environmentImages[1].alt}
                    className="absolute inset-0 w-full h-full  object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>

                <div
                  onClick={() => setActiveImageIndex(3)}
                  className="relative h-[117px] md:h-[192px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[3].src}
                    alt={environmentImages[3].alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* LADO DIREITO: Informações do Ambiente e Tags */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full text-white">
              {/* Substituí o verde por um tom claro para melhor contraste no fundo azul */}
              <span className="text-xs font-black tracking-widest text-sky-200 uppercase mb-2 block">
                Luz e Cenografia
              </span>

              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#FFFDF9] mb-4 drop-shadow-sm">
                Espaço Luz Solar
              </h3>

              <p className="text-[#D2E4FF] text-sm md:text-base leading-relaxed mb-8 font-medium">
                Projetado para cineastas e fotógrafos que não abrem mão da
                perfeição da luz do dia. Com múltiplos cantos cenográficos — que
                vão do aconchego das espreguiçadeiras sob o ombrelone ao
                contraste vibrante do nosso mural cultural —, este ambiente
                oferece versatilidade absoluta para criar narrativas visuais
                ricas em textura, cor e profundidade.
              </p>

              {/* Pills/Tags de Categorias adaptadas para o fundo azul */}
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white hover:bg-white hover:text-[#0646C9] text-white transition-all duration-300 text-xs md:text-sm px-4 py-2 rounded-full font-semibold select-none cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-12 md:mt-20 p-6 md:p-10 lg:p-12 bg-gray-800  rounded-[2rem] shadow-2xl border border-white/10"
          style={{
            backgroundImage: `url(${index.src})`,
            backgroundSize: "700px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LADO ESQUERDO: Bloco composto retangular de imagens */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Imagem Principal Maior em Destaque */}
              <div className="md:col-span-2">
                <div
                  onClick={() => setActiveImageIndex(0)}
                  className="relative h-[250px] md:h-[400px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[4].src}
                    alt={environmentImages[4].alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Imagens Menores Empilhadas Verticalmente ao Lado */}
              <div className="grid grid-cols-2 md:grid-cols-1 gap-4">
                <div
                  onClick={() => setActiveImageIndex(1)}
                  className="relative h-[117px] md:h-[192px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[5].src}
                    alt={environmentImages[5].alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>

                <div
                  onClick={() => setActiveImageIndex(2)}
                  className="relative h-[117px] md:h-[192px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[6].src}
                    alt={environmentImages[6].alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* LADO DIREITO: Informações do Ambiente e Tags */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full text-white">
              {/* Substituí o verde por um tom claro para melhor contraste no fundo azul */}
              <span className="text-xs font-black tracking-widest text-sky-200 uppercase mb-2">
                Estúdio Externo
              </span>

              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Retrato & Expressão
              </h3>

              {/* Texto levemente mais opaco (white/80) para leitura suave */}
              <p className="text-[#D2E4FF] text-sm md:text-base leading-relaxed mb-8 font-medium">
                O cenário ideal para capturar a essência e a identidade de cada
                projeto. Com um setup de iluminação cirúrgico e fundo neutro
                focado no minimalismo, este espaço foi desenhado para fotografia
                de moda, retratos corporativos de alto padrão e ensaios
                *beauty*. Aqui, o controle total da luz e sombra revela texturas
                sutis e cria uma atmosfera intimista que coloca o seu talento em
                destaque absoluto.
              </p>

              {/* Pills/Tags de Categorias adaptadas para o fundo azul */}
              <div className="flex flex-wrap gap-2.5">
                {tagsModelMinimal.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white hover:bg-white hover:text-[#0646C9] text-white transition-all duration-300 text-xs md:text-sm px-4 py-2 rounded-full font-semibold select-none cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div
          className="mt-12 md:mt-20 p-6 md:p-10 lg:p-12 bg-gray-800  rounded-[2rem] shadow-2xl border border-white/10"
          style={{
            backgroundImage: `url(${index.src})`,
            backgroundSize: "700px",
          }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* LADO ESQUERDO: Bloco composto retangular de imagens */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Imagem Principal Maior em Destaque */}
              <div className="md:col-span-2">
                <div
                  onClick={() => setActiveImageIndex(0)}
                  className="relative h-[250px] md:h-[400px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[7].src}
                    alt={environmentImages[7].alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Imagens Menores Empilhadas Verticalmente ao Lado */}
              <div className="md:col-span-1 flex flex-col gap-4">
                <div
                  onClick={() => setActiveImageIndex(1)}
                  className="relative h-[117px] md:h-[192px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[8].src}
                    alt={environmentImages[8].alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>

                <div
                  onClick={() => setActiveImageIndex(2)}
                  className="relative h-[117px] md:h-[192px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-lg group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  data-cursor="view"
                >
                  <img
                    src={environmentImages[9].src}
                    alt={environmentImages[9].alt}
                    className="absolute inset-0 w-full h-full object-cover brightness-[0.8] group-hover:brightness-100 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* LADO DIREITO: Informações do Ambiente e Tags */}
            <div className="lg:col-span-5 flex flex-col justify-center h-full text-white">
              {/* Substituí o verde por um tom claro para melhor contraste no fundo azul */}
              <span className="text-xs font-black tracking-widest text-sky-200 uppercase mb-2">
                Infraestrutura & Set
              </span>

              <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Tecnologia & Suporte
              </h3>

              {/* Texto levemente mais opaco (white/80) para leitura suave */}
              <p className="text-[#D2E4FF] text-sm md:text-base leading-relaxed mb-8">
                Onde grandes ideias ganham formato profissional. Nossa estrutura
                interna oferece um ecossistema técnico completo, equipado com
                sistemas de câmera, estabilizadores, grids de iluminação
                inteligente e monitoramento em tempo real. Um ambiente projetado
                para dar suporte total à sua equipe, garantindo a precisão
                técnica e a liberdade criativa que as produções de grande porte
                exigem.
              </p>

              {/* Pills/Tags de Categorias adaptadas para o fundo azul */}
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-white hover:bg-white hover:text-[#0646C9] text-white transition-all duration-300 text-xs md:text-sm px-4 py-2 rounded-full font-semibold select-none cursor-default"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL / LIGHTBOX INTERATIVO */}
      <AnimatePresence>
        {activeImageIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-full h-full bg-black/90 backdrop-blur-sm z-[99999] flex items-center justify-center cursor-default select-none"
            onClick={handleClose}
          >
            {/* Botão Fechar (X) */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 size-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#0646C9] hover:bg-[#0646C9]/20 text-white text-xl transition-all duration-300 z-50 focus:outline-none"
              title="Fechar (Esc)"
            >
              ✕
            </button>

            {/* Seta Direcional Esquerda (<) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-4 md:left-8 size-12 md:size-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#0646C9] hover:bg-[#0646C9]/20 text-white transition-all duration-300 z-50 focus:outline-none"
              title="Anterior (←)"
            >
              ◀
            </button>

            {/* Imagem Centralizada */}
            <div
              className="relative w-[90vw] h-[75vh] md:h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  src={environmentImages[activeImageIndex].src}
                  alt={environmentImages[activeImageIndex].alt}
                  className="max-w-full max-h-full object-contain rounded-xl shadow-2xl border border-white/5"
                />
              </AnimatePresence>
            </div>

            {/* Seta Direcional Direita (>) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 md:right-8 size-12 md:size-14 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-[#0646C9] hover:bg-[#0646C9]/20 text-white transition-all duration-300 z-50 focus:outline-none"
              title="Próxima (→)"
            >
              ▶
            </button>

            {/* Indicador de Paginação */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-xs md:text-sm text-white/60 font-semibold">
              {activeImageIndex + 1} / {environmentImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
