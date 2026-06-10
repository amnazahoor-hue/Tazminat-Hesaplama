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
        <cylinderGeometry args={[0.4, 0.4, 0.09, 24]} />
        <meshStandardMaterial color={color} metalness={0.78} roughness={0.24} envMapIntensity={0.85} />
      </mesh>
      {showSymbol ? (
        <Text position={[0, 0.055, 0]} rotation={[-Math.PI / 2, 0, 0]} fontSize={0.18} color="#1a2e05" anchorX="center" anchorY="middle">
          ₺
        </Text>
      ) : null}
    </group>
  );
}

function WorkflowColumn() {
  const nodes = [
    { y: 0.95, color: "#c6f24e", symbol: "₺", type: "coin" },
    { y: 0.45, color: "#6366f1", type: "clock" },
    { y: -0.05, color: "#7c3aed", symbol: "×", type: "op" },
    { y: -0.55, color: "#4f46e5", symbol: "+", type: "op" },
    { y: -1.05, color: "#b6e23a", symbol: "✓", type: "total" }
  ];

  return (
    <group position={[1.05, 0.08, 0]}>
      <mesh position={[0, 0, -0.02]}>
        <cylinderGeometry args={[0.018, 0.018, 2.15, 12]} />
        <meshStandardMaterial color="#c6f24e" transparent opacity={0.35} emissive="#8fb824" emissiveIntensity={0.06} />
      </mesh>
      {nodes.map((node) => (
        <Float key={node.y} speed={1.05} rotationIntensity={0.12} floatIntensity={0.26}>
          <group position={[0, node.y, 0]}>
            {node.type === "clock" ? (
              <group scale={0.42}>
                <mesh>
                  <cylinderGeometry args={[0.34, 0.34, 0.08, 24]} />
                  <meshStandardMaterial color={node.color} metalness={0.55} roughness={0.35} />
                </mesh>
                <mesh position={[0, 0.05, 0.12]} rotation={[0.35, 0, 0]}>
                  <boxGeometry args={[0.02, 0.14, 0.01]} />
                  <meshStandardMaterial color="#4338ca" />
                </mesh>
              </group>
            ) : (
              <mesh castShadow>
                <sphereGeometry args={[node.type === "total" ? 0.2 : 0.16, 20, 20]} />
                <meshStandardMaterial color={node.color} metalness={0.58} roughness={0.3} emissive={node.color} emissiveIntensity={0.1} />
              </mesh>
            )}
            {node.symbol ? (
              <Text position={[0, 0, 0.18]} fontSize={0.08} color={node.type === "total" ? "#1a2e05" : "#ffffff"} anchorX="center" anchorY="middle">
                {node.symbol}
              </Text>
            ) : null}
          </group>
        </Float>
      ))}
    </group>
  );
}

function StepsCalculator() {
  const keyRows = [-0.12, -0.38, -0.64];

  return (
    <group rotation={[0, -0.28, 0]}>
      <RoundedBox args={[1.15, 1.55, 0.18]} radius={0.06} castShadow receiveShadow>
        <meshStandardMaterial color="#312e81" metalness={0.5} roughness={0.4} envMapIntensity={0.78} />
      </RoundedBox>
      <RoundedBox args={[0.88, 0.28, 0.04]} radius={0.03} position={[0, 0.48, 0.1]}>
        <meshStandardMaterial color="#c6f24e" emissive="#8fb824" emissiveIntensity={0.24} />
      </RoundedBox>
      <Text position={[0, 0.48, 0.13]} fontSize={0.11} color="#1a2e05" anchorX="center" anchorY="middle">
        561,000 ₺
      </Text>
      {keyRows.map((y, rowIndex) =>
        [-0.28, -0.09, 0.1, 0.29].map((x, colIndex) => (
          <RoundedBox key={`${rowIndex}-${colIndex}`} args={[0.18, 0.14, 0.03]} radius={0.02} position={[x, y, 0.1]}>
            <meshStandardMaterial color={rowIndex === 0 && colIndex === 3 ? "#c6f24e" : "#eef2ff"} metalness={0.15} roughness={0.52} />
          </RoundedBox>
        ))
      )}
    </group>
  );
}

