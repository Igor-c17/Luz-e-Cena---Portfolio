import paleta from "@/../../public/paleta.png";
import engrenagem from "@/../../public/engrenagem.png";
import claquete from "@/../../public/claquete.png";
import camera from "@/../../public/camera.png";
import emocao from "@/../../public/emocao.png";
import { SectionHeader } from "@/components/SectionHeader";
import Image from "next/image";
import test from "node:test";
import { Card } from "@/components/Card";
import { Fragment } from "react";

const testimonials = [
  {
    name: "Versatilidade Criativa",
    position: "Ideias Sem Limites.",
    text: "Da liberdade criativa à excelência técnica, nossos pilares definem a forma como cada projeto é concebido, produzido e entregue — garantindo experiências visuais marcantes, autênticas e cinematográficas em cada detalhe.",
    avatar: paleta,
  },
  {
    name: "Excelência Técnica",
    position: "Resultados Profissionais.",
    text: "Excelência Técnica Disponibilizamos infraestrutura profissional completa e atualizada que garante resultados impecáveis, eliminando preocupações técnicas para que o foco seja total na criação. Pilares da Marca",
    avatar: engrenagem,
  },
  {
    name: "Sensibilidade Humana",
    position: "Conexão Que Transforma.",
    text: "Sensibilidade Humana Proporcionamos atendimento com escuta ativa e compreensão profunda das necessidades emocionais e estéticas de cada projeto, criando ambiente seguro para a vulnerabilidade criativa.",
    avatar: emocao,
  },
  {
    name: "Curadoria Estética",
    position: "Beleza Em Cada Detalhe.",
    text: "Curadoria Estética Cuidamos meticulosamente de cada detalhe visual do ambiente, desde a iluminação até os menores elementos cenográficos, garantindo que tudo contribua para a beleza final.",
    avatar: claquete,
  },
  {
    name: "Liberdade Expressiva",
    position: "Seja Quem Você Cria.",
    text: "Liberdade Expressiva Oferecemos espaço físico e emocional para que cada criador possa explorar sua autenticidade sem julgamentos oou limitações, celebrando a diversidade de estilos e visões.",
    avatar: camera,
  },
];

export const TestimonialsSection = () => {
  return (
    <div className="py-16 lg:py-24 bg-section">
      <div className="container">
        <SectionHeader
          eyebrow="Os Fundamentos da Nossa Cena"
          title="Os Pilares que Sustentam Cada Produção da Luz e Cena"
          description="Da liberdade criativa à excelência técnica, nossos pilares definem a forma como cada projeto é concebido, produzido e entregue — garantindo experiências visuais marcantes, autênticas e cinematográficas em cada detalhe."
        />
        <div className="mt-16 lg:mt-20 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-4 -my-4">
          <div className="flex gap-8 pr-8 flex-none animate-move-left [animation-duration:90s] hover:[animation-play-state:paused]">
            {[...new Array(2)].fill(0).map((_, index) => (
              <Fragment key={index}>
                {testimonials.map((testimonial) => (
                  <Card
                    key={testimonial.name}
                    className="max-w-xs md:max-w-md p-6 md:p-8 hover:-rotate-3 transition duration-300"
                  >
                    <div className="flex gap-4 items-center ">
                      <div className="size-14 bg-gray-700 inline-flex items-center justify-center rounded-full flex-shrink-0">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.name}
                          className="max-h-full size-7"
                        />
                      </div>

                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-[#3f7efd]">
                          {testimonial.position}
                        </div>
                      </div>
                    </div>
                    <p className="mt-4 md:mt-6 text-sm md:text-base">
                      {testimonial.text}
                    </p>
                  </Card>
                ))}
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
