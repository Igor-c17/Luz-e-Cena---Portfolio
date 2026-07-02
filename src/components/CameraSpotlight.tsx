"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CameraSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera Setup (Perspective)
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8);

    // 3. Renderer Setup (with alpha for transparent background)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Procedural Camera Lens Model Group
    const cameraLensGroup = new THREE.Group();

    // Materials
    const metalBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      metalness: 0.9,
      roughness: 0.2,
    });

    const lensGoldRingMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Golden accent ring
      metalness: 0.8,
      roughness: 0.3,
    });

    const innerLenseMaterial = new THREE.MeshStandardMaterial({
      color: 0x050505,
      metalness: 0.9,
      roughness: 0.1,
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x3f7efd, // Neon blue reflex
      transparent: true,
      opacity: 0.5,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.9, // Glasmorphism
      ior: 1.5,
      side: THREE.DoubleSide,
    });

    // Outer Main Cylinder Body
    const bodyGeometry = new THREE.CylinderGeometry(1.2, 1.0, 2.5, 32);
    bodyGeometry.rotateX(Math.PI / 2); // Orient forward
    const bodyMesh = new THREE.Mesh(bodyGeometry, metalBodyMaterial);
    cameraLensGroup.add(bodyMesh);

    // Focus Ring (slightly larger cylinder)
    const focusRingGeom = new THREE.CylinderGeometry(1.25, 1.25, 0.4, 32);
    focusRingGeom.rotateX(Math.PI / 2);
    const focusRing = new THREE.Mesh(focusRingGeom, metalBodyMaterial);
    focusRing.position.z = 0.5;
    cameraLensGroup.add(focusRing);

    // Gold Accent Ring
    const goldRingGeom = new THREE.CylinderGeometry(1.22, 1.22, 0.05, 32);
    goldRingGeom.rotateX(Math.PI / 2);
    const goldRing = new THREE.Mesh(goldRingGeom, lensGoldRingMaterial);
    goldRing.position.z = 0.8;
    cameraLensGroup.add(goldRing);

    // Front Extension
    const frontGeom = new THREE.CylinderGeometry(1.4, 1.2, 0.6, 32);
    frontGeom.rotateX(Math.PI / 2);
    const frontMesh = new THREE.Mesh(frontGeom, metalBodyMaterial);
    frontMesh.position.z = 1.1;
    cameraLensGroup.add(frontMesh);

    // Lens Glass Curve (front element)
    const glassGeom = new THREE.SphereGeometry(1.3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 3);
    const glassMesh = new THREE.Mesh(glassGeom, glassMaterial);
    glassMesh.position.z = 1.3;
    glassMesh.rotation.x = Math.PI / 2;
    cameraLensGroup.add(glassMesh);

    // Inner Reflection Cone
    const innerConeGeom = new THREE.ConeGeometry(1.1, 0.8, 32, 1, true);
    innerConeGeom.rotateX(-Math.PI / 2);
    const innerCone = new THREE.Mesh(innerConeGeom, innerLenseMaterial);
    innerCone.position.z = 0.9;
    cameraLensGroup.add(innerCone);

    // Add lens to scene, positioned slightly right or central
    cameraLensGroup.position.set(0, 0, 0);
    scene.add(cameraLensGroup);

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Studio Key Lights (simulating reflection in studio)
    const keyLight1 = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight1.position.set(5, 5, 5);
    scene.add(keyLight1);

    const keyLight2 = new THREE.DirectionalLight(0x3f7efd, 2.0); // Cyan/blue brand light
    keyLight2.position.set(-5, 3, 2);
    scene.add(keyLight2);

    const keyLight3 = new THREE.DirectionalLight(0x2ecc71, 0.8); // Emerald accent light
    keyLight3.position.set(0, -5, 2);
    scene.add(keyLight3);

    // 6. Interactive Spotlight (Feixe de Luz)
    const spotLight = new THREE.SpotLight(0x3f7efd, 12, 15, Math.PI / 6, 0.5, 1);
    spotLight.position.set(0, 0, 1.5);
    cameraLensGroup.add(spotLight);

    // Target for the Spotlight (invisible object to point at mouse)
    const spotTarget = new THREE.Object3D();
    spotTarget.position.set(0, 0, 10);
    scene.add(spotTarget);
    spotLight.target = spotTarget;

    // 7. Cinema Dust Particles (Bokeh) inside the light beam
    const particlesCount = 80;
    const particlesGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const speeds = new Float32Array(particlesCount);
    const scales = new Float32Array(particlesCount);

    for (let i = 0; i < particlesCount; i++) {
      // Dust distributed in front of the camera
      positions[i * 3] = (Math.random() - 0.5) * 6;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 4; // y
      positions[i * 3 + 2] = Math.random() * 8 - 2;      // z

      speeds[i] = 0.005 + Math.random() * 0.01;
      scales[i] = 0.02 + Math.random() * 0.05;
    }

    particlesGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    // Glowing particle texture (using Canvas procedurally so no assets are loaded)
    const particleCanvas = document.createElement("canvas");
    particleCanvas.width = 16;
    particleCanvas.height = 16;
    const ctx = particleCanvas.getContext("2d");
    if (ctx) {
      const gradient = ctx.createRadialGradient(8, 8, 0, 8, 8, 8);
      gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
      gradient.addColorStop(0.3, "rgba(63, 126, 253, 0.8)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 16, 16);
    }
    const particleTexture = new THREE.CanvasTexture(particleCanvas);

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.15,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const dustParticles = new THREE.Points(particlesGeom, particlesMaterial);
    scene.add(dustParticles);

    // 8. Interaction State
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };
    const currentRotation = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      // Standardize mouse coordinates from -1 to 1
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      // Rotate camera lens group to point slightly towards mouse
      targetRotation.y = mouse.x * 0.4;
      targetRotation.x = -mouse.y * 0.4;

      // Update light target coordinates based on mouse
      // Projecting mouse to a 3D plane in front of lens
      spotTarget.position.x = mouse.x * 5;
      spotTarget.position.y = mouse.y * 4;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Touch support for mobile
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(e.touches[0].clientY / window.innerHeight) * 2 + 1;
        targetRotation.y = mouse.x * 0.3;
        targetRotation.x = -mouse.y * 0.3;
        spotTarget.position.x = mouse.x * 4;
        spotTarget.position.y = mouse.y * 3;
      }
    };
    window.addEventListener("touchmove", handleTouchMove);

    // 9. Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // 10. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation (lerp) for lens rotation
      currentRotation.x += (targetRotation.x - currentRotation.x) * 0.05;
      currentRotation.y += (targetRotation.y - currentRotation.y) * 0.05;

      cameraLensGroup.rotation.x = currentRotation.x;
      cameraLensGroup.rotation.y = currentRotation.y;

      // Slow idle floating effect when mouse is static
      cameraLensGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;
      cameraLensGroup.position.x = Math.cos(elapsedTime * 1.0) * 0.1;

      // Animate dust particles fluting in 3D space
      const posArray = particlesGeom.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount; i++) {
        // Move along Z axis (drifting towards camera)
        posArray[i * 3 + 2] -= speeds[i];
        
        // Add subtle wave movement on X and Y
        posArray[i * 3] += Math.sin(elapsedTime + i) * 0.002;
        posArray[i * 3 + 1] += Math.cos(elapsedTime + i) * 0.002;

        // If particle goes behind camera, reset in front of lens
        if (posArray[i * 3 + 2] < -2) {
          posArray[i * 3 + 2] = 8;
          posArray[i * 3] = (Math.random() - 0.5) * 6;
          posArray[i * 3 + 1] = (Math.random() - 0.5) * 4;
        }
      }
      particlesGeom.attributes.position.needsUpdate = true;

      // Gentle wobble inside glass for extra glow interativity
      glassMesh.rotation.y = Math.sin(elapsedTime * 2) * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      scene.clear();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none opacity-80"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