function PaySlip4857() {
  return (
    <Float speed={1.15} rotationIntensity={0.14} floatIntensity={0.3}>
      <group position={[-1.15, 0.35, -0.2]} rotation={[0, 0.45, -0.05]}>
        <RoundedBox args={[0.72, 0.95, 0.04]} radius={0.03} castShadow>
          <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.62} />
        </RoundedBox>
        <RoundedBox args={[0.22, 0.08, 0.015]} radius={0.015} position={[-0.12, 0.22, 0.025]}>
          <meshStandardMaterial color="#c6f24e" emissive="#8fb824" emissiveIntensity={0.1} />
        </RoundedBox>
        {[0.06, -0.08, -0.22].map((y) => (
          <mesh key={y} position={[0, y, 0.025]}>
            <boxGeometry args={[0.5, 0.025, 0.008]} />
            <meshStandardMaterial color="#e2e8f0" />
          </mesh>
        ))}
        <Text position={[0, -0.3, 0.025]} fontSize={0.06} color="#4338ca" anchorX="center" anchorY="middle">
          4857
        </Text>
      </group>
    </Float>
  );
}

function BalanceScale() {
  return (
    <Float speed={1.08} rotationIntensity={0.15} floatIntensity={0.28}>
      <group position={[0.35, -0.72, 0.15]} rotation={[0, -0.35, 0]} scale={0.72}>
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
          <meshStandardMaterial color="#c6f24e" metalness={0.68} roughness={0.28} />
        </mesh>
        <mesh position={[0.3, 0.06, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 0.035, 16]} />
          <meshStandardMaterial color="#eef2ff" metalness={0.35} roughness={0.45} />
        </mesh>
      </group>
    </Float>
  );
}

function FormulaTotem() {
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.24}>
      <group position={[-0.55, -0.78, 0.25]} rotation={[0, 0.25, 0]}>
        <RoundedBox args={[0.95, 0.14, 0.03]} radius={0.02}>
          <meshStandardMaterial color="#ffffff" transparent opacity={0.9} metalness={0.08} roughness={0.58} />
        </RoundedBox>
        <Text position={[0, 0, 0.02]} fontSize={0.055} color="#4338ca" anchorX="center" anchorY="middle">
          Brüt × Süre + İhbar
        </Text>
      </group>
    </Float>
  );
}

function ParallaxRig({ active, children }) {
  const group = useRef(null);
  const target = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!active || !group.current) return;
    target.current.x = THREE.MathUtils.lerp(target.current.x, state.pointer.x * 0.14, 0.05);
    target.current.y = THREE.MathUtils.lerp(target.current.y, state.pointer.y * 0.1, 0.05);
    group.current.rotation.y = target.current.x;
    group.current.rotation.x = -target.current.y * 0.2;
  });

  return <group ref={group}>{children}</group>;
}

function StepsSceneContent({ active }) {
  return (
    <>
      <color attach="background" args={["#3b35b8"]} />
      <ambientLight intensity={0.68} />
      <directionalLight position={[5, 6, 6]} intensity={1.05} castShadow />
      <directionalLight position={[-4, 2, 4]} intensity={0.48} color="#c6f24e" />
      <pointLight position={[0, 1.2, 3]} intensity={0.32} color="#ffffff" />
      <Environment preset="city" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow>
        <circleGeometry args={[2.2, 40]} />
        <meshStandardMaterial color="#312e81" transparent opacity={0.42} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.14, 0]}>
        <ringGeometry args={[0.85, 1.25, 48]} />
        <meshStandardMaterial color="#c6f24e" transparent opacity={0.12} />
      </mesh>
      <ParallaxRig active={active}>
        <Float speed={0.92} rotationIntensity={0.08} floatIntensity={0.22}>
          <group position={[-0.22, 0.02, 0]}>
            <StepsCalculator />
          </group>
        </Float>
        <WorkflowColumn />
        <PaySlip4857 />
        <BalanceScale />
        <FormulaTotem />
        <Float speed={1.18} rotationIntensity={0.18} floatIntensity={0.34}>
          <LiraCoin position={[-0.82, 0.82, 0.08]} rotation={[0.45, -0.35, 0.12]} scale={0.72} color="#b6e23a" showSymbol />
        </Float>
        <Float speed={1.05} rotationIntensity={0.14} floatIntensity={0.3}>
          <group position={[0.15, 0.88, -0.05]}>
            <LiraCoin position={[0, 0.08, 0]} color="#4338ca" />
            <LiraCoin position={[0, 0, 0]} color="#6366f1" />
            <LiraCoin position={[0, -0.08, 0]} color="#c6f24e" showSymbol />
          </group>
        </Float>
      </ParallaxRig>
    </>
  );
}

export default function StepsScene({ active = true }) {
  return (
    <Canvas
      className="guide-scene-canvas"
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.12, 4.2], fov: 38 }}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
      shadows="percentage"
    >
      <StepsSceneContent active={active} />
    </Canvas>
  );
}
