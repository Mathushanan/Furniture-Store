import React, { useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Plane, Box } from "@react-three/drei";
import { useTexture } from "@react-three/drei";
import wood_floor from "../../assets/wood_floor.jpeg";
import marble_floor from "../../assets/marble_floor.jpg";
import carpet_floor from "../../assets/carpet_floor.jpg";
import tile_floor from "../../assets/tile_floor.jpg";
import granite_floor from "../../assets/granite_floor.jpg";

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

export default Floor;
