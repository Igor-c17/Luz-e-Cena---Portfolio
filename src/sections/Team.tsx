"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";

// Reutilizando assets existentes em public
import igorAvatar from "@/../../public/luz_e_cena.png"; // Logo/Símbolo do estúdio
import donaAvatar from "@/../../public/passarinho.png"; // Mascote/Símbolo delicado do estúdio
import bgNoise from "@/assets/images/grain.jpg";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  signature: string;
  avatar: string;
  rotation: number;
  details: string[];
}

const teamList: TeamMember[] = [
  {
    id: 1,
    name: "Igor Carvalho",
    role: "Diretor Criativo & Fotógrafo Sênior",
    description: "Idealizador do Luz e Cena. Conduz a narrativa visual através de lentes e sombras, transformando ideias abstratas em composições artísticas precisas. Especialista em capturar a luz natural e dar estrutura executiva e artística a cada projeto do estúdio.",
    signature: "Igor Carvalho",
    avatar: igorAvatar.src,
    rotation: -3,
    details: ["10+ Anos em Fotografia Artística", "Especialista em Iluminação de Estúdio", "Gestor Executivo & Planejamento Estético"],
  },
  {
    id: 2,
    name: "Dona",
    role: "Diretora de Cena & Produção Executiva",
    description: "A mente sensível e minuciosa por trás da organização cênica. Garante que os bastidores funcionem com fluidez, orientando as pessoas em cena e ambientando cenários físicos para criar um espaço seguro de vulnerabilidade criativa e pura expressão artística.",
    signature: "Dona",
    avatar: donaAvatar.src,
    rotation: 4,
    details: ["Curadora de Direção de Arte", "Especialista em Orientação Cênica", "Gestão de Produção e Logística Criativa"],
  },
];

export function TeamSection() {
  return (
    <section className="py-24 bg-section relative overflow-hidden" id="equipe">
      {/* Textura de Grain de Película Cinematográfica de Fundo */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none -z-10"
        style={{ backgroundImage: `url(${bgNoise.src})` }}
      />
      
      {/* Luz decorativa suave */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#2ECC71]/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#3f7efd]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="container px-4 mx-auto">
        <SectionHeader
          eyebrow="Quem Faz Acontecer"
          title="Os Bastidores da Criação"
          description="Conheça as mentes dedicadas a extrair a beleza poética de cada detalhe, combinando rigor técnico à sensibilidade humana."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-20 items-center">
          
          {/* Lado Esquerdo: Cards Interativos da Equipe */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            {teamList.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ y: -15, scale: 1.02, rotate: member.rotation * 0.5, zIndex: 10 }}
                style={{ rotate: member.rotation }}
                className="w-full max-w-[280px] bg-[#fcfbf9] text-gray-900 p-5 rounded-xl shadow-2xl border border-gray-200/50 flex flex-col items-center group cursor-pointer transition-all duration-300"
              >
                {/* Foto no Estilo Polaroid */}
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-gray-900 border border-gray-300/40 mb-4">
                  {/* Grain filter on avatar */}
                  <div className="absolute inset-0 bg-black/10 z-10 pointer-events-none mix-blend-overlay" />
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  {/* Tape decorativa no topo da polaroid */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-20 h-6 bg-white/20 backdrop-blur-sm shadow-sm rotate-1 border-x border-white/10 z-20" />
                </div>

                {/* Área de Escrita Manual da Polaroid */}
                <div className="w-full text-center py-2 flex flex-col justify-center items-center">
                  <span className="font-serif text-lg font-bold tracking-tight text-gray-800">
                    {member.name}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold mt-1">
                    {member.role}
                  </span>
                  <span className="font-serif text-xl text-[#3f7efd] mt-4 opacity-75 select-none italic font-medium">
                    {member.signature}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Lado Direito: Informações Narrativas Profundas */}
          <div className="flex flex-col gap-12">
            {teamList.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 * member.id, ease: "easeOut" }}
                className="border-l-2 border-[#3f7efd]/30 pl-6 hover:border-[#3f7efd] transition-colors duration-300"
              >
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-serif text-2xl text-white font-medium">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#2ECC71] bg-[#2ECC71]/10 px-2 py-0.5 rounded-full border border-[#2ECC71]/20">
                    {member.role.split(" & ")[0]}
                  </span>
                </div>
                <p className="text-white/70 text-sm md:text-base leading-relaxed mb-4">
                  {member.description}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
                  {member.details.map((detail, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-white/50">
                      <div className="size-1 bg-[#3f7efd] rounded-full" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
