"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [cursorVariant, setCursorVariant] = useState<string>("default");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Posição física do mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Configuração de física de mola (efeito lag/suavizado elegante)
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Esconder o cursor padrão do sistema se não for dispositivo touch
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    setIsVisible(true);
    document.body.style.cursor = "none";

    const moveMouse = (e: MouseEvent) => {
      // Ajusta para centralizar o cursor (subtraindo metade do tamanho médio padrão)
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Procura pelo elemento interativo mais próximo
      const interactiveEl = target.closest("[data-cursor], a, button, [role='button']");
      
      if (interactiveEl) {
        const customCursorType = interactiveEl.getAttribute("data-cursor");
        if (customCursorType) {
          setCursorVariant(customCursorType);
        } else {
          setCursorVariant("hovered");
        }
      } else {
        setCursorVariant("default");
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.body.style.cursor = "auto";
    };
  }, [mouseX, mouseY]);

  // Se for touch ou não estiver visível, não renderiza nada
  if (!isVisible) return null;

  // Variantes visuais do cursor
  const variants: Record<string, any> = {
    default: {
      width: 16,
      height: 16,
      backgroundColor: "rgba(46, 204, 113, 0.4)", // verde do estúdio semi-transparente
      border: "1px solid rgba(46, 204, 113, 0.8)",
      borderRadius: "50%",
    },
    hovered: {
      width: 48,
      height: 48,
      backgroundColor: "rgba(63, 126, 253, 0.2)", // azul semi-transparente
      border: "2px solid rgba(63, 126, 253, 0.8)",
      borderRadius: "50%",
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "#2ECC71", // verde estúdio sólido
      border: "none",
      borderRadius: "50%",
    },
    drag: {
      width: 80,
      height: 80,
      backgroundColor: "#3f7efd", // azul sólido
      border: "none",
      borderRadius: "50%",
    },
  };

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2 overflow-hidden shadow-lg"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={cursorVariant}
      variants={variants}
      transition={{ type: "spring", stiffness: 500, damping: 28 }}
    >
      {cursorVariant === "view" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-black text-xs font-black tracking-widest uppercase"
        >
          View
        </motion.span>
      )}
      {cursorVariant === "drag" && (
        <motion.span
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-white text-xs font-black tracking-widest uppercase"
        >
          Drag
        </motion.span>
      )}
    </motion.div>
  );
}
