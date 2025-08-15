import React, { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html, OrbitControls, Stars } from "@react-three/drei";
import * as THREE from "three";
import styled from "styled-components";

// Types
interface BubbleData {
  id: number;
  type: "image" | "text" | "empty";
  content: string;
  color: string;
}

interface BubbleProps {
  data: BubbleData;
  position: [number, number, number];
  onClick: (bubble: BubbleData) => void;
}

// Sample data for bubbles
const bubbleData: BubbleData[] = [
  { id: 1, type: "image", content: "👤", color: "#ff6b6b" },
  { id: 2, type: "image", content: "🎮", color: "#4ecdc4" },
  { id: 3, type: "image", content: "👻", color: "#45b7d1" },
  { id: 4, type: "image", content: "🐱", color: "#96ceb4" },
  { id: 5, type: "image", content: "🐸", color: "#feca57" },
  { id: 6, type: "text", content: "P", color: "#ff9ff3" },
  { id: 7, type: "text", content: "G", color: "#54a0ff" },
  { id: 8, type: "text", content: "M", color: "#5f27cd" },
  { id: 9, type: "text", content: "R", color: "#00d2d3" },
  { id: 10, type: "text", content: "U", color: "#ff9f43" },
  { id: 11, type: "text", content: "₿", color: "#feca57" },
  { id: 12, type: "text", content: "Ξ", color: "#48dbfb" },
  { id: 13, type: "text", content: "PRESALE", color: "#ff6b6b" },
  { id: 14, type: "text", content: "make it happen", color: "#4ecdc4" },
  { id: 15, type: "text", content: "ELES DEFI", color: "#45b7d1" },
  { id: 16, type: "text", content: "종민", color: "#96ceb4" },
  // Empty bubbles for interaction
  { id: 17, type: "empty", content: "", color: "#a8e6cf" },
  { id: 18, type: "empty", content: "", color: "#b8e6cf" },
  { id: 19, type: "empty", content: "", color: "#c8e6cf" },
  { id: 20, type: "empty", content: "", color: "#d8e6cf" },
  { id: 21, type: "empty", content: "", color: "#e8e6cf" },
  { id: 22, type: "empty", content: "", color: "#f8e6cf" },
  { id: 23, type: "empty", content: "", color: "#a8f6cf" },
  { id: 24, type: "empty", content: "", color: "#b8f6cf" },
  { id: 25, type: "empty", content: "", color: "#c8f6cf" },
  { id: 26, type: "empty", content: "", color: "#d8f6cf" },
  { id: 27, type: "empty", content: "", color: "#e8f6cf" },
  { id: 28, type: "empty", content: "", color: "#f8f6cf" },
  { id: 29, type: "empty", content: "", color: "#a8e6df" },
  { id: 30, type: "empty", content: "", color: "#b8e6df" },
  { id: 31, type: "empty", content: "", color: "#c8e6df" },
  { id: 32, type: "empty", content: "", color: "#d8e6df" },
  { id: 33, type: "empty", content: "", color: "#e8e6df" },
  { id: 34, type: "empty", content: "", color: "#f8e6df" },
  { id: 35, type: "empty", content: "", color: "#a8f6df" },
  { id: 36, type: "empty", content: "", color: "#b8f6df" },
  { id: 37, type: "empty", content: "", color: "#c8f6df" },
  { id: 38, type: "empty", content: "", color: "#d8f6df" },
  { id: 39, type: "empty", content: "", color: "#e8f6df" },
  { id: 40, type: "empty", content: "", color: "#f8f6df" },
];

// Styled components
const CanvasContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background: linear-gradient(
    to bottom,
    #0c0c0c 0%,
    #1a1a2e 25%,
    #16213e 50%,
    #0f3460 75%,
    #0c0c0c 100%
  );
