"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  avatarInitials: string;
  avatarBg: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Carolina Mendes",
    role: "Diretora de Estilo",
    company: "Vogue Creative",
    text: "O olhar artístico do Igor e a direção de cena da Dona transformaram completamente nosso editorial de moda. A luz natural combinada com a cenografia impecável gerou um resultado que superou todas as expectativas.",
    avatarInitials: "CM",
    avatarBg: "from-emerald-400 to-teal-500",
  },
  {
    id: 2,
    name: "Rafael Silveira",
    role: "Diretor Executivo",
    company: "Aura Tech",
    text: "Tive uma experiência fantástica no estúdio Luz e Cena. A equipe tem uma sensibilidade humana única que nos deixa totalmente confortáveis em cena. Meus retratos corporativos ganharam um ar premium e autêntico.",
    avatarInitials: "RS",
    avatarBg: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    name: "Mariana Costa",
    role: "Fundadora",
    company: "Aura Slow Fashion",
    text: "Eles conseguiram traduzir a alma da nossa marca em um Fashion Film impecável. A pós-produção, o ritmo da edição e o color grading cinematográfico deram um toque de arte pura ao nosso lançamento.",
    avatarInitials: "MC",
    avatarBg: "from-purple-500 to-pink-500",
  },
  {
    id: 4,
    name: "Beatriz & Thiago",
    role: "Clientes",
    company: "Ensaio Autoral",
    text: "Cada detalhe planejado pela Dona e cada clique preciso do Igor transformaram o nosso ensaio em um momento mágico. O trabalho deles transpira sofisticação e acolhimento em cada quadro.",
    avatarInitials: "BT",
    avatarBg: "from-amber-400 to-orange-500",
  },
  {
    id: 5,
    name: "Gabriel Melo",
    role: "Cineasta & Produtor",
    company: "Indie Films",
    text: "Muito mais do que um estúdio de fotografia, o Luz e Cena oferece uma verdadeira curadoria de arte. A infraestrutura profissional e a liberdade criativa são inspiradoras para qualquer criador.",
    avatarInitials: "GM",
    avatarBg: "from-cyan-400 to-blue-500",
  },
];

export function CustomerTestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-section relative overflow-hidden" id="depoimentos">
      {/* Elementos visuais decorativos de fundo */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#3f7efd]/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#2ECC71]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="container px-4 mx-auto">
        <SectionHeader
          eyebrow="Feedbacks"
          title="O Que Dizem Nossas Cenas"
          description="A verdadeira arte se reflete na experiência de quem confia em nossa lente. Veja os depoimentos de marcas e pessoas que transformaram suas histórias conosco."
        />

        {/* 🎬 Marquee Infinito Horizontal */}
        <div className="mt-16 lg:mt-24 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-4 -my-4">
          <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration:45s] hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
            {/* Duplicando o array de depoimentos para permitir o loop contínuo e perfeito */}
            {[...new Array(3)].fill(0).map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-8">
                {testimonials.map((testimonial) => (
                  <Card
                    key={`${groupIndex}-${testimonial.id}`}
                    className="w-[320px] md:w-[400px] p-6 md:p-8 hover:-translate-y-2 hover:border-[#3f7efd]/40 transition-all duration-300 bg-gray-900/40 backdrop-blur-md border border-white/5 flex flex-col justify-between"
                  >
                    <div>
                      {/* Ícone de Aspas Cinematográficas */}
                      <span className="font-serif text-5xl text-[#3f7efd]/20 leading-none select-none block h-4 -mt-2">
                        “
                      </span>
                      
                      <p className="text-white/80 text-sm md:text-base leading-relaxed italic mt-4 mb-6">
                        {testimonial.text}
                      </p>
                    </div>

                    {/* Autor do Feedback */}
                    <div className="flex gap-4 items-center border-t border-white/5 pt-4 mt-auto">
                      <div className={`size-11 rounded-full bg-gradient-to-br ${testimonial.avatarBg} flex items-center justify-center text-white font-bold text-sm shadow-md`}>
                        {testimonial.avatarInitials}
                      </div>

                      <div className="flex flex-col">
                        <span className="font-serif text-sm font-semibold text-white">
                          {testimonial.name}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-[#3f7efd] mt-0.5">
                          {testimonial.role} — <strong className="text-white/50 font-normal">{testimonial.company}</strong>
                        </span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
