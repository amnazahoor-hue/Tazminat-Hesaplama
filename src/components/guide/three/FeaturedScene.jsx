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
        <cylinderGeometry args={[0.42, 0.42, 0.09, 24]} />
        <meshStandardMaterial color={color} metalness={0.78} roughness={0.24} envMapIntensity={0.85} />
      </mesh>
      <mesh position={[0, 0.048, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.16, 0.3, 24]} />
        <meshStandardMaterial color="#ffffff" metalness={0.4} roughness={0.35} transparent opacity={0.32} />
      </mesh>
      {showSymbol ? (
        <Text position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.2} color="#1e1b4b" anchorX="center" anchorY="middle">
          ₺
        </Text>
      ) : null}
    </group>
  );
}

function GuideBook2026() {
  return (
    <group>
      <RoundedBox args={[0.14, 1.52, 1.08]} radius={0.03} position={[-0.56, 0, 0]} castShadow>
        <meshStandardMaterial color="#4338ca" metalness={0.42} roughness={0.48} />
      </RoundedBox>
      <RoundedBox args={[1.08, 1.52, 0.12]} radius={0.04} position={[0, 0, 0.02]} castShadow>
        <meshStandardMaterial color="#ffffff" metalness={0.08} roughness={0.62} />
      </RoundedBox>
      <RoundedBox args={[0.14, 1.52, 1.08]} radius={0.03} position={[0.56, 0, -0.02]} rotation={[0, -0.18, 0]} castShadow>
        <meshStandardMaterial color="#312e81" metalness={0.45} roughness={0.45} />
      </RoundedBox>
      <RoundedBox args={[0.72, 0.22, 0.02]} radius={0.03} position={[0, 0.48, 0.08]}>
        <meshStandardMaterial color="#c6f24e" emissive="#8fb824" emissiveIntensity={0.16} metalness={0.2} roughness={0.35} />
      </RoundedBox>
      <Text position={[0, 0.48, 0.1]} fontSize={0.16} color="#1e1b4b" anchorX="center" anchorY="middle">
        2026
      </Text>
      <Text position={[0, 0.18, 0.09]} fontSize={0.075} color="#4338ca" anchorX="center" anchorY="middle" maxWidth={0.82}>
        Tazminat Kılavuzu
      </Text>
      {[0.02, -0.1, -0.22, -0.34].map((y) => (
        <mesh key={y} position={[0, y, 0.09]}>
          <boxGeometry args={[0.72, 0.028, 0.008]} />
          <meshStandardMaterial color="#e2e8f0" />
        </mesh>
      ))}
      <Text position={[0, -0.5, 0.09]} fontSize={0.055} color="#6366f1" anchorX="center" anchorY="middle">
        İş Kanunu 4857
      </Text>
      <mesh position={[0.48, 0.08, -0.08]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.72, 0.028, 0.008]} />
        <meshStandardMaterial color="#cbd5e1" />
      </mesh>
      <mesh position={[0.48, -0.04, -0.1]} rotation={[0, -0.18, 0]}>
        <boxGeometry args={[0.62, 0.028, 0.008]} />
        <meshStandardMaterial color="#e2e8f0" />
      </mesh>
    </group>
  );
}

function MiniCalculator() {
  const keyRows = [-0.12, -0.34, -0.56];

  return (
    <group rotation={[0, 0.28, 0]}>
      <RoundedBox args={[1.02, 1.38, 0.18]} radius={0.06} castShadow>
        <meshStandardMaterial color="#312e81" metalness={0.5} roughness={0.4} envMapIntensity={0.75} />
      </RoundedBox>
      <RoundedBox args={[0.78, 0.24, 0.04]} radius={0.025} position={[0, 0.44, 0.1]}>
        <meshStandardMaterial color="#c6f24e" emissive="#8fb824" emissiveIntensity={0.24} />
      </RoundedBox>
      <Text position={[0, 0.44, 0.13]} fontSize={0.1} color="#1e1b4b" anchorX="center" anchorY="middle">
        561,000 ₺
      </Text>
      {keyRows.map((y, rowIndex) =>
        [-0.24, -0.08, 0.08, 0.24].map((x, colIndex) => (
          <RoundedBox key={`${rowIndex}-${colIndex}`} args={[0.14, 0.12, 0.03]} radius={0.02} position={[x, y, 0.1]}>
            <meshStandardMaterial color={rowIndex === 0 && colIndex === 3 ? "#c6f24e" : "#eef2ff"} metalness={0.15} roughness={0.52} />
          </RoundedBox>
        ))
      )}
    </group>
  );
}

