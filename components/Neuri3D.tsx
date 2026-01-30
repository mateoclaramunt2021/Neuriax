'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, PerspectiveCamera, MeshTransmissionMaterial } from '@react-three/drei';
import { Bloom, EffectComposer, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';

// Robot realista y perfecto
function RealisticRobotNeuri() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
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

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // Rotación suave controlada por mouse
      groupRef.current.rotation.y += (mouseX * 0.8 - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (mouseY * 0.3 - groupRef.current.rotation.x) * 0.1;

      // Movimiento flotante sutil
      groupRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.12;

      // Rotación de cabeza independiente
      if (headRef.current) {
        headRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.6) * 0.08;
        headRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.7) * 0.12;
      }

      // Movimiento de brazos coordinado
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.8) * 0.25;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = Math.cos(clock.getElapsedTime() * 0.8) * 0.25;
      }
    }
  });

  // Materiales metallic premium
  const metalBlack = new THREE.MeshStandardMaterial({
    color: '#0a0a0a',
    metalness: 0.95,
    roughness: 0.1,
    envMapIntensity: 1.2,
  });

  const metalCyan = new THREE.MeshStandardMaterial({
    color: '#00ffff',
    emissive: '#00bfff',
    emissiveIntensity: 0.8,
    metalness: 0.9,
    roughness: 0.1,
  });

  const glassBlue = new THREE.MeshStandardMaterial({
    color: '#0044ff',
    emissive: '#0066ff',
    emissiveIntensity: 1,
    metalness: 0.3,
    roughness: 0.1,
    transparent: true,
    opacity: 0.8,
  });

  const plasticWhite = new THREE.MeshStandardMaterial({
    color: '#f5f5f5',
    metalness: 0.2,
    roughness: 0.5,
  });

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={1.1}>
      {/* ========== TORSO PRINCIPAL ========== */}
      
      {/* Cuerpo principal - Forma cilíndrica mejorada */}
      <mesh position={[0, 0.2, 0]}>
        <capsuleGeometry args={[0.32, 0.95, 8, 20]} />
        <primitive object={metalBlack} attach="material" />
      </mesh>

      {/* Placa frontal del torso */}
      <mesh position={[0, 0.2, 0.35]}>
        <boxGeometry args={[0.38, 0.9, 0.08]} />
        <meshStandardMaterial
          color="#1a1a2e"
          metalness={0.6}
          roughness={0.2}
          emissive="#001a33"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Panel LED frontal grande - CORAZÓN DEL ROBOT */}
      <mesh position={[0, 0.25, 0.38]}>
        <boxGeometry args={[0.22, 0.35, 0.02]} />
        <meshStandardMaterial
          color="#0055ff"
          emissive="#00aaff"
          emissiveIntensity={1.2}
          metalness={0.8}
          roughness={0.05}
        />
      </mesh>

      {/* Líneas de código/LED en el panel */}
      {[0, 0.08, 0.16].map((y) => (
        <mesh key={`led-line-${y}`} position={[0, 0.25 + y - 0.12, 0.39]}>
          <boxGeometry args={[0.18, 0.04, 0.01]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#00ffff"
            emissiveIntensity={0.9}
          />
        </mesh>
      ))}

      {/* Divisiones laterales del torso */}
      {[-0.16, 0.16].map((x) => (
        <mesh key={`torso-line-${x}`} position={[x, 0.2, 0.36]}>
          <boxGeometry args={[0.03, 0.9, 0.1]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0088ff"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* ========== CABEZA ========== */}

      {/* Base de cabeza - Cubo redondeado */}
      <mesh ref={headRef} position={[0, 1.15, 0]}>
        <boxGeometry args={[0.38, 0.42, 0.38]} />
        <primitive object={metalBlack} attach="material" />
      </mesh>

      {/* Visera/pantalla frontal - Vidrio azul */}
      <mesh position={[0, 1.15, 0.22]}>
        <boxGeometry args={[0.42, 0.38, 0.04]} />
        <primitive object={glassBlue} attach="material" />
      </mesh>

      {/* Display de ojos - Panel LED */}
      <mesh position={[0, 1.15, 0.24]}>
        <boxGeometry args={[0.36, 0.32, 0.02]} />
        <meshStandardMaterial
          color="#0033ff"
          emissive="#0088ff"
          emissiveIntensity={1}
          metalness={0.9}
          roughness={0.05}
        />
      </mesh>

      {/* Ojo izquierdo - Pantalla digital */}
      <mesh position={[-0.12, 1.15, 0.25]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.3}
          metalness={0.95}
          roughness={0}
        />
      </mesh>

      {/* Pupila izquierda dinámica */}
      <mesh position={[-0.12, 1.15, 0.26]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.035, 0.08, 0.02]} />
        <meshStandardMaterial
          color="#000000"
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Ojo derecho - Pantalla digital */}
      <mesh position={[0.12, 1.15, 0.25]}>
        <circleGeometry args={[0.1, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.3}
          metalness={0.95}
          roughness={0}
        />
      </mesh>

      {/* Pupila derecha dinámica */}
      <mesh position={[0.12, 1.15, 0.26]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.035, 0.08, 0.02]} />
        <meshStandardMaterial
          color="#000000"
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* Antena/sensor en la cabeza */}
      <mesh position={[0, 1.35, 0]}>
        <cylinderGeometry args={[0.03, 0.02, 0.25, 16]} />
        <primitive object={metalCyan} attach="material" />
      </mesh>

      {/* Bola sensor */}
      <mesh position={[0, 1.48, 0]}>
        <sphereGeometry args={[0.05, 32, 32]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={1.2}
          metalness={1}
          roughness={0.05}
        />
      </mesh>

      {/* ========== BRAZOS ========== */}

      {/* Brazo izquierdo completo */}
      <group ref={leftArmRef} position={[-0.45, 0.5, 0]}>
        {/* Hombro articulado */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <primitive object={metalBlack} attach="material" />
        </mesh>

        {/* Articulación visible */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0088ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Brazo superior */}
        <mesh position={[-0.2, -0.25, 0]}>
          <capsuleGeometry args={[0.1, 0.5, 6, 12]} />
          <primitive object={metalBlack} attach="material" />
        </mesh>

        {/* Detalle de brazo */}
        <mesh position={[-0.2, -0.25, 0.1]}>
          <boxGeometry args={[0.15, 0.5, 0.03]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0066ff"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Codo articulado */}
        <mesh position={[-0.3, -0.55, 0]}>
          <sphereGeometry args={[0.11, 32, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0088ff"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Antebrazo */}
        <mesh position={[-0.38, -0.85, 0]}>
          <capsuleGeometry args={[0.09, 0.6, 6, 12]} />
          <primitive object={metalBlack} attach="material" />
        </mesh>

        {/* Detalle antebrazo cyber */}
        <mesh position={[-0.38, -0.85, 0.09]}>
          <boxGeometry args={[0.14, 0.6, 0.03]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0055ff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Mano - Estructura robótica */}
        <mesh position={[-0.44, -1.15, 0]}>
          <boxGeometry args={[0.14, 0.16, 0.12]} />
          <primitive object={metalBlack} attach="material" />
        </mesh>

        {/* Dedos derechos */}
        {[0, 0.08, -0.08].map((z, i) => (
          <mesh key={`left-finger-${i}`} position={[-0.5, -1.15, z]}>
            <boxGeometry args={[0.08, 0.12, 0.05]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#0077ff"
              emissiveIntensity={0.4}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* Brazo derecho completo */}
      <group ref={rightArmRef} position={[0.45, 0.5, 0]}>
        {/* Hombro articulado */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.12, 32, 32]} />
          <primitive object={metalBlack} attach="material" />
        </mesh>

        {/* Articulación visible */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0088ff"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.15}
          />
        </mesh>

        {/* Brazo superior */}
        <mesh position={[0.2, -0.25, 0]}>
          <capsuleGeometry args={[0.1, 0.5, 6, 12]} />
          <primitive object={metalBlack} attach="material" />
        </mesh>

        {/* Detalle de brazo */}
        <mesh position={[0.2, -0.25, 0.1]}>
          <boxGeometry args={[0.15, 0.5, 0.03]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0066ff"
            emissiveIntensity={0.4}
          />
        </mesh>

        {/* Codo articulado */}
        <mesh position={[0.3, -0.55, 0]}>
          <sphereGeometry args={[0.11, 32, 32]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0088ff"
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>

        {/* Antebrazo */}
        <mesh position={[0.38, -0.85, 0]}>
          <capsuleGeometry args={[0.09, 0.6, 6, 12]} />
          <primitive object={metalBlack} attach="material" />
        </mesh>

        {/* Detalle antebrazo cyber */}
        <mesh position={[0.38, -0.85, 0.09]}>
          <boxGeometry args={[0.14, 0.6, 0.03]} />
          <meshStandardMaterial
            color="#00ffff"
            emissive="#0055ff"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Mano */}
        <mesh position={[0.44, -1.15, 0]}>
          <boxGeometry args={[0.14, 0.16, 0.12]} />
          <primitive object={metalBlack} attach="material" />
        </mesh>

        {/* Dedos derechos */}
        {[0, 0.08, -0.08].map((z, i) => (
          <mesh key={`right-finger-${i}`} position={[0.5, -1.15, z]}>
            <boxGeometry args={[0.08, 0.12, 0.05]} />
            <meshStandardMaterial
              color="#00ffff"
              emissive="#0077ff"
              emissiveIntensity={0.4}
              metalness={0.7}
              roughness={0.2}
            />
          </mesh>
        ))}
      </group>

      {/* ========== PIERNAS ========== */}

      {/* Pierna izquierda */}
      <mesh position={[-0.18, -0.55, 0]}>
        <capsuleGeometry args={[0.12, 0.85, 7, 14]} />
        <primitive object={metalBlack} attach="material" />
      </mesh>

      {/* Detalle pierna izquierda */}
      <mesh position={[-0.18, -0.55, 0.12]}>
        <boxGeometry args={[0.18, 0.85, 0.04]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#0055ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Pie izquierdo */}
      <mesh position={[-0.18, -1.25, 0.15]}>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#0088ff"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* Pierna derecha */}
      <mesh position={[0.18, -0.55, 0]}>
        <capsuleGeometry args={[0.12, 0.85, 7, 14]} />
        <primitive object={metalBlack} attach="material" />
      </mesh>

      {/* Detalle pierna derecha */}
      <mesh position={[0.18, -0.55, 0.12]}>
        <boxGeometry args={[0.18, 0.85, 0.04]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#0055ff"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Pie derecho */}
      <mesh position={[0.18, -1.25, 0.15]}>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#0088ff"
          emissiveIntensity={0.7}
          metalness={0.8}
          roughness={0.15}
        />
      </mesh>

      {/* ========== EFECTOS VISUALES ========== */}

      {/* Aura de energía */}
      <mesh>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color="#0077ff"
          emissive="#0055ff"
          emissiveIntensity={0.15}
          metalness={0}
          roughness={1}
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Sparkles de energía */}
      <Sparkles count={120} scale={4.5} size={2} speed={0.7} />
    </group>
  );
}

// Luces cinematográficas ultra profesionales
function CinematicLights() {
  return (
    <>
      {/* Luz ambiental de relleno */}
      <ambientLight intensity={0.45} color="#e8f4ff" />

      {/* Key Light principal - Blanca fría */}
      <pointLight 
        position={[10, 8, 8]} 
        intensity={2}
        color="#ffffff"
        distance={30}
        decay={2}
        castShadow
      />

      {/* Fill Light izquierda - Cyan */}
      <pointLight 
        position={[-8, 5, 4]} 
        intensity={1.2}
        color="#00bfff"
        distance={25}
        decay={2}
      />

      {/* Back Light trasera - Azul profundo */}
      <pointLight 
        position={[0, 1, -10]} 
        intensity={0.8}
        color="#0055ff"
        distance={20}
        decay={2}
      />

      {/* Rim Light - Cyan dorado */}
      <pointLight 
        position={[0, 0, 12]} 
        intensity={0.9}
        color="#00ffff"
        distance={25}
        decay={2}
      />

      {/* Accent Light derecha - Azul */}
      <pointLight 
        position={[12, 3, 2]} 
        intensity={0.7}
        color="#0077ff"
        distance={20}
        decay={2}
      />

      {/* Luz direccional para sombras suaves */}
      <directionalLight 
        position={[6, 10, 6]} 
        intensity={0.6}
        color="#ffffff"
        castShadow
      />
    </>
  );
}

// Canvas principal
export default function Neuri3DProfessional() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0.2, 4], fov: 50 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        shadows
      >
        <PerspectiveCamera makeDefault position={[0, 0.2, 4]} fov={50} />
        <CinematicLights />
        <RealisticRobotNeuri />

        {/* Post-processing ultra profesional */}
        <EffectComposer>
          <Bloom 
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.95}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.001, 0.0008]} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
