import Image from "next/image";
import memojiImage from "@/assets/images/memoji-computer.png";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import grainImage from "@/assets/images/grain.jpg";
import StarIcon from "@/assets/icons/star.svg";
import SparkleIcon from "@/assets/icons/sparkle.svg";
import letreiro from "@/../../public/luz_e_cena_letreiro.png";
import logo from "@/../../public/logo.png";
import onda from "@/../../public/onda.png";
import explore from "@/../../public/explorar.png";
import { HeroOrbit } from "@/components/HeroOrbit";

export const HeroSection = () => {
  return (
    <div
      className="py-32 md:py-48 lg:py-60 relative z-0 overflow-x-clip"
      id="home"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_70%, transparent">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{
            backgroundImage: `url(${grainImage.src})`,
          }}
        ></div>
        <div className="size-[620px] hero-ring"></div>
        <div className="size-[820px] hero-ring"></div>
        <div className="size-[1020px] hero-ring"></div>
        <div className="size-[1220px] hero-ring"></div>
        <HeroOrbit
          size={430}
          rotation={-14}
          shouldOrbit
          orbitDuration="30s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-8 text-[#2ECC71]/20" />
        </HeroOrbit>
        <HeroOrbit
          size={440}
          rotation={79}
          shouldOrbit
          orbitDuration="32s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-5 text-[#2ECC71]/20" />
        </HeroOrbit>
        <HeroOrbit
          size={520}
          rotation={-41}
          shouldOrbit
          orbitDuration="34s"
          shouldSpin
          spinDuration="3s"
        >
          <div className="size-2 rounded-full bg-[#2ECC71]/20" />
        </HeroOrbit>
        <HeroOrbit
          size={530}
          rotation={178}
          shouldOrbit
          orbitDuration="36s"
          shouldSpin
          spinDuration="3s"
        >
          <SparkleIcon className="size-10 text-[#2ECC71]/20" />
        </HeroOrbit>
        <HeroOrbit
          size={550}
          rotation={20}
          shouldOrbit
          orbitDuration="38s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size12 text-[#2ECC71]" />
        </HeroOrbit>
        <HeroOrbit
          size={590}
          rotation={98}
          shouldOrbit
          orbitDuration="40s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-8 text-[#2ECC71]" />
        </HeroOrbit>
        <HeroOrbit
          size={650}
          rotation={-5}
          shouldOrbit
          orbitDuration="42s"
          shouldSpin
          spinDuration="3s"
        >
          <div className="size-2 rounded-full bg-[#2ECC71]/20" />
        </HeroOrbit>
        <HeroOrbit
          size={710}
          rotation={144}
          shouldOrbit
          orbitDuration="44s"
          shouldSpin
          spinDuration="6s"
        >
          <SparkleIcon className="size-14 text-[#2ECC71]/20" />
        </HeroOrbit>
        <HeroOrbit
          size={720}
          rotation={85}
          shouldOrbit
          orbitDuration="46s"
          shouldSpin
          spinDuration="6s"
        >
          <div className="size-3 rounded-full bg-[#2ECC71]/20" />
        </HeroOrbit>
        <HeroOrbit
          size={800}
          rotation={-72}
          shouldOrbit
          orbitDuration="48s"
          shouldSpin
          spinDuration="6s"
        >
          <StarIcon className="size-28 text-[#2ECC71]" />
        </HeroOrbit>
      </div>
      <div className="container">
        <div className="flex flex-col items-center">
          <Image
            src={logo}
            className="size-[180px] top-40 md:top-56 lg:top-[270px] absolute pointer-events-none z-0"
            alt="Person peeking from behind laptop"
          />
          <Image
            src={letreiro}
            className="size-[250px] top-24 relative pointer-events-none z-0"
            alt="Person peeking from behind laptop"
          />
          <div className="bg-[#0a3996]/70 border border-[#0850e0] px-4 py-1.5 inline-flex items-center gap-4 rounded-lg z-10">
            <div className="bg-green-500 size-2.5 rounded-full relative">
              <div className="bg-green-500 absolute inset-0 rounded-full animate-ping-large"></div>
            </div>
            <div className="text-sm font-medium">
              Disponível Para Novos Projetos
            </div>
          </div>
        </div>
        <div className="max-w-lg mx-auto">
          <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide sm:text-5xl ">
            Onde a Luz Encontra Propósito e a Criatividade Ganha Forma
          </h1>
          <div className="relative inline-block">
            <p className="mt-7 text-center text-white/80 md:text-lg  sm:text-xl p_shine">
              O Luz e Cena habita o universo da expressão visual autêntica, da
              criatividade sem limites e da sofisticação acessível. Suas
              fronteiras são a vulgaridade, a padronização e a pressa que mata a
              alma criativa. Seus símbolos são a luz natural que abraça, os
              cenários que se transformam, a escuta atenta e os sorrisos
              genuínos que florescem quando a visão se torna realidade tangível.
            </p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-4 neon">
          <button className="inline-flex items-center gap-2 border border-[#fff]/50 px-6 h-12 rounded-xl neon">
            <Image
              src={explore}
              className="size-4 relative left-0.5 pointer-events-none z-0 opacity-70"
              alt="Person peeking from behind laptop"
            />
            <span className="font-semibold">Explore o Estúdio</span>
            <ArrowDown className="size-4 " />
          </button>
          <button className="inline-flex items-center gap-2 border border-[#fff]/50 bg-[#0a3996] text-white-900 h-12 px-6 rounded-xl">
            <span>
              <Image
                src={onda}
                className="size-5 pointer-events-none z-0"
                alt="Person peeking from behind laptop"
              />
            </span>
            <span className="font-semibold">Vamos Conversar!</span>
          </button>
        </div>
      </div>
    </div>
  );
};
