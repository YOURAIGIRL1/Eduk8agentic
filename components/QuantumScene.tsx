
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

const QuantumParticle = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.3;
      ref.current.rotation.x = t * 0.4;
      ref.current.rotation.z = t * 0.2;
    }
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={1}
        clearcoatRoughness={0}
        metalness={0.6}
        distort={0.3}
        speed={1.5}
      />
    </Sphere>
  );
};

const IntelligenceFlow = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
       ref.current.rotation.y = t * 0.05;
    }
  });

  return (
    <Torus ref={ref} args={[4, 0.05, 16, 100]} rotation={[Math.PI / 2.5, 0, 0]}>
      <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.8} transparent opacity={0.3} wireframe />
    </Torus>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
          <QuantumParticle position={[0, 0, 0]} color="#7C3AED" scale={1.5} />
          <IntelligenceFlow />
        </Float>
        
        <Float speed={3} rotationIntensity={0.8} floatIntensity={1.5}>
           <QuantumParticle position={[-5, 2, -3]} color="#C084FC" scale={0.7} />
           <QuantumParticle position={[5, -2, -4]} color="#A78BFA" scale={0.9} />
           <QuantumParticle position={[0, -4, -2]} color="#6D28D9" scale={0.4} />
        </Float>

        <Environment preset="night" />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={1} fade speed={1.5} />
      </Canvas>
    </div>
  );
};
