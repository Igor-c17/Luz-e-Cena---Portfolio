"use client";

import Image from "next/image";
import grainImage from "@/assets/images/grain.jpg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import { SectionHeader } from "@/components/SectionHeader";
import index from "@/../../public/bg_index.png";
import { Card } from "@/components/Card";
import fachada from "@/../../public/Estúdio Luz e Cena Fachada.png";

const portfolioProjects = [
  {
    company: "Flexibilidade e conforto para clientes!",
    title: "Um Espaço Onde Sua Marca Pode Existir Com Liberdade",
    results: [
      { title: "Cenários Personalizados e Espaço Funcional" },
      {
        title:
          "Iluminação de Qualidade, Fundo Infinito e Recursos Profissionais",
      },
      { title: "Exclusividade Estética e Sensação de Pertencimento" },
      { title: "Acolhimento, Escuta e Liberdade Para Criar No Seu Tempo" },
      { title: "Personalização De Ambientes e Elementos Visuais" },
    ],
    link: "https://youtu.be/4k7IdSLxh6w",
    image: fachada,
  },
];

export const ProjectsSection = () => {
  return (
    <section
      className="pb-16 sm:py-20 md:py-20 lg:py-24 bg-section overflow-hidden"
      id="studio"
      style={{
        backgroundImage: `url(${index.src})`,
        backgroundSize: "700px",
      }}
    >
      <div className="container mx-auto px-4">
        <SectionHeader
          eyebrow="Resultados reais"
          title="Por Que Escolher a Luz e Cena?"
          description="Unimos criatividade, tecnologia e experiência para transformar ideias em experiências únicas, com qualidade, inovação e atenção a cada detalhe."
        />

        <div className="flex flex-col md:mt-20 mt-10 gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-6 py-8 md:p-12 lg:p-16 sticky overflow-hidden border border-white/10"
              style={{
                top: `calc(64px + ${projectIndex * 40}px)`,
              }}
            >
              {/* Textura de Granulado sutil */}
              <div
                className="absolute inset-0 -z-10 opacity-5 pointer-events-none"
                style={{
                  backgroundImage: `url(${grainImage.src})`,
                }}
              ></div>

              <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
                <div className="lg:pb-8">
                  <div className="bg-gradient-to-r from-[#2ECC71] to-[#3f7efd] inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                  </div>
                  <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl leading-tight">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-6">
                    {project.results.map((result) => (
                      <li
                        key={result.title}
                        className="flex gap-3 text-sm md:text-base text-white/70"
                      >
                        <CheckCircleIcon className="size-5 md:size-6 text-[#2ECC71] shrink-0" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Container da Imagem Limpa */}
                <div className="relative mt-8 lg:mt-0 w-full h-[250px] sm:h-[350px] lg:h-[420px] rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
