"use client";

import "./threeCompat";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

const FACTOR_NODES = [
  { label: "Süre", angle: 0, color: "#6366f1", height: 0.55, type: "clock" },
  { label: "Brüt", angle: Math.PI * 0.4, color: "#c6f24e", height: 0.62, type: "coin" },
  { label: "Bonus", angle: Math.PI * 0.8, color: "#7c3aed", height: 0.48, type: "chart" },
  { label: "Fayda", angle: Math.PI * 1.2, color: "#4f46e5", height: 0.52, type: "case" },
  { label: "Fesih", angle: Math.PI * 1.6, color: "#f87171", height: 0.45, type: "alert" }
];

function MiniClock() {
  return (
    <group scale={0.55}>
      <mesh>
        <cylinderGeometry args={[0.34, 0.34, 0.08, 24]} />
        <meshStandardMaterial color="#6366f1" metalness={0.55} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.045, 0]}>
        <torusGeometry args={[0.28, 0.03, 8, 24]} />
        <meshStandardMaterial color="#eef2ff" metalness={0.3} roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.05, 0.12]} rotation={[0.35, 0, 0]}>
        <boxGeometry args={[0.02, 0.14, 0.01]} />
        <meshStandardMaterial color="#4338ca" />
      </mesh>
      <mesh position={[0, 0.05, 0.08]} rotation={[0, 0, -0.8]}>
        <boxGeometry args={[0.02, 0.1, 0.01]} />
        <meshStandardMaterial color="#4338ca" />
      </mesh>
    </group>
  );
}

function MiniCoin() {
  return (
    <group scale={0.55}>
      <mesh castShadow>
        <cylinderGeometry args={[0.34, 0.34, 0.08, 24]} />
        <meshStandardMaterial color="#c6f24e" metalness={0.78} roughness={0.24} />
      </mesh>
      <Text position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.18} color="#1e1b4b" anchorX="center" anchorY="middle">
        ₺
      </Text>
    </group>
  );
}

