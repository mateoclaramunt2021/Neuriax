'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Sparkles, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

// Componente principal de Neuri - Más profesional
function NeuroCharacterPro() {
  const groupRef = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX((e.clientX / window.innerWidth) * 2 - 1);
      setMouseY(-(e.clientY / window.innerHeight) * 2 + 1);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Rotación suave controlada por mouse
      groupRef.current.rotation.y += (mouseX * 0.5 - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (mouseY * 0.3 - groupRef.current.rotation.x) * 0.05;

      // Movimiento flotante
      groupRef.current.position.y = Math.sin(Date.now() * 0.0005) * 0.2;

      // Escala de pulsación sutil
      const scale = 1 + Math.sin(Date.now() * 0.0015) * 0.03;
      groupRef.current.scale.set(scale, scale, scale);
    }
  });

  // Material PBR profesional
  const neuriMaterial = new THREE.MeshStandardMaterial({
    color: '#00d9ff',
    emissive: '#00a3cc',
    emissiveIntensity: 0.4,
    metalness: 0.6,
    roughness: 0.2,
  });

  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: '#ffffff',
    emissive: '#00bfff',
    emissiveIntensity: 0.8,
    metalness: 0.9,
    roughness: 0.1,
  });

  return (
    <group ref={groupRef}>
      {/* Cuerpo - Toroide mejorado */}
      <mesh ref={bodyRef}>
        <torusKnotGeometry args={[1, 0.4, 100, 16]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#0099ff"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.15}
          wireframe={false}
        />
      </mesh>

      {/* Núcleo central brillante */}
      <mesh position={[0, 0, 0]}>
        <octahedronGeometry args={[0.6, 4]} />
        <meshStandardMaterial
          color="#00bfff"
          emissive="#0077ff"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Cabeza - Icosahedro */}
      <mesh position={[0, 1.5, 0]}>
        <icosahedronGeometry args={[0.7, 5]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#0099ff"
          emissiveIntensity={0.6}
          metalness={0.65}
          roughness={0.2}
        />
      </mesh>

      {/* Ojos izquierdo */}
      <mesh position={[-0.35, 1.7, 0.6]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00bfff"
          emissiveIntensity={0.9}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Iris izquierdo */}
      <mesh position={[-0.35, 1.7, 0.78]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color="#0033ff"
          emissive="#0055ff"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Ojo derecho */}
      <mesh position={[0.35, 1.7, 0.6]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00bfff"
          emissiveIntensity={0.9}
          metalness={0.95}
          roughness={0.05}
        />
      </mesh>

      {/* Iris derecho */}
      <mesh position={[0.35, 1.7, 0.78]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial
          color="#0033ff"
          emissive="#0055ff"
          emissiveIntensity={1}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Brazos - Cilindros mejorados */}
      <mesh position={[-1.3, 0.6, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.2, 0.18, 1.3, 32]} />
        <meshStandardMaterial
          color="#00b8ff"
          emissive="#0088ff"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[1.3, 0.6, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.2, 0.18, 1.3, 32]} />
        <meshStandardMaterial
          color="#00b8ff"
          emissive="#0088ff"
          emissiveIntensity={0.4}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Manos - Dodecahedro */}
      <mesh position={[-1.6, 0, 0]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#00bfff"
          emissive="#0099ff"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[1.6, 0, 0]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial
          color="#00bfff"
          emissive="#0099ff"
          emissiveIntensity={0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Aura luminosa */}
      <mesh>
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#0099ff"
          emissiveIntensity={0.15}
          metalness={0}
          roughness={1}
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Efectos de partículas mejorados */}
      <Sparkles count={80} scale={5} size={3} speed={0.8} />
    </group>
  );
}

// Luces profesionales - 3-Point lighting setup
function ProfessionalLights() {
  return (
    <>
      {/* Luz ambiental suave */}
      <ambientLight intensity={0.4} color="#ffffff" />

      {/* Key light - Principal (frontal-derecha) */}
      <pointLight 
        position={[8, 6, 8]} 
        intensity={1.8} 
        color="#00d9ff"
        distance={20}
        decay={2}
      />

      {/* Fill light - Secundaria (frontal-izquierda) */}
      <pointLight 
        position={[-8, 4, 5]} 
        intensity={0.9} 
        color="#0099ff"
        distance={20}
        decay={2}
      />

      {/* Back light - Trasera */}
      <pointLight 
        position={[0, -2, -10]} 
        intensity={0.7} 
        color="#0055ff"
        distance={15}
        decay={2}
      />

      {/* Luz direccional suave */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.5} 
        color="#ffffff"
      />
    </>
  );
}

// Componente principal
export default function Neuri3DProfessional() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0.5, 4.5], fov: 40 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0.5, 4.5]} fov={40} />
        <ProfessionalLights />
        
        <NeuroCharacterPro />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom 
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
