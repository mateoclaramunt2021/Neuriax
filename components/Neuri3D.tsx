'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, PerspectiveCamera } from '@react-three/drei';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';

// Componente realista de Neuri - Humanoide 3D
function RealisticNeuri() {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
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
      // Seguimiento suave del mouse
      groupRef.current.rotation.y += (mouseX * 0.6 - groupRef.current.rotation.y) * 0.08;
      groupRef.current.rotation.x += (mouseY * 0.2 - groupRef.current.rotation.x) * 0.08;

      // Movimiento flotante más natural
      groupRef.current.position.y = Math.sin(Date.now() * 0.0003) * 0.15;

      // Ligero balanceo
      if (headRef.current) {
        headRef.current.rotation.z = Math.sin(Date.now() * 0.0004) * 0.1;
      }
    }
  });

  // Materiales realistas
  const skinMaterial = new THREE.MeshStandardMaterial({
    color: '#e8d4c4',
    emissive: '#d4b5a0',
    emissiveIntensity: 0.1,
    metalness: 0,
    roughness: 0.8,
    map: undefined,
  });

  const cyberMaterial = new THREE.MeshStandardMaterial({
    color: '#00d9ff',
    emissive: '#0088ff',
    emissiveIntensity: 0.6,
    metalness: 0.8,
    roughness: 0.2,
  });

  const eyeMaterial = new THREE.MeshStandardMaterial({
    color: '#00ffff',
    emissive: '#00bfff',
    emissiveIntensity: 1,
    metalness: 0.9,
    roughness: 0.05,
  });

  const clothMaterial = new THREE.MeshStandardMaterial({
    color: '#1a2a4a',
    emissive: '#0055aa',
    emissiveIntensity: 0.2,
    metalness: 0.3,
    roughness: 0.7,
  });

  return (
    <group ref={groupRef} position={[0, -0.3, 0]}>
      {/* CUERPO PRINCIPAL */}
      
      {/* Torso - Cápsula redondeada */}
      <mesh ref={bodyRef} position={[0, 0, 0]}>
        <capsuleGeometry args={[0.35, 1, 8, 16]} />
        <primitive object={clothMaterial} attach="material" />
      </mesh>

      {/* Pecho con detalles cyber */}
      <mesh position={[0, 0.15, 0.36]}>
        <boxGeometry args={[0.4, 0.5, 0.05]} />
        <primitive object={cyberMaterial} attach="material" />
      </mesh>

      {/* Panel cyber en pecho */}
      <mesh position={[0, 0.15, 0.38]}>
        <boxGeometry args={[0.25, 0.3, 0.02]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.8}
          metalness={1}
          roughness={0}
        />
      </mesh>

      {/* CABEZA */}
      
      {/* Estructura de cabeza */}
      <mesh ref={headRef} position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.38, 32, 32]} />
        <primitive object={skinMaterial} attach="material" />
      </mesh>

      {/* Órbita de ojo izquierdo */}
      <mesh position={[-0.15, 1.2, 0.35]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#0a1a2a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Ojo izquierdo - Blanco */}
      <mesh position={[-0.15, 1.2, 0.38]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Iris izquierdo */}
      <mesh position={[-0.15, 1.2, 0.42]}>
        <sphereGeometry args={[0.065, 32, 32]} />
        <primitive object={eyeMaterial} attach="material" />
      </mesh>

      {/* Pupila izquierda */}
      <mesh position={[-0.15, 1.2, 0.45]}>
        <sphereGeometry args={[0.035, 32, 32]} />
        <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
      </mesh>

      {/* Órbita de ojo derecho */}
      <mesh position={[0.15, 1.2, 0.35]}>
        <sphereGeometry args={[0.12, 32, 32]} />
        <meshStandardMaterial color="#0a1a2a" metalness={0.2} roughness={0.8} />
      </mesh>

      {/* Ojo derecho - Blanco */}
      <mesh position={[0.15, 1.2, 0.38]}>
        <sphereGeometry args={[0.1, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Iris derecho */}
      <mesh position={[0.15, 1.2, 0.42]}>
        <sphereGeometry args={[0.065, 32, 32]} />
        <primitive object={eyeMaterial} attach="material" />
      </mesh>

      {/* Pupila derecha */}
      <mesh position={[0.15, 1.2, 0.45]}>
        <sphereGeometry args={[0.035, 32, 32]} />
        <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
      </mesh>

      {/* Boca - Línea elegante */}
      <mesh position={[0, 0.85, 0.37]}>
        <boxGeometry args={[0.15, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#00ffff"
          emissive="#00ffff"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* BRAZOS */}

      {/* Brazo izquierdo */}
      <mesh position={[-0.6, 0.4, 0]} rotation={[0, 0, 0.3]}>
        <capsuleGeometry args={[0.15, 0.8, 6, 12]} />
        <primitive object={clothMaterial} attach="material" />
      </mesh>

      {/* Antebrazo izquierdo - Cyber */}
      <mesh position={[-0.95, -0.05, 0]}>
        <capsuleGeometry args={[0.14, 0.7, 6, 12]} />
        <primitive object={cyberMaterial} attach="material" />
      </mesh>

      {/* Mano izquierda */}
      <mesh position={[-1.2, -0.4, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#d4a574"
          emissive="#b8935a"
          emissiveIntensity={0.1}
          metalness={0}
          roughness={0.7}
        />
      </mesh>

      {/* Dedos izquierdos - Líneas cyber */}
      {[0, 1, 2].map((i) => (
        <mesh key={`finger-left-${i}`} position={[-1.3, -0.5 - i * 0.12, -0.15 + i * 0.08]}>
          <boxGeometry args={[0.08, 0.25, 0.06]} />
          <primitive object={cyberMaterial} attach="material" />
        </mesh>
      ))}

      {/* Brazo derecho */}
      <mesh position={[0.6, 0.4, 0]} rotation={[0, 0, -0.3]}>
        <capsuleGeometry args={[0.15, 0.8, 6, 12]} />
        <primitive object={clothMaterial} attach="material" />
      </mesh>

      {/* Antebrazo derecho - Cyber */}
      <mesh position={[0.95, -0.05, 0]}>
        <capsuleGeometry args={[0.14, 0.7, 6, 12]} />
        <primitive object={cyberMaterial} attach="material" />
      </mesh>

      {/* Mano derecha */}
      <mesh position={[1.2, -0.4, 0]}>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshStandardMaterial
          color="#d4a574"
          emissive="#b8935a"
          emissiveIntensity={0.1}
          metalness={0}
          roughness={0.7}
        />
      </mesh>

      {/* Dedos derechos - Líneas cyber */}
      {[0, 1, 2].map((i) => (
        <mesh key={`finger-right-${i}`} position={[1.3, -0.5 - i * 0.12, -0.15 + i * 0.08]}>
          <boxGeometry args={[0.08, 0.25, 0.06]} />
          <primitive object={cyberMaterial} attach="material" />
        </mesh>
      ))}

      {/* PIERNAS */}

      {/* Muslo izquierdo */}
      <mesh position={[-0.2, -0.6, 0]}>
        <capsuleGeometry args={[0.16, 0.7, 7, 12]} />
        <primitive object={clothMaterial} attach="material" />
      </mesh>

      {/* Pantorrilla izquierda */}
      <mesh position={[-0.2, -1.25, 0]}>
        <capsuleGeometry args={[0.15, 0.7, 7, 12]} />
        <meshStandardMaterial
          color="#00b8ff"
          emissive="#0088ff"
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Pie izquierdo */}
      <mesh position={[-0.2, -1.8, 0.1]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.18, 0.15, 0.28]} />
        <primitive object={cyberMaterial} attach="material" />
      </mesh>

      {/* Muslo derecho */}
      <mesh position={[0.2, -0.6, 0]}>
        <capsuleGeometry args={[0.16, 0.7, 7, 12]} />
        <primitive object={clothMaterial} attach="material" />
      </mesh>

      {/* Pantorrilla derecha */}
      <mesh position={[0.2, -1.25, 0]}>
        <capsuleGeometry args={[0.15, 0.7, 7, 12]} />
        <meshStandardMaterial
          color="#00b8ff"
          emissive="#0088ff"
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.4}
        />
      </mesh>

      {/* Pie derecho */}
      <mesh position={[0.2, -1.8, 0.1]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.18, 0.15, 0.28]} />
        <primitive object={cyberMaterial} attach="material" />
      </mesh>

      {/* EFECTOS */}

      {/* Aura alrededor */}
      <mesh>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial
          color="#00d9ff"
          emissive="#0077ff"
          emissiveIntensity={0.1}
          metalness={0}
          roughness={1}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Sparkles */}
      <Sparkles count={100} scale={4} size={2.5} speed={0.6} />
    </group>
  );
}

