import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane, Box } from "@react-three/drei";
import Furniture from "./Furniture";

const RoomScene = ({
  wallColor,
  wallHeight,
  wallThickness,
  roomSize,
  furnitureColor,
  furnitureWidth,
  furnitureHeight,
  furnitureLength,
  isDraggingFurniture,
  setIsDraggingFurniture,
  furnitureList,
}) => {
  const furnitureElevation = furnitureHeight / 2 + 0.1; // Elevate furniture slightly above the floor
  return (
    <Canvas
      shadows
      camera={{
        position: [roomSize * 0.8, roomSize * 0.6, roomSize * 0.8],
        fov: 60,
      }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} castShadow />

      {/* Floor */}
      <Plane
        args={[roomSize, roomSize]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#e0e0e0" />
      </Plane>

      {/* Walls */}
      <Box
        args={[roomSize, wallHeight, wallThickness]}
        position={[0, wallHeight / 2, -roomSize / 2]}
      >
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box
        args={[roomSize, wallHeight, wallThickness]}
        position={[0, wallHeight / 2, roomSize / 2]}
      >
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box
        args={[wallThickness, wallHeight, roomSize]}
        position={[-roomSize / 2, wallHeight / 2, 0]}
      >
        <meshStandardMaterial color={wallColor} />
      </Box>
      <Box
        args={[wallThickness, wallHeight, roomSize]}
        position={[roomSize / 2, wallHeight / 2, 0]}
      >
        <meshStandardMaterial color={wallColor} />
      </Box>

      {/* Furniture */}
      {furnitureList.map((item) => (
        <Furniture
          key={item.id}
          position={item.position}
          color={item.color}
          size={item.size}
          onDragging={setIsDraggingFurniture}
        />
      ))}

      <OrbitControls enabled={!isDraggingFurniture} />
    </Canvas>
  );
};

export default RoomScene;
