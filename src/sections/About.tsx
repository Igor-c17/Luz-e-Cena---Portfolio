"use client";
import { SectionHeader } from "@/components/SectionHeader";
import { Card } from "@/components/Card";
import { CardHeader } from "@/components/CardHeader";
import { ToolboxItems } from "@/components/ToolboxItems";
import { motion } from "framer-motion";
import { useRef } from "react";
import { title } from "process";
import { TechIcon } from "@/components/TechIcon";
import StarIcon from "@/assets/icons/star.svg";
import Image from "next/image";
import foot from "@/../../public/card_luz.png";
import check from "@/assets/icons/check-circle.svg";
import abu from "@/../../public/abu.png";
import luz from "@/../../public/luz_e_cena.png";
import bookImage from "@/assets/images/book-cover.png";
import map from "@/../../public/maps.png";

const toolBoxItems = [
  {
    title: "Versatilidade Criativa",
    iconType: check,
  },
  {
    title: "Excelência Técnica",
    iconType: check,
  },
  {
    title: "Direção de Cena",
    iconType: check,
  },
  {
    title: "Experiência Sensorial",
    iconType: check,
  },
  {
    title: "Curadoria Estética",
    iconType: check,
  },
  {
    title: "Acolhimento Criativo",
    iconType: check,
  },
  {
    title: "Produção Autoral",
    iconType: check,
  },
];

const hobbies = [
  {
    title: "Luz",
    emoji: "💡",
    left: "5%",
    top: "5%",
  },
  {
    title: "Câmera",
    emoji: "🎥",
    left: "50%",
    top: "5%",
  },
  {
    title: "Ação",
    emoji: "🎬",
    left: "10%",
    top: "35%",
  },
  {
    title: "Ideia",
    emoji: "💭",
    left: "35%",
    top: "40%",
  },
  {
    title: "Estilo",
    emoji: "🎨",
    left: "70%",
    top: "45%",
  },
  {
    title: "Direção",
    emoji: "🧠",
    left: "5%",
    top: "65%",
  },
  {
    title: "Expressão",
    emoji: "✨",
    left: "45%",
    top: "70%",
  },
];

export const AboutSection = () => {
  const constraintRef = useRef(null);
  return (
    <div className="py-20 lg:py-28 bg-section" id="about">
      <div className="container">
        <SectionHeader
          eyebrow="Sobre a Luz & Cena"
          title="Mais Que Um Estúdio"
          description="Uma experiência visual que une estrutura profissional e sensibilidade criativa."
        />
        <div className="mt-20 flex flex-col gap-8 ">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-5 lg:grid-cols-3">
            <Card className="h-[320px] md:col-span-2 lg:col-span-1">
              <CardHeader
                title="Tod Diz Olá!"
                description="Cada detalhe pensado para elevar o visual ao nível do extraordinário."
              />
              <div className="w-[480px] mx-auto mt-2 bottom-44 right-16  md:w-[350px] md:mt-0 md:right-10 md:bottom-36 lg:right-5 lg:bottom-32 relative">
                <Image src={abu} alt="luz e cena" />
              </div>
            </Card>
            <Card className="h-[320px] md:col-span-3 lg:col-span-2">
              <CardHeader
                title="Criação Sem Limites"
                description="Um espaço criado para dar vida à sua essência com liberdade e intenção."
                className=""
              />
              <ToolboxItems
                items={toolBoxItems}
                className=""
                itemsWrapperClassName="animate-move-left [animation-duration:30s]"
              />
              <ToolboxItems
                items={toolBoxItems}
                className="mt-6"
                itemsWrapperClassName=" -translate-x-1/2 animate-move-right [animation-duration:15s]"
              />
            </Card>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-3 gap-8">
            <Card className="h-[320px] p-0 flex flex-col col-span-3 lg:col-span-2">
              <CardHeader
                title="Monte Sua Cena"
                description="Arraste elementos e construa uma cena com a sua identidade."
                className="px-6 py-6"
              />
              <div className="relative flex-1" ref={constraintRef}>
                {hobbies.map((hobby) => (
                  <motion.div
                    key={hobby.title}
                    className="inline-flex gap-2 px-6 bg-gradient-to-r from-emerald-300 to-sky-400 rounded-full py-1.5 absolute"
                    style={{
                      left: hobby.left,
                      top: hobby.top,
                    }}
                    drag
                    dragConstraints={constraintRef}
                  >
                    <span className="font-medium text-gray-900">
                      {hobby.title}
                    </span>
                    <span>{hobby.emoji}</span>
                  </motion.div>
                ))}
              </div>
            </Card>
            <a
              href="https://www.google.com/maps?q=Rua+Antonio+Martins,+603+-+Rodolfo+Teófilo,+Fortaleza+-+CE,+60430-025"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="h-[320px] w-[300px] adjust-card p-0 relative col-span-2 lg:col-span-1 cursor-pointer ">
                <Image
                  src={map}
                  alt="map"
                  className="h-full w-full object-cover object-left-top"
                />
                <div className=" hover:scale-[1.2] transition-transform absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-20 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#3f7efd] after:content-[''] after:absolute after:inset-0 after:outline after:outline-2 after:-outline-offset-2 after:rounded-full after:outline-gray-950/30">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#3f7efd] -z-20 animate-ping [animation-duration:2s]"></div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#2ECC71] to-[#3f7efd] -z-10"></div>
                  <Image src={luz} alt="smiling memoji" className="size-20" />
                </div>
              </Card>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
