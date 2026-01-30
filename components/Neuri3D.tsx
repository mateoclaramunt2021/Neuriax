'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Sparkles, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Componente principal de Neuri
function NeuroCharacter() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (groupRef.current) {
      // Rotación suave
      groupRef.current.rotation.y += 0.005;
      // Movimiento flotante
      groupRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.3;
      // Escala de pulsación suave
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cuerpo principal - Esfera azul */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhongMaterial 
          color="#00bfff"
          emissive="#0099ff"
          emissiveIntensity={0.5}
          shininess={100}
        />
      </mesh>

      {/* Cabeza - Esfera más pequeña */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshPhongMaterial 
          color="#00d9ff"
          emissive="#00bfff"
          emissiveIntensity={0.6}
          shininess={120}
        />
      </mesh>

      {/* Ojo izquierdo */}
      <mesh position={[-0.3, 1.6, 0.7]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Iris izquierdo */}
      <mesh position={[-0.3, 1.6, 0.75]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#0066ff" />
      </mesh>

      {/* Ojo derecho */}
      <mesh position={[0.3, 1.6, 0.7]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      {/* Iris derecho */}
      <mesh position={[0.3, 1.6, 0.75]}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshBasicMaterial color="#0066ff" />
      </mesh>

      {/* Brazo izquierdo */}
      <mesh position={[-1.2, 0.5, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 1.2, 32]} />
        <meshPhongMaterial 
          color="#00b8ff"
          emissive="#0088ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Brazo derecho */}
      <mesh position={[1.2, 0.5, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 1.2, 32]} />
        <meshPhongMaterial 
          color="#00b8ff"
          emissive="#0088ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Mano izquierda */}
      <mesh position={[-1.5, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhongMaterial 
          color="#00bfff"
          emissive="#0099ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Mano derecha */}
      <mesh position={[1.5, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshPhongMaterial 
          color="#00bfff"
          emissive="#0099ff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Pierna izquierda */}
      <mesh position={[-0.4, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
        <meshPhongMaterial 
          color="#00b8ff"
          emissive="#0088ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Pierna derecha */}
      <mesh position={[0.4, -1.5, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 1, 32]} />
        <meshPhongMaterial 
          color="#00b8ff"
          emissive="#0088ff"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Efectos de luz */}
      <Sparkles count={50} scale={4} size={2} speed={0.5} />
    </group>
  );
}

// Luces de la escena
function Lights() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={1.5} color="#00bfff" />
      <pointLight position={[-10, -10, 5]} intensity={0.8} color="#0066ff" />
      <pointLight position={[0, 0, 5]} intensity={1} color="#ffffff" />
    </>
  );
}

// Componente principal
export default function Neuri3D() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Canvas 
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
        <Lights />
        <NeuroCharacter />
      </Canvas>
    </div>
  );
}
