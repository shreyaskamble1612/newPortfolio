import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  playShockwaveSound,
  playSupernovaSound,
  startChargeHum,
  stopChargeHum,
  setSoundEnabled,
  getSoundEnabled,
} from "../utils/soundEffects";
import "./Scroll3DScene.css";

export function Scroll3DScene() {
  const mountRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [warpVelocity, setWarpVelocity] = useState(1.0);
  const [isWarping, setIsWarping] = useState(false);
  const [universeMode, setUniverseMode] = useState("violet"); // "violet" | "cyber" | "galaxy"
  const [soundOn, setSoundOn] = useState(false);
  const [chargingPercent, setChargingPercent] = useState(0);
  const [isCharging, setIsCharging] = useState(false);

  const universeModeRef = useRef("violet");
  universeModeRef.current = universeMode;

  const toggleSound = (e) => {
    e.stopPropagation();
    const nextState = !soundOn;
    setSoundOn(nextState);
    setSoundEnabled(nextState);
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // --- 1. Three.js Scene, Camera, Renderer ---
    const scene = new THREE.Scene();

    const getWidth = () => window.innerWidth;
    const getHeight = () => window.innerHeight;

    const baseFov = 50;
    const camera = new THREE.PerspectiveCamera(baseFov, getWidth() / getHeight(), 0.1, 1000);
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(getWidth(), getHeight());
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    container.appendChild(renderer.domElement);

    // --- 2. Dynamic Lighting ---
    const ambientLight = new THREE.AmbientLight(0xf5f3ff, 1.0);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x7c3aed, 2.2);
    dirLight1.position.set(12, 18, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.6);
    dirLight2.position.set(-12, -12, 6);
    scene.add(dirLight2);

    // --- 3. 3D Floating Geometric Objects Group ---
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const wireframeMatViolet = new THREE.MeshBasicMaterial({
      color: 0x7c3aed,
      wireframe: true,
      transparent: true,
      opacity: 0.38,
    });

    const wireframeMatLight = new THREE.MeshBasicMaterial({
      color: 0xc084fc,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });

    const glossyVioletMat = new THREE.MeshPhongMaterial({
      color: 0x8b5cf6,
      emissive: 0x4c1d95,
      specular: 0xffffff,
      shininess: 90,
      flatShading: true,
      transparent: true,
      opacity: 0.7,
    });

    const glossyLavenderMat = new THREE.MeshPhongMaterial({
      color: 0xd8b4fe,
      emissive: 0x6d28d9,
      specular: 0xffffff,
      shininess: 100,
      flatShading: true,
      transparent: true,
      opacity: 0.72,
    });

    const shapeConfigs = [
      { geo: new THREE.IcosahedronGeometry(2.2, 1), mat: wireframeMatViolet, pos: [-11, 4, -4], rotSpeed: [0.003, 0.005] },
      { geo: new THREE.TorusGeometry(2.4, 0.08, 16, 80), mat: wireframeMatLight, pos: [12, 6, -6], rotSpeed: [0.004, -0.003] },
      { geo: new THREE.OctahedronGeometry(1.2, 0), mat: glossyVioletMat, pos: [10, -2, -2], rotSpeed: [-0.004, 0.006] },
      { geo: new THREE.IcosahedronGeometry(2.8, 0), mat: glossyLavenderMat, pos: [-12, -10, -5], rotSpeed: [0.005, 0.003] },
      { geo: new THREE.TorusGeometry(3.2, 0.05, 16, 100), mat: wireframeMatViolet, pos: [-10, -12, -7], rotSpeed: [-0.002, 0.004] },
      { geo: new THREE.DodecahedronGeometry(1.8, 0), mat: wireframeMatLight, pos: [11, -16, -4], rotSpeed: [0.004, 0.005] },
      { geo: new THREE.OctahedronGeometry(1.4, 0), mat: glossyVioletMat, pos: [13, -22, -3], rotSpeed: [0.006, -0.004] },
      { geo: new THREE.TorusGeometry(2.6, 0.06, 16, 90), mat: wireframeMatLight, pos: [-11, -28, -6], rotSpeed: [0.003, 0.005] },
      { geo: new THREE.IcosahedronGeometry(2.2, 1), mat: wireframeMatViolet, pos: [12, -34, -5], rotSpeed: [-0.005, 0.003] },
      { geo: new THREE.OctahedronGeometry(1.5, 0), mat: glossyLavenderMat, pos: [-9, -40, -4], rotSpeed: [0.004, -0.005] },
      { geo: new THREE.DodecahedronGeometry(2.0, 0), mat: wireframeMatLight, pos: [10, -46, -6], rotSpeed: [0.003, 0.004] },
    ];

    const shapeMeshes = shapeConfigs.map((config) => {
      const mesh = new THREE.Mesh(config.geo, config.mat);
      mesh.position.set(...config.pos);
      shapesGroup.add(mesh);
      return {
        mesh,
        rotSpeed: config.rotSpeed,
        basePos: [...config.pos],
      };
    });

    // --- 4. 3D Particle Cloud ---
    const particleCount = 550;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleBasePositions = new Float32Array(particleCount * 3);
    const particleVelocities = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const getPaletteColors = (mode) => {
      if (mode === "cyber") {
        return [
          new THREE.Color(0x00f5ff),
          new THREE.Color(0xff007f),
          new THREE.Color(0x7928ca),
          new THREE.Color(0xffffff),
        ];
      }
      if (mode === "galaxy") {
        return [
          new THREE.Color(0x10b981),
          new THREE.Color(0x3b82f6),
          new THREE.Color(0x6366f1),
          new THREE.Color(0xa7f3d0),
        ];
      }
      return [
        new THREE.Color(0x7c3aed),
        new THREE.Color(0xa855f7),
        new THREE.Color(0xc084fc),
        new THREE.Color(0xddd6fe),
        new THREE.Color(0x38bdf8),
      ];
    };

    const initialPalette = getPaletteColors("violet");

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 40;
      const y = (Math.random() - 0.5) * 85;
      const z = (Math.random() - 0.5) * 28 - 5;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleBasePositions[i * 3] = x;
      particleBasePositions[i * 3 + 1] = y;
      particleBasePositions[i * 3 + 2] = z;

      particleVelocities[i * 3] = 0;
      particleVelocities[i * 3 + 1] = 0;
      particleVelocities[i * 3 + 2] = 0;

      const color = initialPalette[Math.floor(Math.random() * initialPalette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.72,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- 5. Interactive 3D Singularity / Black Hole Core Mesh ---
    const singularityGeo = new THREE.SphereGeometry(1.2, 32, 32);
    const singularityMat = new THREE.MeshBasicMaterial({
      color: 0x090314,
      transparent: true,
      opacity: 0,
      wireframe: true,
    });
    const singularityMesh = new THREE.Mesh(singularityGeo, singularityMat);
    scene.add(singularityMesh);

    // --- 6. Shockwaves & Supernovas Pool ---
    const shockwaves = [];
    const shockwaveGeo = new THREE.TorusGeometry(1, 0.05, 16, 70);

    const triggerShockwave = (worldPos, isSupernova = false) => {
      const ringMat = new THREE.MeshBasicMaterial({
        color: universeModeRef.current === "cyber" ? 0x00f5ff : isSupernova ? 0xffffff : 0xa855f7,
        transparent: true,
        opacity: isSupernova ? 1.0 : 0.85,
      });
      const shockwaveMesh = new THREE.Mesh(shockwaveGeo, ringMat);
      shockwaveMesh.position.copy(worldPos);
      shockwaveMesh.rotation.x = Math.random() * Math.PI;
      shockwaveMesh.rotation.y = Math.random() * Math.PI;
      scene.add(shockwaveMesh);

      // Shards
      const shardCount = isSupernova ? 28 : 12;
      const shards = [];
      const shardGeo = new THREE.OctahedronGeometry(isSupernova ? 0.38 : 0.22, 0);
      const shardMat = new THREE.MeshBasicMaterial({
        color: universeModeRef.current === "cyber" ? 0xff007f : isSupernova ? 0xa855f7 : 0xc084fc,
        transparent: true,
        opacity: 0.9,
      });

      for (let s = 0; s < shardCount; s++) {
        const shard = new THREE.Mesh(shardGeo, shardMat);
        shard.position.copy(worldPos);
        const speed = isSupernova ? 0.85 : 0.35;
        const vel = new THREE.Vector3(
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed,
          (Math.random() - 0.5) * speed
        );
        scene.add(shard);
        shards.push({ mesh: shard, vel });
      }

      shockwaves.push({
        mesh: shockwaveMesh,
        shards,
        scale: 0.1,
        growthRate: isSupernova ? 0.18 : 0.09,
        opacity: 1.0,
      });
    };

    // Screen to 3D World Converter
    const screenToWorld = (clientX, clientY) => {
      const vector = new THREE.Vector3(
        (clientX / window.innerWidth) * 2 - 1,
        -(clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = -camera.position.z / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(distance));
    };

    // --- 7. Mouse Hold & Singularity Tracking ---
    let holdStartTime = 0;
    let isHolding = false;
    let chargeProgress = 0;
    let holdWorldPos = new THREE.Vector3();
    let currentMouseScreen = { x: 0, y: 0 };

    const handleMouseDown = (e) => {
      // Don't capture clicks on interactive buttons, links, or inputs
      if (e.target.closest("a, button, input, textarea, select")) return;

      isHolding = true;
      holdStartTime = performance.now();
      currentMouseScreen = { x: e.clientX, y: e.clientY };
      holdWorldPos = screenToWorld(e.clientX, e.clientY);
      singularityMesh.position.copy(holdWorldPos);
    };

    const handleMouseUp = () => {
      if (!isHolding) return;
      isHolding = false;
      stopChargeHum();
      setIsCharging(false);
      setChargingPercent(0);

      const holdDuration = performance.now() - holdStartTime;

      if (chargeProgress >= 0.75) {
        // SUPERNOVA DETONATION
        playSupernovaSound();
        triggerShockwave(holdWorldPos, true);

        // Blast particle velocities outward!
        const posAttr = particleGeometry.attributes.position;
        const positions = posAttr.array;
        for (let i = 0; i < particleCount; i++) {
          const idx = i * 3;
          const dx = positions[idx] - holdWorldPos.x;
          const dy = positions[idx + 1] - holdWorldPos.y;
          const dz = positions[idx + 2] - holdWorldPos.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;
          const blast = Math.min(25 / dist, 1.8);
          particleVelocities[idx] = (dx / dist) * blast;
          particleVelocities[idx + 1] = (dy / dist) * blast;
          particleVelocities[idx + 2] = (dz / dist) * blast;
        }
      } else if (holdDuration < 220) {
        // Quick Click Shockwave
        playShockwaveSound();
        triggerShockwave(holdWorldPos, false);
      }

      chargeProgress = 0;
      singularityMat.opacity = 0;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // --- 8. Scroll & Mouse Tracking ---
    let currentScroll = window.scrollY;
    let targetScroll = window.scrollY;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 100));
    };

    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      currentMouseScreen = { x: e.clientX, y: e.clientY };

      if (isHolding) {
        holdWorldPos = screenToWorld(e.clientX, e.clientY);
        singularityMesh.position.copy(holdWorldPos);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    // --- 9. Animation Loop ---
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp Scroll & Velocity
      const scrollDelta = targetScroll - currentScroll;
      currentScroll += scrollDelta * 0.085;
      scrollVelocity = Math.abs(currentScroll - lastScrollY);
      lastScrollY = currentScroll;

      const warpSpeedNumber = 1.0 + Math.min(scrollVelocity * 0.15, 8.5);
      setWarpVelocity(warpSpeedNumber.toFixed(1));
      setIsWarping(scrollVelocity > 6);

      // Lerp Mouse
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? currentScroll / docHeight : 0;

      // Camera Position & 3D Warp FOV
      const targetCameraY = -scrollPercent * 45;
      camera.position.y += (targetCameraY - camera.position.y) * 0.06;

      const targetFov = baseFov + Math.min(scrollVelocity * 0.45, 18);
      camera.fov += (targetFov - camera.fov) * 0.1;
      camera.updateProjectionMatrix();

      const targetCameraZ = 24 - Math.min(scrollVelocity * 0.06, 3.8);
      camera.position.z += (targetCameraZ - camera.position.z) * 0.08;

      camera.rotation.y = currentMouseX * 0.07;
      camera.rotation.x = -currentMouseY * 0.05;

      // Singularity Charge Accumulation
      if (isHolding) {
        const holdDuration = performance.now() - holdStartTime;
        if (holdDuration > 160) {
          if (!isCharging) {
            setIsCharging(true);
            startChargeHum();
          }
          chargeProgress = Math.min((holdDuration - 160) / 900, 1.0);
          setChargingPercent(Math.round(chargeProgress * 100));

          singularityMat.opacity = chargeProgress * 0.85;
          const sScale = 0.5 + chargeProgress * 2.2;
          singularityMesh.scale.set(sScale, sScale, sScale);
          singularityMesh.rotation.y += 0.08;
          singularityMesh.rotation.z += 0.05;
        }
      }

      // Rotate geometric shapes
      const velocityBoost = 1 + scrollVelocity * 0.16;
      shapeMeshes.forEach(({ mesh, rotSpeed, basePos }, idx) => {
        mesh.rotation.x += rotSpeed[0] * velocityBoost;
        mesh.rotation.y += rotSpeed[1] * velocityBoost;
        mesh.rotation.z += (rotSpeed[0] + rotSpeed[1]) * 0.5 * velocityBoost;

        if (isHolding && chargeProgress > 0.2) {
          // Pull shapes towards black hole
          mesh.position.lerp(holdWorldPos, chargeProgress * 0.04);
        } else {
          // Float naturally
          const naturalY = basePos[1] + Math.sin(elapsedTime * 1.3 + idx) * 0.5;
          mesh.position.x += (basePos[0] - mesh.position.x) * 0.05;
          mesh.position.y += (naturalY - mesh.position.y) * 0.05;
          mesh.position.z += (basePos[2] - mesh.position.z) * 0.05;
        }
      });

      // Particles Physics (Gravity Vortex & Supernova Recoil)
      const posAttr = particleGeometry.attributes.position;
      const positions = posAttr.array;
      const mouseWorldX = currentMouseX * 18;
      const mouseWorldY = -currentMouseY * 12 + camera.position.y;

      for (let i = 0; i < particleCount; i++) {
        const idx = i * 3;
        const bx = particleBasePositions[idx];
        const by = particleBasePositions[idx + 1];
        let bz = particleBasePositions[idx + 2];

        // Apply supernova explosion velocity damping
        positions[idx] += particleVelocities[idx];
        positions[idx + 1] += particleVelocities[idx + 1];
        positions[idx + 2] += particleVelocities[idx + 2];

        particleVelocities[idx] *= 0.92;
        particleVelocities[idx + 1] *= 0.92;
        particleVelocities[idx + 2] *= 0.92;

        if (isHolding && chargeProgress > 0.2) {
          // SUCK PARTICLES INTO SINGULARITY VORTEX
          const dx = holdWorldPos.x - positions[idx];
          const dy = holdWorldPos.y - positions[idx + 1];
          const dz = holdWorldPos.z - positions[idx + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz) + 0.1;

          // Orbiting spiral force
          const pull = 0.08 * chargeProgress;
          positions[idx] += dx * pull - dy * 0.04;
          positions[idx + 1] += dy * pull + dx * 0.04;
          positions[idx + 2] += dz * pull;
        } else {
          // Normal idle + cursor gravity
          const dx = mouseWorldX - bx;
          const dy = mouseWorldY - by;
          const distSq = dx * dx + dy * dy;

          if (distSq < 40) {
            const force = (40 - distSq) * 0.003;
            positions[idx] = bx + dx * force;
            positions[idx + 1] = by + dy * force;
          } else {
            positions[idx] += (bx - positions[idx]) * 0.05;
            positions[idx + 1] += (by - positions[idx + 1]) * 0.05;
          }
          positions[idx + 2] = bz;
        }
      }
      posAttr.needsUpdate = true;

      // Animate Shockwaves & Shards
      for (let i = shockwaves.length - 1; i >= 0; i--) {
        const sw = shockwaves[i];
        sw.scale += sw.growthRate;
        sw.opacity -= 0.024;

        sw.mesh.scale.set(sw.scale, sw.scale, sw.scale);
        sw.mesh.material.opacity = Math.max(sw.opacity, 0);

        sw.shards.forEach((s) => {
          s.mesh.position.add(s.vel);
          s.mesh.rotation.x += 0.06;
          s.mesh.rotation.y += 0.06;
          s.mesh.material.opacity = Math.max(sw.opacity, 0);
        });

        if (sw.opacity <= 0) {
          scene.remove(sw.mesh);
          sw.shards.forEach((s) => scene.remove(s.mesh));
          shockwaves.splice(i, 1);
        }
      }

      particles.rotation.y = elapsedTime * 0.015 + scrollPercent * 0.8;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const width = getWidth();
      const height = getHeight();
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      stopChargeHum();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      singularityGeo.dispose();
      singularityMat.dispose();
      shockwaveGeo.dispose();
      wireframeMatViolet.dispose();
      wireframeMatLight.dispose();
      glossyVioletMat.dispose();
      glossyLavenderMat.dispose();
    };
  }, []);

  return (
    <>
      {/* 3D Top Glow Scroll Progress Bar */}
      <div
        className="scroll-3d-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* 3D Background Canvas */}
      <div className="scroll-3d-canvas-container" ref={mountRef} aria-hidden="true" />

      {/* Singularity / Supernova Charge Bar HUD (Appears when user holds click) */}
      {isCharging && (
        <div className="singularity-hud" aria-live="polite">
          <span>⚡ Singularity Charge: {chargingPercent}%</span>
          <div className="singularity-bar-bg">
            <div
              className="singularity-bar-fill"
              style={{ width: `${chargingPercent}%` }}
            ></div>
          </div>
          <span>Release to Explode 💥</span>
        </div>
      )}

      {/* Sci-Fi 3D Warp Speed HUD */}
      <div className={`warp-speed-hud ${isWarping ? "warp-active" : ""}`}>
        <span className="warp-pulse-dot"></span>
        <span className="warp-label">Scroll Warp:</span>
        <span className="warp-meter">{warpVelocity}X</span>

        {/* Audio Toggle Button */}
        <button
          className={`sound-toggle-btn ${soundOn ? "sound-on" : ""}`}
          onClick={toggleSound}
          title={soundOn ? "Mute 3D Audio FX" : "Enable 3D Audio FX (Synthesized)"}
          aria-label="Toggle 3D Audio FX"
        >
          {soundOn ? "🔊" : "🔇"}
        </button>
      </div>

      {/* 3D Universe Mode Switcher */}
      <div className="universe-mode-widget" title="Switch 3D Dimension Style">
        <button
          className={`universe-btn ${universeMode === "violet" ? "active" : ""}`}
          onClick={() => setUniverseMode("violet")}
        >
          🟣 <span>Violet</span>
        </button>
        <button
          className={`universe-btn ${universeMode === "cyber" ? "active" : ""}`}
          onClick={() => setUniverseMode("cyber")}
        >
          ⚡ <span>Cyber</span>
        </button>
        <button
          className={`universe-btn ${universeMode === "galaxy" ? "active" : ""}`}
          onClick={() => setUniverseMode("galaxy")}
        >
          🌌 <span>Galaxy</span>
        </button>
      </div>
    </>
  );
}

export default Scroll3DScene;
