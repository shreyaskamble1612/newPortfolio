import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { playNitroSound, playPickupSound, playCrashSound } from "../utils/soundEffects";
import "./CarGame3D.css";

export function CarGame3D() {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [speedMph, setSpeedMph] = useState(120);
  const [nitroFuel, setNitroFuel] = useState(100);
  const [isGameOver, setIsGameOver] = useState(false);
  const [distanceKm, setDistanceKm] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem("shreyas_cargame_highscore") || "0", 10);
  });

  const canvasRef = useRef(null);
  const gameActiveRef = useRef(false);
  const scoreRef = useRef(0);
  const playerLaneRef = useRef(0); // -1: Left, 0: Center, 1: Right
  const nitroActiveRef = useRef(false);

  const startGame = () => {
    setScore(0);
    scoreRef.current = 0;
    setSpeedMph(120);
    setNitroFuel(100);
    setDistanceKm(0);
    setIsGameOver(false);
    playerLaneRef.current = 0;
    nitroActiveRef.current = false;
    gameActiveRef.current = true;
  };

  const openGame = () => {
    setIsOpen(true);
    startGame();
  };

  const closeGame = () => {
    setIsOpen(false);
    gameActiveRef.current = false;
  };

  // Steer functions
  const steerLeft = () => {
    playerLaneRef.current = Math.max(playerLaneRef.current - 1, -1);
  };

  const steerRight = () => {
    playerLaneRef.current = Math.min(playerLaneRef.current + 1, 1);
  };

  const activateNitro = () => {
    if (nitroFuel > 15) {
      nitroActiveRef.current = true;
      playNitroSound();
    }
  };

  const releaseNitro = () => {
    nitroActiveRef.current = false;
  };

  // Keyboard controls
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        steerLeft();
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        steerRight();
      } else if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        activateNitro();
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w" || e.key === "W") {
        releaseNitro();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isOpen]);

  // Three.js 3D Car Racing Simulation
  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const container = canvasRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0418, 0.015);

    const baseFov = 55;
    const camera = new THREE.PerspectiveCamera(baseFov, width / height, 0.1, 1000);
    camera.position.set(0, 4.5, 9);
    camera.lookAt(0, 1.2, -10);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xa855f7, 2.0);
    sunLight.position.set(10, 20, 15);
    scene.add(sunLight);

    const groundLight = new THREE.PointLight(0x00f5ff, 2.5, 40);
    groundLight.position.set(0, 2, 0);
    scene.add(groundLight);

    // 3. Cyber Highway Road
    const roadWidth = 14;
    const roadLength = 220;
    const roadGeo = new THREE.PlaneGeometry(roadWidth, roadLength, 1, 40);
    const roadMat = new THREE.MeshStandardMaterial({
      color: 0x110826,
      roughness: 0.6,
      metalness: 0.4,
    });
    const road = new THREE.Mesh(roadGeo, roadMat);
    road.rotation.x = -Math.PI / 2;
    road.position.z = -roadLength / 2 + 10;
    scene.add(road);

    // Neon Roadside Barriers
    const barrierMat = new THREE.MeshBasicMaterial({ color: 0x7c3aed });
    const barrierGeo = new THREE.BoxGeometry(0.35, 0.6, roadLength);

    const leftBarrier = new THREE.Mesh(barrierGeo, barrierMat);
    leftBarrier.position.set(-roadWidth / 2, 0.3, road.position.z);
    scene.add(leftBarrier);

    const rightBarrier = new THREE.Mesh(barrierGeo, barrierMat);
    rightBarrier.position.set(roadWidth / 2, 0.3, road.position.z);
    scene.add(rightBarrier);

    // Lane Markers (Dashed Lines)
    const laneMarkers = [];
    const markerGeo = new THREE.PlaneGeometry(0.18, 4.5);
    const markerMat = new THREE.MeshBasicMaterial({ color: 0xc084fc, side: THREE.DoubleSide });

    for (let i = 0; i < 30; i++) {
      const zPos = -i * 8;
      // Left lane divider
      const m1 = new THREE.Mesh(markerGeo, markerMat);
      m1.rotation.x = -Math.PI / 2;
      m1.position.set(-2.4, 0.02, zPos);
      scene.add(m1);
      laneMarkers.push(m1);

      // Right lane divider
      const m2 = new THREE.Mesh(markerGeo, markerMat);
      m2.rotation.x = -Math.PI / 2;
      m2.position.set(2.4, 0.02, zPos);
      scene.add(m2);
      laneMarkers.push(m2);
    }

    // 4. Player 3D Cyber Sports Car
    const playerCar = new THREE.Group();

    // Car Body / Chassis
    const bodyGeo = new THREE.BoxGeometry(1.8, 0.65, 3.8);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      roughness: 0.2,
      metalness: 0.9,
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.55;
    playerCar.add(body);

    // Cockpit / Windshield
    const cabinGeo = new THREE.BoxGeometry(1.4, 0.5, 1.8);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x0f0728,
      roughness: 0.1,
      metalness: 0.95,
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(0, 0.95, -0.2);
    playerCar.add(cabin);

    // Spoiler
    const spoilerGeo = new THREE.BoxGeometry(1.9, 0.08, 0.4);
    const spoilerMat = new THREE.MeshStandardMaterial({ color: 0xec4899 });
    const spoiler = new THREE.Mesh(spoilerGeo, spoilerMat);
    spoiler.position.set(0, 1.05, 1.6);
    playerCar.add(spoiler);

    // Headlights
    const lightGeo = new THREE.BoxGeometry(0.35, 0.15, 0.1);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff });
    const headLeft = new THREE.Mesh(lightGeo, lightMat);
    headLeft.position.set(-0.65, 0.55, -1.91);
    playerCar.add(headLeft);

    const headRight = new THREE.Mesh(lightGeo, lightMat);
    headRight.position.set(0.65, 0.55, -1.91);
    playerCar.add(headRight);

    // Taillights
    const tailMat = new THREE.MeshBasicMaterial({ color: 0xff0055 });
    const tailLeft = new THREE.Mesh(lightGeo, tailMat);
    tailLeft.position.set(-0.65, 0.6, 1.91);
    playerCar.add(tailLeft);

    const tailRight = new THREE.Mesh(lightGeo, tailMat);
    tailRight.position.set(0.65, 0.6, 1.91);
    playerCar.add(tailRight);

    // 4 Wheels
    const wheels = [];
    const wheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.28, 16);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.7 });
    const wheelPositions = [
      [-0.95, 0.38, 1.1],
      [0.95, 0.38, 1.1],
      [-0.95, 0.38, -1.1],
      [0.95, 0.38, -1.1],
    ];

    wheelPositions.forEach(([wx, wy, wz]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.z = Math.PI / 2;
      wheel.position.set(wx, wy, wz);
      playerCar.add(wheel);
      wheels.push(wheel);
    });

    // Nitro Flame Particles
    const flameGeo = new THREE.ConeGeometry(0.2, 0.8, 12);
    const flameMat = new THREE.MeshBasicMaterial({ color: 0x00f5ff, transparent: true, opacity: 0 });
    const flameLeft = new THREE.Mesh(flameGeo, flameMat);
    flameLeft.rotation.x = -Math.PI / 2;
    flameLeft.position.set(-0.4, 0.45, 2.3);
    playerCar.add(flameLeft);

    const flameRight = new THREE.Mesh(flameGeo, flameMat);
    flameRight.rotation.x = -Math.PI / 2;
    flameRight.position.set(0.4, 0.45, 2.3);
    playerCar.add(flameRight);

    playerCar.position.set(0, 0, 0);
    scene.add(playerCar);

    // 5. Obstacle Cars Pool & Nitro Powerup Crystals
    const laneX = [-4.6, 0, 4.6];
    const obstacles = [];
    const powerups = [];

    const obstacleGeo = new THREE.BoxGeometry(1.9, 0.8, 3.8);
    const obstacleMat = new THREE.MeshStandardMaterial({
      color: 0xef4444, // Red Cyber Drone Vehicle
      roughness: 0.3,
      metalness: 0.8,
    });

    const spawnObstacle = (zOffset = -80) => {
      const mesh = new THREE.Mesh(obstacleGeo, obstacleMat);
      const lane = laneX[Math.floor(Math.random() * laneX.length)];
      mesh.position.set(lane, 0.6, zOffset);
      scene.add(mesh);
      obstacles.push({ mesh, active: true });
    };

    const powerupGeo = new THREE.OctahedronGeometry(0.65, 0);
    const powerupMat = new THREE.MeshBasicMaterial({ color: 0xfacc15, wireframe: false });

    const spawnPowerup = (zOffset = -100) => {
      const mesh = new THREE.Mesh(powerupGeo, powerupMat);
      const lane = laneX[Math.floor(Math.random() * laneX.length)];
      mesh.position.set(lane, 0.8, zOffset);
      scene.add(mesh);
      powerups.push({ mesh, active: true });
    };

    // Initial spawns
    for (let i = 1; i <= 5; i++) {
      spawnObstacle(-i * 35 - 30);
      if (i % 2 === 0) spawnPowerup(-i * 45 - 20);
    }

    // 6. Stars & Speed Dust
    const dustCount = 200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 35;
      dustPos[i * 3 + 1] = Math.random() * 12 + 0.5;
      dustPos[i * 3 + 2] = -Math.random() * 120;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({ size: 0.16, color: 0xc084fc, transparent: true, opacity: 0.6 });
    const speedDust = new THREE.Points(dustGeo, dustMat);
    scene.add(speedDust);

    // 7. Game Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let currentCarX = 0;
    let targetSpeed = 120;
    let distanceCount = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!gameActiveRef.current) {
        renderer.render(scene, camera);
        return;
      }

      const delta = clock.getDelta();

      // Nitro & Speed Dynamics
      let isBoosting = nitroActiveRef.current;
      if (isBoosting) {
        setNitroFuel((prev) => {
          if (prev <= 1) {
            nitroActiveRef.current = false;
            return 0;
          }
          return Math.max(prev - 0.45, 0);
        });
        targetSpeed = 230;
        flameMat.opacity = 0.95;
      } else {
        setNitroFuel((prev) => Math.min(prev + 0.08, 100));
        targetSpeed = 120;
        flameMat.opacity = 0;
      }

      const currentMph = targetSpeed;
      setSpeedMph(currentMph);
      const roadSpeed = (currentMph / 120) * 1.1;

      // Distance & Score Increment
      distanceCount += delta * (currentMph / 100);
      setDistanceKm(distanceCount.toFixed(2));
      scoreRef.current += Math.round(roadSpeed * 2);
      setScore(scoreRef.current);

      // Camera FOV Warp on Nitro
      const targetFov = isBoosting ? 68 : baseFov;
      camera.fov += (targetFov - camera.fov) * 0.08;
      camera.updateProjectionMatrix();

      // Move Lane Markers
      laneMarkers.forEach((m) => {
        m.position.z += roadSpeed * 0.9;
        if (m.position.z > 10) {
          m.position.z -= 240;
        }
      });

      // Steer Player Car Smoothly
      const targetLaneX = laneX[playerLaneRef.current + 1];
      currentCarX += (targetLaneX - currentCarX) * 0.14;
      playerCar.position.x = currentCarX;

      // Banking Tilt into Turns
      const turnRoll = (targetLaneX - currentCarX) * -0.06;
      playerCar.rotation.z = turnRoll;
      playerCar.rotation.y = (targetLaneX - currentCarX) * -0.04;

      // Spin Wheels
      wheels.forEach((w) => {
        w.rotation.x += roadSpeed * 0.35;
      });

      // Move Speed Dust
      const dustAttr = dustGeo.attributes.position;
      const dPositions = dustAttr.array;
      for (let i = 0; i < dustCount; i++) {
        dPositions[i * 3 + 2] += roadSpeed * 1.5;
        if (dPositions[i * 3 + 2] > 10) {
          dPositions[i * 3 + 2] = -120;
        }
      }
      dustAttr.needsUpdate = true;

      // Animate Powerups (Spin and Float)
      powerups.forEach((p) => {
        if (!p.active) return;
        p.mesh.rotation.y += 0.04;
        p.mesh.rotation.x += 0.02;
        p.mesh.position.z += roadSpeed * 0.85;

        // Collision Check with Player Car
        const dist = playerCar.position.distanceTo(p.mesh.position);
        if (dist < 1.9) {
          p.active = false;
          scene.remove(p.mesh);
          playPickupSound();
          scoreRef.current += 150;
          setScore(scoreRef.current);
          setNitroFuel((n) => Math.min(n + 35, 100));
        }

        // Recycle Powerup
        if (p.mesh.position.z > 15) {
          p.mesh.position.z = -180;
          p.mesh.position.x = laneX[Math.floor(Math.random() * laneX.length)];
          p.active = true;
          if (!p.mesh.parent) scene.add(p.mesh);
        }
      });

      // Animate & Check Obstacles
      for (let i = 0; i < obstacles.length; i++) {
        const obs = obstacles[i];
        if (!obs.active) continue;

        obs.mesh.position.z += roadSpeed * 0.75;

        // Collision Check (AABB / Distance)
        const dx = Math.abs(playerCar.position.x - obs.mesh.position.x);
        const dz = Math.abs(playerCar.position.z - obs.mesh.position.z);

        if (dx < 1.6 && dz < 3.2) {
          // CRASH DETECTED!
          gameActiveRef.current = false;
          playCrashSound();
          setIsGameOver(true);

          if (scoreRef.current > highScore) {
            setHighScore(scoreRef.current);
            localStorage.setItem("shreyas_cargame_highscore", scoreRef.current.toString());
          }
          break;
        }

        // Recycle Obstacle
        if (obs.mesh.position.z > 15) {
          obs.mesh.position.z = -160 - Math.random() * 40;
          obs.mesh.position.x = laneX[Math.floor(Math.random() * laneX.length)];
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      obstacles.forEach((o) => scene.remove(o.mesh));
      powerups.forEach((p) => scene.remove(p.mesh));
      scene.remove(playerCar);
      scene.remove(road);

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isOpen]);

  return (
    <>
      {/* 3D Car Game Floating Button */}
      <button
        className="cargame-launcher-btn"
        onClick={openGame}
        aria-label="Play 3D Cyber Highway Racer Car Game"
      >
        <span className="car-btn-emoji">🏎️</span>
        <span>Play 3D Car Racer</span>
      </button>

      {/* Fullscreen 3D Car Game Modal */}
      {isOpen && (
        <div className="cargame-overlay" role="dialog" aria-modal="true">
          {/* Top Telemetry HUD */}
          <div className="cargame-hud-header">
            <div className="cargame-branding">
              <span className="cargame-badge">3D Arcade</span>
              <h3 className="cargame-title">Cyber Highway Racer</h3>
            </div>

            <div className="cargame-telemetry-bar">
              <div className="telemetry-item">
                <span className="telemetry-label">Speed</span>
                <span className={`telemetry-value ${speedMph > 160 ? "nitro" : "cyan"}`}>
                  {speedMph} <small style={{ fontSize: "0.65rem" }}>MPH</small>
                </span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Score</span>
                <span className="telemetry-value cyan">{score}</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Nitro</span>
                <span className="telemetry-value nitro">{Math.round(nitroFuel)}%</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Distance</span>
                <span className="telemetry-value">{distanceKm} km</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">Best</span>
                <span className="telemetry-value">{highScore}</span>
              </div>
            </div>

            <button
              className="cargame-close-btn"
              onClick={closeGame}
              aria-label="Exit Game"
            >
              ✕
            </button>
          </div>

          {/* 3D WebGL Canvas */}
          <div className="cargame-canvas-area" ref={canvasRef} />

          {/* Bottom Controls */}
          <div className="cargame-bottom-controls">
            <div className="desktop-controls-hint">
              <span>Steer:</span>
              <span className="key-badge">◀ A</span>
              <span className="key-badge">▶ D</span>
              <span>Nitro Boost:</span>
              <span className="key-badge">SPACE / W</span>
            </div>

            {/* Mobile Touch Controls */}
            <div className="mobile-touch-row">
              <button
                className="touch-steer-btn"
                onClick={steerLeft}
                aria-label="Steer Left"
              >
                ◀
              </button>
              <button
                className="touch-nitro-btn"
                onPointerDown={activateNitro}
                onPointerUp={releaseNitro}
                aria-label="Nitro Boost"
              >
                🚀 NITRO
              </button>
              <button
                className="touch-steer-btn"
                onClick={steerRight}
                aria-label="Steer Right"
              >
                ▶
              </button>
            </div>
          </div>

          {/* Crash / Game Over Modal */}
          {isGameOver && (
            <div className="cargame-gameover-card">
              <div className="gameover-icon">💥</div>
              <h3 className="gameover-title">Crash on Cyber Highway!</h3>

              <div className="gameover-score-row">
                <div className="gameover-score-box">
                  <span className="gameover-score-label">Final Score</span>
                  <span className="gameover-score-num">{score}</span>
                </div>
                <div className="gameover-score-box">
                  <span className="gameover-score-label">Distance</span>
                  <span className="gameover-score-num">{distanceKm} KM</span>
                </div>
              </div>

              <div className="cargame-deal-box">
                <div className="deal-label">Client Speed Guarantee Unlocked</div>
                <div className="deal-code">TURBOSHREYAS10</div>
                <p className="deal-desc">
                  I deliver production web applications as fast as this racer! Quote this code for a <strong>10% milestone discount</strong>.
                </p>
              </div>

              <div className="cargame-actions">
                <button className="btn btn-primary btn-sm" onClick={startGame}>
                  Race Again 🏎️
                </button>
                <a
                  href={`https://wa.me/918767206376?text=Hi%20Shreyas,%20I%20raced%20on%20your%203D%20Car%20Game%20and%20scored%20${score}%20points!%20Claiming%20my%2010%25%20milestone%20discount%20code%20TURBOSHREYAS10.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp-direct btn-sm"
                >
                  Claim on WhatsApp 💬
                </a>
                <button className="btn btn-secondary btn-sm" onClick={closeGame}>
                  Back to Portfolio
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CarGame3D;