// Luces cinematográficas profesionales
function CinematicLights() {
  return (
    <>
      {/* Luz ambiental suave para relleno general */}
      <ambientLight intensity={0.5} color="#e8f4f8" />

      {/* Key Light - Luz principal (frontal-arriba-derecha) */}
      <pointLight 
        position={[8, 8, 6]} 
        intensity={1.5} 
        color="#ffffff"
        distance={25}
        decay={2}
      />

      {/* Fill Light - Luz secundaria (izquierda) */}
      <pointLight 
        position={[-6, 4, 4]} 
        intensity={0.8} 
        color="#00bfff"
        distance={20}
        decay={2}
      />

      {/* Back Light - Luz trasera para silueta */}
      <pointLight 
        position={[0, 2, -8]} 
        intensity={0.6} 
        color="#0066ff"
        distance={15}
        decay={2}
      />

      {/* Luz dirigida suave */}
      <directionalLight 
        position={[5, 8, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />

      {/* Rim Light para detalles cyber */}
      <pointLight 
        position={[0, 0, 10]} 
        intensity={0.5} 
        color="#00ffff"
        distance={20}
        decay={2}
      />
    </>
  );
}

// Componente principal del canvas
export default function Neuri3DProfessional() {
  return (
    <div className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0.3, 3.5], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <PerspectiveCamera makeDefault position={[0, 0.3, 3.5]} fov={45} />
        <CinematicLights />
        <RealisticNeuri />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom 
            intensity={0.8}
            luminanceThreshold={0.3}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