function BalanceScale() {
  return (
    <group rotation={[0, -0.42, 0]}>
      <mesh position={[0, -0.16, 0]}>
        <cylinderGeometry args={[0.035, 0.055, 0.34, 12]} />
        <meshStandardMaterial color="#6366f1" metalness={0.58} roughness={0.36} />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.022, 0.022, 0.72, 12]} />
        <meshStandardMaterial color="#4338ca" metalness={0.62} roughness={0.32} />
      </mesh>
      <mesh position={[-0.3, 0.1, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.035, 16]} />
        <meshStandardMaterial color="#c6f24e" metalness={0.68} roughness={0.28} emissive="#8fb824" emissiveIntensity={0.08} />
      </mesh>
      <mesh position={[0.3, 0.06, 0]}>
        <cylinderGeometry args={[0.14, 0.14, 0.035, 16]} />
        <meshStandardMaterial color="#eef2ff" metalness={0.35} roughness={0.45} />
      </mesh>
    </group>
  );
}

function LegalShield() {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.42);
  shape.lineTo(0.34, 0.3);
  shape.lineTo(0.34, -0.08);
  shape.quadraticCurveTo(0, -0.42, -0.34, -0.08);
  shape.lineTo(-0.34, 0.3);
  shape.closePath();

  return (
    <group rotation={[0, 0.35, 0]}>
      <mesh castShadow>
        <extrudeGeometry args={[shape, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }]} />
        <meshStandardMaterial color="#4f46e5" metalness={0.52} roughness={0.38} emissive="#312e81" emissiveIntensity={0.06} />
      </mesh>
      <Text position={[0, 0.02, 0.06]} fontSize={0.08} color="#c6f24e" anchorX="center" anchorY="middle">
        4857
      </Text>
    </group>
  );
}

function ParallaxRig({ active, children, intensity = 0.18 }) {
  const group = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!active || !group.current) return;
    target.current.x = THREE.MathUtils.lerp(target.current.x, state.pointer.x * intensity, 0.06);
    target.current.y = THREE.MathUtils.lerp(target.current.y, state.pointer.y * intensity, 0.06);
    group.current.rotation.y = target.current.x + delta * 0.04;
    group.current.rotation.x = -target.current.y * 0.24;
  });

  return <group ref={group}>{children}</group>;
}

function FeaturedSceneContent({ active }) {
  return (
    <>
      <color attach="background" args={["#f3f0ff"]} />
      <ambientLight intensity={0.68} />
      <directionalLight position={[5, 5, 6]} intensity={1.05} castShadow />
      <directionalLight position={[-4, 2, 4]} intensity={0.5} color="#c6f24e" />
      <pointLight position={[0, 1.8, 3]} intensity={0.32} color="#7c3aed" />
      <spotLight position={[2, 4, 5]} angle={0.35} penumbra={0.6} intensity={0.35} color="#ffffff" castShadow />
      <Environment preset="city" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.92, 0]} receiveShadow>
        <circleGeometry args={[2.1, 40]} />
        <meshStandardMaterial color="#eef2ff" transparent opacity={0.62} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.91, 0]}>
        <ringGeometry args={[0.72, 1.05, 48]} />
        <meshStandardMaterial color="#7c3aed" transparent opacity={0.14} />
      </mesh>
      <ParallaxRig active={active}>
        <Float speed={0.92} rotationIntensity={0.1} floatIntensity={0.24}>
          <group position={[0, -0.02, 0]}>
            <GuideBook2026 />
          </group>
        </Float>
        <Float speed={1.08} rotationIntensity={0.14} floatIntensity={0.3}>
          <group position={[-1.18, -0.08, 0.12]}>
            <MiniCalculator />
          </group>
        </Float>
        <Float speed={1.12} rotationIntensity={0.16} floatIntensity={0.32}>
          <group position={[1.12, 0.02, -0.08]}>
            <BalanceScale />
          </group>
        </Float>
        <Float speed={1.05} rotationIntensity={0.12} floatIntensity={0.28}>
          <group position={[0.95, 0.72, 0.05]} scale={0.82}>
            <LegalShield />
          </group>
        </Float>
        <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.34}>
          <group position={[-0.95, -0.62, 0.18]}>
            <LiraCoin position={[0, 0.16, 0]} color="#6366f1" />
            <LiraCoin position={[0, 0.08, 0]} color="#4338ca" />
            <LiraCoin position={[0, 0, 0]} color="#c6f24e" showSymbol />
          </group>
        </Float>
        <Float speed={1.25} rotationIntensity={0.2} floatIntensity={0.36}>
          <LiraCoin position={[-0.18, 0.82, -0.12]} rotation={[0.45, -0.35, 0.12]} scale={0.72} color="#b6e23a" showSymbol />
        </Float>
      </ParallaxRig>
    </>
  );
}

export default function FeaturedScene({ active = true }) {
  return (
    <Canvas
      className="guide-scene-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.22, 4.8], fov: 38 }}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
      shadows="percentage"
    >
      <FeaturedSceneContent active={active} />
    </Canvas>
  );
}