function MiniChart() {
  const bars = [0.12, 0.2, 0.28];
  return (
    <group scale={0.55}>
      <RoundedBox args={[0.62, 0.48, 0.04]} radius={0.03}>
        <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.6} />
      </RoundedBox>
      {bars.map((h, i) => (
        <mesh key={h} position={[-0.14 + i * 0.14, -0.08 + h / 2, 0.03]}>
          <boxGeometry args={[0.08, h, 0.02]} />
          <meshStandardMaterial color={i === 2 ? "#c6f24e" : "#7c3aed"} emissive={i === 2 ? "#8fb824" : "#5b21b6"} emissiveIntensity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

function MiniCase() {
  return (
    <group scale={0.55}>
      <RoundedBox args={[0.52, 0.36, 0.14]} radius={0.04} castShadow>
        <meshStandardMaterial color="#4f46e5" metalness={0.45} roughness={0.38} />
      </RoundedBox>
      <mesh position={[0, 0.12, 0]}>
        <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#c6f24e" metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
}

function MiniAlert() {
  return (
    <group scale={0.55}>
      <mesh rotation={[0, 0, Math.PI]}>
        <coneGeometry args={[0.28, 0.48, 3]} />
        <meshStandardMaterial color="#f87171" metalness={0.35} roughness={0.42} emissive="#ef4444" emissiveIntensity={0.08} />
      </mesh>
      <Text position={[0, -0.02, 0.16]} fontSize={0.16} color="#ffffff" anchorX="center" anchorY="middle">
        !
      </Text>
    </group>
  );
}

const MINI_MODELS = {
  clock: MiniClock,
  coin: MiniCoin,
  chart: MiniChart,
  case: MiniCase,
  alert: MiniAlert
};

function FactorNode({ position, color, label, type }) {
  const Model = MINI_MODELS[type] ?? MiniCoin;

  return (
    <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.34}>
      <group position={position}>
        <mesh position={[0, -0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.28, 24]} />
          <meshStandardMaterial color={color} transparent opacity={0.14} />
        </mesh>
        <Model />
        <Text position={[0, -0.42, 0]} fontSize={0.08} color="#64748b" anchorX="center" anchorY="middle">
          {label}
        </Text>
      </group>
    </Float>
  );
}

function RadarPlane() {
  const shape = new THREE.Shape();
  FACTOR_NODES.forEach((node, index) => {
    const x = Math.cos(node.angle) * 0.72;
    const y = Math.sin(node.angle) * 0.72;
    if (index === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  });
  shape.closePath();

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]} receiveShadow>
      <shapeGeometry args={[shape]} />
      <meshStandardMaterial color="#7c3aed" transparent opacity={0.16} metalness={0.2} roughness={0.6} side={THREE.DoubleSide} />
    </mesh>
  );
}

function FactorRing({ active }) {
  const group = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!active || !group.current) return;
    pointer.current.x = THREE.MathUtils.lerp(pointer.current.x, state.pointer.x * 0.14, 0.05);
    pointer.current.y = THREE.MathUtils.lerp(pointer.current.y, state.pointer.y * 0.1, 0.05);
    group.current.rotation.y += delta * 0.08;
    group.current.rotation.x = -pointer.current.y * 0.18;
  });

  return (
    <group ref={group}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
        <torusGeometry args={[1.05, 0.018, 8, 64]} />
        <meshStandardMaterial color="#4f46e5" transparent opacity={0.35} />
      </mesh>

      {FACTOR_NODES.map((node) => {
        const x = Math.cos(node.angle) * 1.05;
        const z = Math.sin(node.angle) * 1.05;
        return (
          <FactorNode
            key={node.label}
            position={[x, node.height, z]}
            color={node.color}
            label={node.label}
            type={node.type}
          />
        );
      })}

      <Float speed={0.85} rotationIntensity={0.08} floatIntensity={0.22}>
        <group position={[0, 0.15, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.34, 20, 20]} />
            <meshStandardMaterial color="#eef2ff" metalness={0.25} roughness={0.45} />
          </mesh>
          <mesh position={[0, 0, 0.36]}>
            <torusGeometry args={[0.42, 0.04, 10, 32]} />
            <meshStandardMaterial color="#c6f24e" metalness={0.65} roughness={0.28} emissive="#8fb824" emissiveIntensity={0.12} />
          </mesh>
          <Text position={[0, 0, 0.42]} fontSize={0.11} color="#4338ca" anchorX="center" anchorY="middle">
            Tazminat
          </Text>
        </group>
      </Float>

      <RadarPlane />

      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
        <RoundedBox args={[0.55, 0.38, 0.06]} radius={0.03} position={[0, -0.72, 0.55]} rotation={[0.2, 0.35, 0]}>
          <meshStandardMaterial color="#ffffff" metalness={0.12} roughness={0.55} />
        </RoundedBox>
      </Float>
      <Text position={[0, -0.68, 0.62]} rotation={[0.2, 0.35, 0]} fontSize={0.06} color="#4338ca" anchorX="center" anchorY="middle">
        Brüt × Süre
      </Text>
    </group>
  );
}

function FactorsSceneContent({ active }) {
  return (
    <>
      <color attach="background" args={["#f8f9ff"]} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-4, 2, 3]} intensity={0.42} color="#c6f24e" />
      <pointLight position={[0, 2, 2]} intensity={0.25} color="#7c3aed" />
      <Environment preset="city" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.72, 0]} receiveShadow>
        <circleGeometry args={[1.8, 40]} />
        <meshStandardMaterial color="#eef2ff" transparent opacity={0.55} />
      </mesh>
      <FactorRing active={active} />
    </>
  );
}

export default function FactorsScene({ active = true }) {
  return (
    <Canvas
      className="guide-scene-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.2, 3.8], fov: 42 }}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
      shadows="percentage"
    >
      <FactorsSceneContent active={active} />
    </Canvas>
  );
}
