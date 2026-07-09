"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SectionHeader } from "@/components/SectionHeader";

// Registrar o plugin ScrollTrigger do GSAP
gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: number;
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  features: string[];
}

const servicesList: ServiceItem[] = [
  {
    id: 1,
    title: "Ensaios Fotográficos Autorais",
    category: "Fotografia",
    description:
      "Sessões fotográficas exclusivas com foco em luz natural, expressões genuínas e conexão profunda. Capturando a verdade por trás de cada retrato e editorial de moda.",
    accentColor: "from-[#2ECC71] to-[#1abc9c]",
    features: [
      "Retratos Corporativos Premium",
      "Ensaios Femininos & Masculinos",
      "Editoriais de Moda Artísticos",
      "Fotografia Fine Art",
    ],
    icon: (
      <svg
        className="size-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Cinematografia & Gravação",
    category: "Audiovisual",
    description:
      "Direção e produção de vídeo cinematográfico para marcas e pessoas. Movimentos de câmera fluidos, direção sensível e técnicas avançadas para narrativas imersivas.",
    accentColor: "from-[#3f7efd] to-[#0850e0]",
    features: [
      "Fashion Films & Brand Videos",
      "Showreels Cinematográficos",
      "Documentários Curtos",
      "Cobertura Audiovisual Premium",
    ],
    icon: (
      <svg
        className="size-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.75 8.25h4.5M9.75 12h4.5M9.75 15.75h4.5"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Edição Narrativa & Color Grading",
    category: "Pós-Produção",
    description:
      "Onde o ritmo e a emoção se fundem. Tratamento de cor estético premium, efeitos sonoros imersivos (Sound Design) e montagem narrativa focada em retenção e sensações.",
    accentColor: "from-purple-500 to-indigo-600",
    features: [
      "Color Grading Cinematográfico",
      "Sound Design Profissional",
      "Edição Dinâmica e Ritmo",
      "Tratamento Estético de Imagem",
    ],
    icon: (
      <svg
        className="size-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Direção de Cena & Cenografia",
    category: "Direção de Arte",
    description:
      "Criação de universos visuais sob medida. Desenvolvemos desde o conceito estético, curadoria de paleta de cores, posicionamento cênico e ambientação física do estúdio.",
    accentColor: "from-amber-500 to-orange-600",
    features: [
      "Curadoria de Direção de Arte",
      "Concepção de Cenários",
      "Orientação Corporal Artística",
      "Styling & Composição Visual",
    ],
    icon: (
      <svg
        className="size-8"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.813 15.904 9 21m0 0-.813-5.096M9 21h3.75m-11.25-3h15a2.25 2.25 0 0 0 2.25-2.25V6.107c0-1.08-.718-2.023-1.778-2.235A48.114 48.114 0 0 0 12 3.25c-2.048 0-4.043.128-6 .377C4.938 3.84 4.22 4.783 4.22 5.862V15.75c0 1.242 1.008 2.25 2.25 2.25Z"
        />
      </svg>
    ),
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (cardsRef.current.length === 0) return;

      // Animação de Staggered Fade-up utilizando ScrollTrigger
      gsap.fromTo(
        cardsRef.current,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Começa a animar quando o topo da seção atinge 80% da viewport
            end: "bottom 20%",
            toggleActions: "play none none none", // Apenas executa na entrada
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      className="py-24 bg-section relative overflow-hidden"
      id="servicos"
      ref={containerRef}
    >
      {/* Luzes decorativas de fundo */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#3f7efd]/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container px-4 mx-auto">
        <SectionHeader
          eyebrow="Especialidades"
          title="Nossas Soluções Criativas"
          description="Unimos técnica refinada, sensibilidade artística e equipamentos de ponta para traduzir a sua visão em narrativas marcantes e de alto impacto visual."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 lg:mt-24">
          {servicesList.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="group relative bg-gray-900/50 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:border-[#3f7efd]/50 hover:bg-gray-900/70 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              {/* Efeito Glow no Card */}
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.accentColor} opacity-5 group-hover:opacity-20 blur-2xl transition-opacity duration-500 pointer-events-none`}
              />

              <div>
                {/* Cabeçalho do Card */}
                <div className="flex justify-between items-start mb-6">
                  <div
                    className={`inline-flex items-center justify-center size-14 rounded-2xl bg-gradient-to-br ${service.accentColor} text-white shadow-lg`}
                  >
                    {service.icon}
                  </div>
                  <span className="text-xs uppercase tracking-wider text-white/50 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                    {service.category}
                  </span>
                </div>

                {/* Conteúdo */}
                <h3 className="font-serif text-2xl text-white mb-4 group-hover:text-[#3f7efd] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Tópicos com Checkmarks */}
              <div className="border-t border-white/5 pt-6 mt-auto">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2 text-xs md:text-sm text-white/60"
                    >
                      <svg
                        className="size-4 text-[#2ECC71] flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
