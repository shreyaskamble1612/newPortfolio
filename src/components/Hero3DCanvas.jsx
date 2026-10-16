import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Hero3DCanvas.css";

export function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 450;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. 3D Geometric Meshes with Violet Aesthetics
    // Outer Icosahedron Wireframe
    const geometry = new THREE.IcosahedronGeometry(1.65, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x7c3aed, // Violet 600
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const wireframeMesh = new THREE.Mesh(geometry, wireframeMaterial);
    scene.add(wireframeMesh);

    // Inner Glowing Core (Octahedron)
    const coreGeometry = new THREE.OctahedronGeometry(0.9, 0);
    const coreMaterial = new THREE.MeshPhongMaterial({
      color: 0xa855f7, // Violet 500
      emissive: 0x6d28d9, // Deep Violet
      specular: 0xffffff,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Torus Ring orbiting around the core
    const ringGeometry = new THREE.TorusGeometry(2.1, 0.02, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      transparent: true,
      opacity: 0.6,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    const ringGeometry2 = new THREE.TorusGeometry(2.35, 0.015, 16, 100);
    const ringMaterial2 = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh2 = new THREE.Mesh(ringGeometry2, ringMaterial2);
    ringMesh2.rotation.y = Math.PI / 4;
    scene.add(ringMesh2);

    // 3. Orbiting 3D Particle Cloud
    const particleCount = 140;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.2 + Math.random() * 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const particleMaterial = new THREE.PointsMaterial({
      color: 0x9333ea,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xa855f7, 2, 50);
    pointLight.position.set(3, 4, 4);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x7c3aed, 2, 50);
    pointLight2.position.set(-3, -3, 2);
    scene.add(pointLight2);

    // 5. Mouse Interaction for 3D Parallax Tilt
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      mouseX = (x / rect.width) * 2;
      mouseY = -(y / rect.height) * 2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 6. Responsive Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // 7. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Base rotation
      wireframeMesh.rotation.y = elapsedTime * 0.2 + targetX * 0.8;
      wireframeMesh.rotation.x = elapsedTime * 0.15 - targetY * 0.8;

      coreMesh.rotation.y = -elapsedTime * 0.35 + targetX * 0.6;
      coreMesh.rotation.z = elapsedTime * 0.25;

      ringMesh.rotation.z = elapsedTime * 0.25;
      ringMesh.rotation.x = Math.PI / 3 + targetY * 0.4;
      ringMesh.rotation.y = targetX * 0.4;

      ringMesh2.rotation.z = -elapsedTime * 0.2;
      ringMesh2.rotation.y = Math.PI / 4 + targetX * 0.3;

      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.x = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      wireframeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      ringGeometry2.dispose();
      ringMaterial2.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="hero-3d-wrapper">
      <div ref={mountRef} className="hero-3d-canvas-container" />
      <div className="canvas-glow-ring"></div>
    </div>
  );
}

export default Hero3DCanvas;