`;

const ControlsInfo = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  color: white;
  background: rgba(0, 0, 0, 0.5);
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  pointer-events: none;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

// Animated Star Component
const AnimatedStar: React.FC<{
  position: [number, number, number];
  size: number;
  speed: number;
}> = ({ position, size, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [twinklePhase] = useState(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (meshRef.current) {
      // Twinkling effect
      const twinkle =
        Math.sin(state.clock.elapsedTime * speed + twinklePhase) * 0.5 + 0.5;
      const material = meshRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = twinkle * 0.8 + 0.2;

      // Subtle rotation
      meshRef.current.rotation.z += 0.01;

      // Gentle floating movement
      meshRef.current.position.y +=
        Math.sin(state.clock.elapsedTime * 0.5 + twinklePhase) * 0.001;
      meshRef.current.position.x +=
        Math.cos(state.clock.elapsedTime * 0.3 + twinklePhase) * 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

// Midnight Sky Background Component
const MidnightSky: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate random star positions
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 200; i++) {
      starArray.push({
        position: [
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
          (Math.random() - 0.5) * 200,
        ] as [number, number, number],
        size: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 2 + 0.5,
      });
    }
    return starArray;
  }, []);

  // Rotate the entire star field slowly
  useFrame((_state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0003; // Reduced from 0.001 to 0.0003
      groupRef.current.rotation.x += 0.0001; // Reduced from 0.0005 to 0.0001
    }
  });

  return (
    <group ref={groupRef}>
      {/* Animated individual stars */}
      {stars.map((star, index) => (
        <AnimatedStar
          key={index}
          position={star.position}
          size={star.size}
          speed={star.speed}
        />
      ))}

      {/* Background star layers for depth */}
      <Stars
        radius={100}
        depth={50}
        count={3000}
        factor={4}
        saturation={0}
        fade
        speed={0.2} // Reduced from 0.5 to 0.2
      />

      <Stars
        radius={200}
        depth={100}
        count={1500}
        factor={2}
        saturation={0}
        fade
        speed={0.1} // Reduced from 0.3 to 0.1
      />

      <Stars
        radius={300}
        depth={150}
        count={800}
        factor={1}
        saturation={0.1}
        fade
        speed={0.05} // Reduced from 0.1 to 0.05
      />
    </group>
  );
};

// Individual Bubble Component
const Bubble: React.FC<BubbleProps> = ({ data, position, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Animation for empty bubbles
  useFrame((state) => {
    if (meshRef.current && data.type === "empty") {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.scale.setScalar(
        1 + Math.sin(state.clock.elapsedTime * 2) * 0.1
      );
    }
  });

  const handleClick = () => {
    if (data.type === "empty") {
      setClicked(true);
      onClick(data);
      // Reset after animation
      setTimeout(() => setClicked(false), 500);
    }
  };

  const size = data.type === "empty" ? 0.4 : data.type === "text" ? 0.5 : 0.6; // Slightly larger bubble sizes
  const fontSize = data.content.length > 3 ? 0.2 : 0.4; // Slightly larger font sizes

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : clicked ? 1.5 : 1}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial
          color={data.color}
          emissive={data.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent
          opacity={data.type === "empty" ? 0.7 : 0.9}
        />
      </mesh>

      {data.content && (
        <Html center>
          <div
            style={{
              color: "white",
              fontSize: `${fontSize}rem`,
              fontWeight: "bold",
              textAlign: "center",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            {data.content}
          </div>
        </Html>
      )}
    </group>
  );
};

// Rotating Sphere Component
const RotatingSphere: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [autoRotate, _setAutoRotate] = useState(true);

  // Calculate positions using spherical distribution
  const bubblePositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const radius = 4; // Increased from 4 to 5

    bubbleData.forEach((_, index) => {
      const phi = Math.acos(-1 + (2 * index) / bubbleData.length);
      const theta = Math.sqrt(bubbleData.length * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      positions.push([x, y, z]);
    });

    return positions;
  }, []);

  // Auto-rotate the sphere when not being controlled
  useFrame((state) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.1) * 0.3; // Reduced from 0.3 to 0.1
      groupRef.current.rotation.y += 0.002; // Reduced from 0.005 to 0.002
    }
  });

  const handleBubbleClick = (bubble: BubbleData) => {
    console.log(`Clicked bubble: ${bubble.id}`);
  };

  return (
    <group ref={groupRef}>
      {bubbleData.map((bubble, index) => (
        <Bubble
          key={bubble.id}
          data={bubble}
          position={bubblePositions[index]}
          onClick={handleBubbleClick}
        />
      ))}
    </group>
  );
};

// Camera Controls Component
const CameraControls: React.FC = () => {
  const { camera } = useThree();

  return (
    <OrbitControls
      camera={camera}
      enablePan={true}
      enableZoom={true}
      enableRotate={true}
      zoomSpeed={0.8}
      rotateSpeed={0.8}
      panSpeed={0.8}
      minDistance={5}
      maxDistance={50}
      dampingFactor={0.05}
      enableDamping={true}
      onStart={() => {
        // Stop auto-rotation when user starts controlling
        // console.log("User started controlling camera");
      }}
      onEnd={() => {
        // Optionally resume auto-rotation when user stops
        // console.log("User stopped controlling camera");
      }}
    />
  );
};

const Title = styled.h1`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  text-align: center;
  font-weight: 300;
  letter-spacing: 2px;
  z-index: 10;
  text-shadow: 0 0 20px rgba(255, 255, 255, 0.3);
  background: linear-gradient(45deg, #fff, #4a90e2, #9b59b6);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientShift 3s ease-in-out infinite;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

const Instruction = styled.p`
  position: absolute;
  bottom: 10px;
  left: 0;
  right: 0;
  color: white;
  font-size: 1.2rem;
  text-align: center;
  margin-top: 2rem;
  z-index: 10;
  opacity: 0.8;
  font-weight: 300;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

// Main Component
const RotatingBubbles: React.FC = () => {
  return (
    <CanvasContainer>
      <Title>Data Graph Mindshare</Title>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        style={{ background: "transparent" }}
      >
        {/* Midnight Sky Background */}
        <MidnightSky />

        {/* Lighting for the scene */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#4a90e2" />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.4}
          color="#9b59b6"
        />
        <pointLight position={[0, 20, 0]} intensity={0.3} color="#3498db" />

        <RotatingSphere />
        <CameraControls />
      </Canvas>

      <ControlsInfo>
        <div>🖱️ Mouse Controls:</div>
        <div>• Scroll to zoom in/out</div>
        <div>• Click + drag to rotate</div>
        <div>• Right-click + drag to pan</div>
        <div>• Click bubbles to interact</div>
      </ControlsInfo>

      <Instruction>CLICK ON AN EMPTY BUBBLE TO START</Instruction>
    </CanvasContainer>
  );
};

export default RotatingBubbles;
