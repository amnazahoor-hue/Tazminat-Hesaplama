"use client";

import "./threeCompat";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox, Text } from "@react-three/drei";
import * as THREE from "three";

function LiraCoin({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = "#c6f24e", showSymbol = false }) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[0.46, 0.46, 0.1, 24]} />
        <meshStandardMaterial color={color} metalness={0.78} roughness={0.24} envMapIntensity={0.8} />
      </mesh>
      <mesh position={[0, 0.052, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.18, 0.34, 24]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.35} transparent opacity={0.35} />
      </mesh>
      {showSymbol ? (
        <Text position={[0, 0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.22} color="#1e1b4b" anchorX="center" anchorY="middle">
          ₺
        </Text>
      ) : null}
    </group>
  );
}

function CoinStack({ position = [0, 0, 0] }) {
  return (
    <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.34}>
      <group position={position}>
        <LiraCoin position={[0, 0, 0]} color="#4338ca" />
        <LiraCoin position={[0, 0.09, 0]} color="#6366f1" />
        <LiraCoin position={[0, 0.18, 0]} color="#c6f24e" showSymbol />
      </group>
    </Float>
  );
}

function PaySlipDocument({ position = [0, 0, 0], rotation = [0, 0.35, 0] }) {
  return (
    <Float speed={1.25} rotationIntensity={0.14} floatIntensity={0.32}>
      <group position={position} rotation={rotation}>
        <RoundedBox args={[1.35, 1.75, 0.05]} radius={0.04} castShadow>
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.62} />
        </RoundedBox>
        <Text position={[-0.42, 0.58, 0.04]} fontSize={0.11} color="#4f46e5" anchorX="left" anchorY="middle" maxWidth={1}>
          Tazminat Hesabı
        </Text>
        <RoundedBox args={[0.34, 0.12, 0.02]} radius={0.02} position={[-0.28, 0.34, 0.04]}>
          <meshStandardMaterial color="#c6f24e" emissive="#8fb824" emissiveIntensity={0.12} />
        </RoundedBox>
        {[0.12, -0.1, -0.32].map((y, index) => (
          <mesh key={y} position={[0, y, 0.04]}>
            <boxGeometry args={[0.95, 0.035, 0.01]} />
            <meshStandardMaterial color={index === 0 ? "#cbd5e1" : "#e2e8f0"} />
          </mesh>
        ))}
        <Text position={[0, -0.52, 0.04]} fontSize={0.08} color="#4338ca" anchorX="center" anchorY="middle">
          İş Kanunu 4857
        </Text>
      </group>
    </Float>
  );
}

function BalanceScale({ position = [0, 0, 0] }) {
  return (
    <Float speed={1.1} rotationIntensity={0.16} floatIntensity={0.3}>
      <group position={position} rotation={[0, 0.35, 0]}>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.42, 12]} />
          <meshStandardMaterial color="#6366f1" metalness={0.55} roughness={0.38} />
        </mesh>
        <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.025, 0.025, 0.9, 12]} />
          <meshStandardMaterial color="#4338ca" metalness={0.6} roughness={0.35} />
        </mesh>
        <mesh position={[-0.38, 0.12, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 18]} />
          <meshStandardMaterial color="#c6f24e" metalness={0.65} roughness={0.3} />
        </mesh>
        <mesh position={[0.38, 0.08, 0]}>
          <cylinderGeometry args={[0.18, 0.18, 0.04, 18]} />
          <meshStandardMaterial color="#eef2ff" metalness={0.35} roughness={0.45} />
        </mesh>
      </group>
    </Float>
  );
}

function CalculatorModel({ position = [0, 0, 0] }) {
  const keyRows = [-0.15, -0.45, -0.75];

  return (
    <Float speed={0.95} rotationIntensity={0.1} floatIntensity={0.28}>
      <group position={position} rotation={[0, -0.22, 0]}>
        <RoundedBox args={[1.55, 2.05, 0.24]} radius={0.08} castShadow receiveShadow>
          <meshStandardMaterial color="#312e81" metalness={0.48} roughness={0.42} envMapIntensity={0.7} />
        </RoundedBox>
        <RoundedBox args={[1.22, 0.38, 0.05]} radius={0.03} position={[0, 0.68, 0.14]}>
          <meshStandardMaterial color="#c6f24e" emissive="#8fb824" emissiveIntensity={0.22} metalness={0.25} roughness={0.35} />
        </RoundedBox>
        <Text position={[0, 0.68, 0.18]} fontSize={0.14} color="#1e1b4b" anchorX="center" anchorY="middle">
          561,000 ₺
        </Text>
        {keyRows.map((y, rowIndex) =>
          [-0.36, -0.12, 0.12, 0.36].map((x, colIndex) => (
            <RoundedBox key={`${rowIndex}-${colIndex}`} args={[0.22, 0.18, 0.04]} radius={0.03} position={[x, y, 0.14]}>
              <meshStandardMaterial
                color={rowIndex === 0 && colIndex === 3 ? "#c6f24e" : "#eef2ff"}
                metalness={0.18}
                roughness={0.5}
              />
            </RoundedBox>
          ))
        )}
      </group>
    </Float>
  );
}

function ParallaxRig({ active, children, intensity = 0.2 }) {
  const group = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!active || !group.current) return;
    target.current.x = THREE.MathUtils.lerp(target.current.x, state.pointer.x * intensity, 0.06);
    target.current.y = THREE.MathUtils.lerp(target.current.y, state.pointer.y * intensity, 0.06);
    group.current.rotation.y = target.current.x;
    group.current.rotation.x = -target.current.y * 0.28;
  });

  return <group ref={group}>{children}</group>;
}

function IntroSceneContent({ active }) {
  return (
    <>
      <color attach="background" args={["#f8f9ff"]} />
      <ambientLight intensity={0.72} />
      <directionalLight position={[4, 5, 6]} intensity={1} castShadow />
      <directionalLight position={[-3, 1, 4]} intensity={0.45} color="#7c3aed" />
      <pointLight position={[2, 2, 4]} intensity={0.35} color="#c6f24e" />
      <Environment preset="city" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.35, 0]} receiveShadow>
        <circleGeometry args={[2.4, 32]} />
        <meshStandardMaterial color="#eef2ff" transparent opacity={0.55} />
      </mesh>
      <ParallaxRig active={active}>
        <CalculatorModel position={[0.02, -0.02, 0]} />
        <PaySlipDocument position={[-1.38, 0.12, -0.35]} rotation={[0, 0.48, -0.06]} />
        <CoinStack position={[1.32, -0.58, 0.08]} />
        <BalanceScale position={[1.05, 0.78, -0.12]} />
        <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.36}>
          <LiraCoin position={[-0.95, 0.82, 0.05]} rotation={[0.5, -0.4, 0.15]} scale={0.78} color="#b6e23a" showSymbol />
        </Float>
      </ParallaxRig>
    </>
  );
}

export default function IntroScene({ active = true }) {
  return (
    <Canvas
      className="guide-scene-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.15, 5.6], fov: 36 }}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
      shadows="percentage"
    >
      <IntroSceneContent active={active} />
    </Canvas>
  );
}
