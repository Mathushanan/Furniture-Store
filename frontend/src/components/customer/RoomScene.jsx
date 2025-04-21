import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Plane, Box } from "@react-three/drei";
import Furniture from "./Furniture";
import { useTexture } from "@react-three/drei";
import wood_floor from "../../assets/wood_floor.jpeg";
import marble_floor from "../../assets/marble_floor.jpg";
import carpet_floor from "../../assets/carpet_floor.jpg";
import tile_floor from "../../assets/tile_floor.jpg";
import granite_floor from "../../assets/granite_floor.jpg";

const CameraUpdater = ({ is2D, roomSize }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (is2D) {
      camera.position.set(0, 100, 0);
      camera.zoom = 8;
      camera.up.set(0, 0, -1);
      camera.lookAt(0, 0, 0);
    } else {
      camera.position.set(roomSize * 0.8, roomSize * 0.6, roomSize * 0.8);
      camera.zoom = 1;
      camera.up.set(0, 1, 0);
      camera.lookAt(0, 0, 0);
    }
    camera.updateProjectionMatrix();
  }, [is2D, roomSize]);

  return null;
};

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
  setFurnitureList,
  selectedFurnitureId,
  setSelectedFurnitureId,
  selectedFloor,
  selectedWall,
  viewMode,
}) => {
  const updateFurniturePosition = (id, newPosition) => {
    setFurnitureList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, position: newPosition } : f))
    );
  };

  const is2D = viewMode === "2D";

  const Floor = ({ roomSize, is2D, selectedFloor }) => {
    // Load both textures unconditionally
    const woodTexture = useTexture(wood_floor);
    const marbleTexture = useTexture(marble_floor);
    const graniteTexture = useTexture(granite_floor);
    const carpetTexture = useTexture(carpet_floor);
    const tileTexture = useTexture(tile_floor);

    // Decide which one to use
    const texture =
      selectedFloor === "Wood Floor"
        ? woodTexture
        : selectedFloor === "Marble Floor"
        ? marbleTexture
        : selectedFloor === "Granite Floor"
        ? graniteTexture
        : selectedFloor === "Carpet Floor"
        ? carpetTexture
        : selectedFloor === "Tile Floor"
        ? tileTexture
        : null;

    return (
      <Plane
        args={[roomSize, roomSize]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow={!is2D}
      >
        <meshStandardMaterial map={texture} />
      </Plane>
    );
  };

  return (
    <Canvas
      shadows={!is2D}
      orthographic={is2D}
      camera={{
        position: is2D
          ? [0, 100, 0]
          : [roomSize * 0.8, roomSize * 0.6, roomSize * 0.8],
        zoom: is2D ? 50 : 1,
        fov: 60,
        near: 0.1,
        far: 1000,
      }}
    >
      <CameraUpdater is2D={is2D} roomSize={roomSize} />

      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} castShadow={!is2D} />

      {/* Floor */}
      <Floor roomSize={roomSize} is2D={is2D} selectedFloor={selectedFloor} />

      {/* Walls */}
      {!is2D && (
        <>
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
        </>
      )}

      {/* Furniture */}
      {furnitureList.map((item) => (
        <Furniture
          key={item.id}
          id={item.id}
          position={item.position}
          type={item.type}
          color={item.color}
          size={item.size}
          onDragging={setIsDraggingFurniture}
          isSelected={selectedFurnitureId === item.id}
          onClick={() => setSelectedFurnitureId(item.id)}
          onPositionChange={(newPos) =>
            updateFurniturePosition(item.id, newPos)
          }
          viewMode={viewMode}
        />
      ))}

      <OrbitControls enabled={!isDraggingFurniture && !is2D} />
    </Canvas>
  );
};

export default RoomScene;
