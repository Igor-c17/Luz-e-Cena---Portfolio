import passarin from "@/../../public/passarinho.png";
import grainImage from "@/assets/images/grain.jpg";
import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg";
import CheckCircleIcon from "@/assets/icons/check-circle.svg";
import Image from "next/image";
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
      className="pb-16 sm:py-20 md:py-20 lg:py-24 bg-section"
      id="studio"
      style={{
        backgroundImage: `url(${index.src})`,
        backgroundSize: "700px",
      }}
    >
      <div className="container">
        <SectionHeader
          eyebrow="Resultados reais"
          title="Por Que Escolher a Luz e Cena?"
          description=" Unimos criatividade, tecnologia e experiência para transformar ideias em experiências únicas, com qualidade, inovação e atenção a cada detalhe."
        />
        <div className="flex flex-col md:mt-20 mt-10 gap-20">
          {portfolioProjects.map((project, projectIndex) => (
            <Card
              key={project.title}
              className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
              style={{
                top: `calc(64px + ${projectIndex * 40}px)`,
              }}
            >
              <div
                className="absolute inset-0 -z-10 opacity-5"
                style={{
                  backgroundImage: `url(${grainImage.src})`,
                }}
              ></div>
              <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                <div className="lg:pb-16">
                  <div className="bg-gradient-to-r from-[#2ECC71] to-[#3f7efd] inline-flex gap-2 font-bold uppercase tracking-widest text-sm text-transparent bg-clip-text">
                    <span>{project.company}</span>
                  </div>
                  <h3 className="font-serif text-2xl mt-2 md:mt-5 md:text-4xl ">
                    {project.title}
                  </h3>
                  <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                  <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                    {project.results.map((result) => (
                      <li
                        key={result.title}
                        className="flex gap-2 text-sm md:text-base text-white/50"
                      >
                        <CheckCircleIcon className="size-5 md:size-6" />
                        <span>{result.title}</span>
                      </li>
                    ))}
                  </ul>
                  {/*<a href={project.link}>
                    <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8">
                      <span>View Live Site</span>
                      <ArrowUpRightIcon className="size-4" />
                    </button>
                  </a>*/}
                </div>
                <div className="relative">
                  <Image
                    src={passarin}
                    alt={project.title}
                    className="mt-8 -mb-4 absolute left-56 -top-20  pass"
                  />
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
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
