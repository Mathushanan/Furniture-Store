import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Plane, Box } from "@react-three/drei";
import Furniture from "./Furniture";
import { useTexture } from "@react-three/drei";
import wood_floor from "../../assets/wood_floor.jpeg";
import marble_floor from "../../assets/marble_floor.jpg";
import carpet_floor from "../../assets/carpet_floor.jpg";
import tile_floor from "../../assets/tile_floor.jpg";
import granite_floor from "../../assets/granite_floor.jpg";

import smooth_finish_wall from "../../assets/smoothfinish_wall.jpeg";
import knockdown_wall from "../../assets/knowckdown_wall.jpg";
import orange_peel_wall from "../../assets/orangepeel_wall.jpeg";
import popcorn_wall from "../../assets/popcorn_wall.jpeg";
import sand_swirl_wall from "../../assets/sand_wall.jpg";
import sand_stone_wall from "../../assets/sandstone_wall.jpg";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

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

const RoomScene = forwardRef(
  (
    {
      wallColor,
      wallHeight,
      wallThickness,
      roomSize,
      furnitureColor,
      furnitureWidth,
      furnitureHeight,
      furnitureLength,
      furnitureShade,
      furnitureShadow,
      isDraggingFurniture,
      setIsDraggingFurniture,
      furnitureList,
      setFurnitureList,
      selectedFurnitureId,
      setSelectedFurnitureId,
      selectedFloor,
      selectedWall,
      viewMode,
      designName,
      onSaveResult,
    },
    ref
  ) => {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState(""); // "error" or "success"

    // Use the ref here
    useImperativeHandle(ref, () => ({
      handleSave,
      onSaveResult,
    }));

    const handleSave = async () => {
      try {
        const saveUrl = `${import.meta.env.VITE_API_BASE_URL}/save-design`;
        const token = localStorage.getItem("authToken");
        const decodedToken = jwtDecode(token);

        if (!token) {
          alert("Authorization token is missing!");
          return;
        }

        // Create the request body
        const requestBody = {
          userEmail: decodedToken.Email,
          roomSize: roomSize,
          wallHeight: wallHeight,
          wallThickness: wallThickness,
          wallColor: wallColor,
          wallTexture: selectedWall,
          floorTexture: selectedFloor,
          viewMode: viewMode || "3D",
          furnitures: furnitureList,
          designName: designName,
        };

        // Make the POST request using axios
        const response = await axios.post(saveUrl, requestBody, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          setMessage("Design saved successfully!");
          setMessageType("success");
          onSaveResult?.("Design saved successfully!", "success");
        } else {
          setMessage("Failed to save the design!");
          setMessageType("error");
          onSaveResult?.("Failed to save the design!", "error");
        }
      } catch (error) {
        console.log(error);
        setMessage(
          "Saving failed: " +
            (error.response ? error.response.data : error.message)
        );
        setMessageType("error");
        onSaveResult?.(message, "error");
      }
    };

    const updateFurniturePosition = (id, newPosition) => {
      setFurnitureList((prev) =>
        prev.map((f) => (f.id === id ? { ...f, position: newPosition } : f))
      );
    };

    const is2D = viewMode === "2D";

    // Remove Furniture

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

    const Wall = ({
      roomSize,
      wallHeight,
      wallThickness,
      wallColor,
      selectedWall,
    }) => {
      // Load both textures unconditionally
      const smoothFinishTexture = useTexture(smooth_finish_wall);
      const knockdownTexture = useTexture(knockdown_wall);
      const orangePeelTexture = useTexture(orange_peel_wall);
      const popcornTexture = useTexture(popcorn_wall);
      const sandSwirlTexture = useTexture(sand_swirl_wall);
      const sandStoneTexture = useTexture(sand_stone_wall);

      // Decide which one to use
      const texture =
        selectedWall === "Smooth Finish Wall"
          ? smoothFinishTexture
          : selectedWall === "Knockdown Wall"
          ? knockdownTexture
          : selectedWall === "Orange Peel Wall"
          ? orangePeelTexture
          : selectedWall === "Popcorn Wall"
          ? popcornTexture
          : selectedWall === "Sand Swirl Wall"
          ? sandSwirlTexture
          : selectedWall === "Sand Stone Wall"
          ? sandStoneTexture
          : null;

      return (
        <>
          <Box
            args={[roomSize, wallHeight, wallThickness]}
            position={[0, wallHeight / 2, -roomSize / 2]}
          >
            <meshStandardMaterial map={texture} />
          </Box>
          <Box
            args={[roomSize, wallHeight, wallThickness]}
            position={[0, wallHeight / 2, roomSize / 2]}
          >
            <meshStandardMaterial map={texture} />
          </Box>
          <Box
            args={[wallThickness, wallHeight, roomSize]}
            position={[-roomSize / 2, wallHeight / 2, 0]}
          >
            <meshStandardMaterial map={texture} />
          </Box>
          <Box
            args={[wallThickness, wallHeight, roomSize]}
            position={[roomSize / 2, wallHeight / 2, 0]}
          >
            <meshStandardMaterial map={texture} />
          </Box>
        </>
      );
    };

    return (
      <>
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
          <Floor
            roomSize={roomSize}
            is2D={is2D}
            selectedFloor={selectedFloor}
          />

          {/* Walls */}
          {!is2D && selectedWall != "Custom Color" && (
            <Wall
              wallColor={wallColor}
              wallHeight={wallHeight}
              wallThickness={wallThickness}
              roomSize={roomSize}
              selectedWall={selectedWall}
            />
          )}
          {!is2D && selectedWall == "Custom Color" && (
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
              shade={item.shade}
              shadow={item.shadow}
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
      </>
    );
  }
);

export default RoomScene;
