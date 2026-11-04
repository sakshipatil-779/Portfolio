"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { BootSequence } from "./BootSequence";
import { Html } from "@react-three/drei";

interface LaptopModelProps {
  progress: number;
}

function ProceduralLaptop({ progress }: LaptopModelProps) {
  const lidGroupRef = useRef<THREE.Group>(null);
  const screenLightRef = useRef<THREE.PointLight>(null);

  // Maximum opening angle is ~108 degrees (1.88 radians)
  // Lid opens between progress 0.0 and 0.50
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
        // Spacebar row
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
      {/* Main Bottom Aluminum Body */}
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
        {/* Lid Aluminum Shell (offset relative to pivot) */}
        <mesh
          material={aluminumMaterial}
          position={[0, 0.035, 1.1]}
          castShadow
        >
          <boxGeometry args={[3.4, 0.05, 2.3]} />
        </mesh>

        {/* Screen Bezel (Inner matte frame) */}
        <mesh material={bezelMaterial} position={[0, 0.015, 1.1]}>
          <boxGeometry args={[3.3, 0.005, 2.2]} />
        </mesh>

        {/* Web Camera Lens */}
        <mesh material={darkAccentMaterial} position={[0, 0.019, 2.15]}>
          <cylinderGeometry args={[0.015, 0.015, 0.002, 16]} />
        </mesh>

        {/* Screen Display Face with HTML Boot / Desktop Content */}
        <group position={[0, 0.019, 1.08]}>
          <Html
            transform
            distanceFactor={1.5}
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            style={{
              width: "480px",
              height: "310px",
              pointerEvents: "none",
            }}
          >
            <BootSequence progress={progress} />
          </Html>
        </group>

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

