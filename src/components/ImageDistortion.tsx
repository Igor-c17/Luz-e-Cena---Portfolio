"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ImageDistortionProps {
  src: string;
  alt: string;
  className?: string;
}

export function ImageDistortion({
  src,
  alt,
  className = "",
}: ImageDistortionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Refs para armazenar as instâncias do Three.js puro
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hoverValue = useRef(0);
  const clockRef = useRef(new THREE.Clock());

  useEffect(() => {
    setIsMounted(true);
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    // 1. Cena e Câmera Ortográfica (perfeita para planos 2D)
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // 2. Renderizador com alpha transparente e antialias
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 3. Carregar a textura usando o Three.js nativo
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(src, (tex) => {
      tex.minFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
    });

    // 4. Definição do Shader idêntico ao seu anterior
    const material = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        uniform float uTime;
        uniform float uHover;
        varying vec2 vUv;

        void main() {
          vec2 uv = vUv;
          if (uHover > 0.0) {
            float waveX = sin(uv.y * 8.0 + uTime * 2.5) * 0.04 * uHover;
            float waveY = cos(uv.x * 8.0 + uTime * 2.0) * 0.03 * uHover;
            uv.x += waveX;
            uv.y += waveY;
          }
          vec4 textureColor = texture2D(uTexture, uv);
          float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
          vignette = clamp(pow(16.0 * vignette, 0.25), 0.0, 1.0);
          gl_FragColor = vec4(textureColor.rgb * vignette, textureColor.a);
        }
      `,
      uniforms: {
        uTexture: { value: texture },
        uTime: { value: 0 },
        uHover: { value: 0 },
      },
      transparent: true,
    });
    materialRef.current = material;

    // 5. Criação da Malha (Mesh) ocupando a tela cheia do container
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 6. Loop de Animação Nativo (substitui o useFrame do Fiber)
    const animate = () => {
      if (
        !materialRef.current ||
        !rendererRef.current ||
        !sceneRef.current ||
        !cameraRef.current
      )
        return;

      // Atualiza o tempo das ondas
      materialRef.current.uniforms.uTime.value =
        clockRef.current.getElapsedTime();

      // Interpolação suave do hover (lerp)
      const targetHover =
        container.getAttribute("data-hovering") === "true" ? 1.0 : 0.0;
      hoverValue.current += (targetHover - hoverValue.current) * 0.08;
      materialRef.current.uniforms.uHover.value = hoverValue.current;

      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 7. Evento de redimensionamento do container de fotos do estúdio
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Limpeza ao desmontar o componente para evitar vazamento de memória (Memory Leak)
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current)
        cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-hovering={isHovered ? "true" : "false"}
      data-cursor="view"
      style={{ minHeight: "100%", width: "100%" }}
    >
      {/* Imagem nativa de fallback que garante o SEO e some graciosamente no client */}
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 object-cover w-full h-full transition-opacity duration-500 ${
          isMounted ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </div>
  );
}
