"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface LaptopModelProps {
  progress: number;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function renderBootCanvas(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  progress: number
) {
  // Clear background
  ctx.fillStyle = "#05070A";
  ctx.fillRect(0, 0, width, height);

  const isPowerOn = progress > 0.12;
  if (!isPowerOn) return;

  // Background radial ambient glow
  const grad = ctx.createRadialGradient(
    width / 2,
    height / 2,
    20,
    width / 2,
    height / 2,
    width / 1.6
  );
  grad.addColorStop(0, "rgba(105, 229, 220, 0.18)");
  grad.addColorStop(0.65, "rgba(13, 17, 24, 0.85)");
  grad.addColorStop(1, "#05070A");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, width, height);

  // Top system bar
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(0, 48, width, 1);

  ctx.fillStyle = "#69E5DC";
  ctx.beginPath();
  ctx.arc(36, 28, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.font = "bold 15px ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "rgba(160, 170, 184, 0.85)";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("SP_OS v28.1", 52, 28);

  ctx.textAlign = "right";
  ctx.fillText("ETH_NET   FLOWER_FED   100%", width - 36, 28);

  const showBootLogo = progress >= 0.22 && progress < 0.6;
  const showWelcome = progress >= 0.58;
  const bootPercent = Math.min(
    100,
    Math.max(0, Math.round(((progress - 0.22) / (0.58 - 0.22)) * 100))
  );

  if (showBootLogo) {
    const cx = width / 2;
    const cy = height / 2 - 20;

    // Outer Monogram Box
    ctx.save();
    ctx.shadowColor = "rgba(105, 229, 220, 0.45)";
    ctx.shadowBlur = 30;
    ctx.fillStyle = "#0D1118";
    ctx.strokeStyle = "rgba(105, 229, 220, 0.65)";
    ctx.lineWidth = 3;
    const boxSize = 130;
    roundRect(ctx, cx - boxSize / 2, cy - boxSize / 2 - 30, boxSize, boxSize, 24);
    ctx.fill();
    ctx.stroke();
    ctx.restore();

    // Monogram text: SP.
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "900 56px ui-monospace, SFMono-Regular, monospace";
    ctx.fillStyle = "#69E5DC";
    ctx.fillText("SP.", cx, cy - 30);

    // Progress bar
    const barW = 340;
    const barH = 10;
    const barX = cx - barW / 2;
    const barY = cy + 85;

    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    roundRect(ctx, barX, barY, barW, barH, 5);
    ctx.fill();

    // Progress fill
    const fillW = Math.max(8, (bootPercent / 100) * barW);
    const pGrad = ctx.createLinearGradient(barX, barY, barX + barW, barY);
    pGrad.addColorStop(0, "#69E5DC");
    pGrad.addColorStop(1, "#8B9CFF");
    ctx.fillStyle = pGrad;
    roundRect(ctx, barX, barY, fillW, barH, 5);
    ctx.fill();

    // Text status
    ctx.font = "bold 14px ui-monospace, SFMono-Regular, monospace";
    ctx.fillStyle = "#A0AAB8";
    ctx.textAlign = "left";
    ctx.fillText("INITIALIZING SYSTEM...", barX, barY + 28);
    ctx.textAlign = "right";
    ctx.fillText(`${bootPercent}%`, barX + barW, barY + 28);
  }

  if (showWelcome) {
    const cx = width / 2;

    // Pill badge: SYSTEM ONLINE
    ctx.save();
    ctx.fillStyle = "rgba(105, 229, 220, 0.12)";
    ctx.strokeStyle = "rgba(105, 229, 220, 0.35)";
    ctx.lineWidth = 1.5;
    const pillW = 190;
    const pillH = 34;
    roundRect(ctx, cx - pillW / 2, 175, pillW, pillH, 17);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "#69E5DC";
    ctx.beginPath();
    ctx.arc(cx - pillW / 2 + 20, 192, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 13px ui-monospace, SFMono-Regular, monospace";
    ctx.fillStyle = "#69E5DC";
    ctx.fillText("SYSTEM ONLINE", cx + 8, 192);
    ctx.restore();

    // WELCOME TO
    ctx.textAlign = "center";
    ctx.textBaseline = "alphabetic";
    ctx.font = "bold 20px ui-monospace, SFMono-Regular, monospace";
    ctx.fillStyle = "#A0AAB8";
    ctx.fillText("WELCOME TO", cx, 275);

    // SAKSHI'S WORLD.
    const titleGrad = ctx.createLinearGradient(cx - 240, 0, cx + 240, 0);
    titleGrad.addColorStop(0, "#FFFFFF");
    titleGrad.addColorStop(0.7, "#F5F7FA");
    titleGrad.addColorStop(1, "#69E5DC");
    ctx.font = "900 58px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = titleGrad;
    ctx.fillText("SAKSHI'S WORLD.", cx, 350);

    // Supporting tagline
    ctx.font = "500 20px system-ui, -apple-system, sans-serif";
    ctx.fillStyle = "#A0AAB8";
    ctx.fillText(
      "Computer Engineer | Full-Stack Developer | Technology Enthusiast",
      cx,
      410
    );
  }

  // Bottom footer status
  ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
  ctx.fillRect(0, height - 48, width, 1);

  ctx.font = "bold 14px ui-monospace, SFMono-Regular, monospace";
  ctx.fillStyle = "rgba(160, 170, 184, 0.55)";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("MET'S IOE NASHIK", 36, height - 24);
  ctx.textAlign = "right";
  ctx.fillText("CLASS OF 2028", width - 36, height - 24);

  // Subtle scanline overlay
  ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
  for (let y = 0; y < height; y += 4) {
    ctx.fillRect(0, y, width, 1);
  }
}

function LaptopScreen({
  progress,
  backlightIntensity,
}: {
  progress: number;
  backlightIntensity: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 660;
    canvasRef.current = canvas;
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    textureRef.current = tex;
    return tex;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const tex = textureRef.current;
    if (!canvas || !tex) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    renderBootCanvas(ctx, canvas.width, canvas.height, progress);
    tex.needsUpdate = true;
  }, [progress]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  if (!texture) return null;

  return (
    <mesh position={[0, 0.021, 1.08]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[3.12, 1.98]} />
      <meshStandardMaterial
        map={texture}
        emissive="#ffffff"
        emissiveMap={texture}
        emissiveIntensity={Math.max(0.05, backlightIntensity * 0.9)}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

function ProceduralLaptop({ progress }: LaptopModelProps) {
  const lidGroupRef = useRef<THREE.Group>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);

  // Maximum opening angle is ~108 degrees (1.88 radians)
  const openProgress = Math.min(1, Math.max(0, progress / 0.5));
  const targetLidAngle = THREE.MathUtils.lerp(0.005, 1.88, openProgress);

  // Screen backlight brightness
  const backlightIntensity = THREE.MathUtils.lerp(
    0,
    2.5,
    Math.min(1, Math.max(0, (progress - 0.12) / 0.4))
  );

  useFrame(() => {
    if (lidGroupRef.current) {
      lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(
        lidGroupRef.current.rotation.x,
        targetLidAngle,
        0.15
      );
    }
    if (screenLightRef.current) {
      screenLightRef.current.intensity = THREE.MathUtils.lerp(
        screenLightRef.current.intensity,
        backlightIntensity,
        0.15
      );
    }
  });

  // Aluminum material definitions
  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#1e2229"),
        metalness: 0.88,
        roughness: 0.28,
      }),
    []
  );

  const darkAccentMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#111317"),
        metalness: 0.7,
        roughness: 0.45,
      }),
    []
  );

  const keycapMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#0c0e12"),
        metalness: 0.3,
        roughness: 0.65,
      }),
    []
  );

  const bezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#06080a"),
        metalness: 0.1,
        roughness: 0.9,
      }),
    []
  );

  // Keyboard layout key generation
  const keycaps = useMemo(() => {
    const keys: { pos: [number, number, number]; size: [number, number, number] }[] = [];
    const rows = 5;
    const cols = 14;
    const startX = -1.25;
    const startZ = -0.75;
    const stepX = 2.5 / (cols - 1);
    const stepZ = 0.95 / (rows - 1);

    for (let r = 0; r < rows; r++) {
      if (r === rows - 1) {
        keys.push({ pos: [0, 0.045, startZ + r * stepZ], size: [1.1, 0.015, 0.16] });
        keys.push({ pos: [-0.9, 0.045, startZ + r * stepZ], size: [0.4, 0.015, 0.16] });
        keys.push({ pos: [0.9, 0.045, startZ + r * stepZ], size: [0.4, 0.015, 0.16] });
        continue;
      }
      for (let c = 0; c < cols; c++) {
        keys.push({
          pos: [startX + c * stepX, 0.045, startZ + r * stepZ],
          size: [0.15, 0.015, 0.16],
        });
      }
    }
    return keys;
  }, []);

  return (
    <group position={[0, -0.65, 0]}>
      {/* ================= BASE CHASSIS ================= */}
      <mesh
        material={aluminumMaterial}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3.4, 0.08, 2.3]} />
      </mesh>

      {/* Keyboard Recessed Well */}
      <mesh material={darkAccentMaterial} position={[0, 0.041, -0.3]}>
        <boxGeometry args={[2.8, 0.005, 1.25]} />
      </mesh>

      {/* Detailed Keys */}
      {keycaps.map((k, i) => (
        <mesh key={i} material={keycapMaterial} position={k.pos}>
          <boxGeometry args={k.size} />
        </mesh>
      ))}

      {/* Precision Trackpad */}
      <mesh material={darkAccentMaterial} position={[0, 0.042, 0.62]}>
        <boxGeometry args={[1.1, 0.003, 0.7]} />
      </mesh>

      {/* Front Thumb Notch */}
      <mesh material={darkAccentMaterial} position={[0, 0.035, 1.14]}>
        <boxGeometry args={[0.4, 0.02, 0.03]} />
      </mesh>

      {/* Rubber feet underneath */}
      <mesh material={darkAccentMaterial} position={[-1.4, -0.045, -0.85]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
      </mesh>
      <mesh material={darkAccentMaterial} position={[1.4, -0.045, -0.85]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
      </mesh>
      <mesh material={darkAccentMaterial} position={[-1.4, -0.045, 0.85]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
      </mesh>
      <mesh material={darkAccentMaterial} position={[1.4, -0.045, 0.85]}>
        <cylinderGeometry args={[0.08, 0.08, 0.02, 16]} />
      </mesh>

      {/* ================= HINGE ================= */}
      <mesh
        material={darkAccentMaterial}
        position={[0, 0.045, -1.1]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <cylinderGeometry args={[0.04, 0.04, 3.2, 24]} />
      </mesh>

      {/* ================= ROTATING LID ASSEMBLY ================= */}
      <group ref={lidGroupRef} position={[0, 0.045, -1.1]}>
        {/* Lid Aluminum Shell */}
        <mesh
          material={aluminumMaterial}
          position={[0, 0.035, 1.1]}
          castShadow
        >
          <boxGeometry args={[3.4, 0.05, 2.3]} />
        </mesh>

        {/* Screen Bezel */}
        <mesh material={bezelMaterial} position={[0, 0.015, 1.1]}>
          <boxGeometry args={[3.3, 0.005, 2.2]} />
        </mesh>

        {/* Web Camera Lens */}
        <mesh material={darkAccentMaterial} position={[0, 0.019, 2.15]}>
          <cylinderGeometry args={[0.015, 0.015, 0.002, 16]} />
        </mesh>

        {/* Pure WebGL Dynamic Canvas Texture Screen */}
        <LaptopScreen
          progress={progress}
          backlightIntensity={backlightIntensity}
        />

        {/* Dynamic Screen Backlight Illuminating Keyboard & Space */}
        <pointLight
          ref={screenLightRef}
          color="#69E5DC"
          intensity={0}
          distance={4.5}
          decay={2}
          position={[0, 0.3, 1.1]}
        />
      </group>

      {/* Ground Contact Shadow Plane */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[7, 7]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </group>
  );
}

export function LaptopScene({ progress }: { progress: number }) {
  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [0, 0.95, 3.8], fov: 42 }}
        shadows
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
      >
        {/* Studio Lighting */}
        <color attach="background" args={["#07090D"]} />
        <ambientLight intensity={0.65} />

        {/* Key Light from top-front */}
        <directionalLight
          position={[2, 5, 4]}
          intensity={1.4}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Fill Light from left */}
        <directionalLight position={[-4, 3, 2]} intensity={0.6} color="#8B9CFF" />

        {/* Rim / Hairline Accent Light from behind */}
        <directionalLight position={[0, 4, -5]} intensity={1.5} color="#69E5DC" />

        {/* Bottom soft ground bounce */}
        <directionalLight position={[0, -2, 2]} intensity={0.2} color="#121923" />

        {/* Laptop Procedural 3D Model */}
        <ProceduralLaptop progress={progress} />
      </Canvas>
    </div>
  );
}
