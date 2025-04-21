import React, { useState, useEffect, useRef } from "react";
import { Box } from "@react-three/drei";
import MoveHandle from "./MoveHandle";
import Model from "./Model.jsx";

const Furniture = ({
  id,
  position,
  color = "orange",
  size,
  onDragging,
  isSelected,
  onClick,
  onPositionChange,
  viewMode,
  type,
}) => {
  const modelRef = useRef();
  const [modelSize, setModelSize] = useState([1, 1, 1]);
  const [pos, setPos] = useState([0, 0, 0]);
  const [dragging, setDragging] = useState(false);
  const is2D = viewMode === "2D";
  const roomHalf = 5;
  const [modelScale, setModelScale] = useState(1);

  const adjustedSize = is2D ? [modelSize[0], 0.01, modelSize[2]] : modelSize;

  useEffect(() => {
    const yPos = is2D ? 0.05 : 0;
    setPos([position[0], yPos, position[2]]);
  }, [position, modelSize, is2D]);

  useEffect(() => {
    console.log(type, "type");
  }, []);

  const onPointerDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    onDragging(true);
    onClick?.();
  };

  const onPointerUp = (e) => {
    e.stopPropagation();
    setDragging(false);
    onDragging(false);
    onPositionChange?.(pos);
  };

  const onPointerMove = (e) => {
    if (dragging) {
      const [sx, sy, sz] = modelSize;
      const newX = Math.max(
        -roomHalf + sx / 2,
        Math.min(roomHalf - sx / 2, e.point.x)
      );
      const newZ = Math.max(
        -roomHalf + sz / 2,
        Math.min(roomHalf - sz / 2, e.point.z)
      );
      const newPos = [newX, is2D ? 0 : sy / 2, newZ];
      setPos(newPos);
      onPositionChange?.(newPos);
    }
  };

  const handleMove = (axis, delta) => {
    setPos((prev) => {
      const newPos = [...prev];
      const index = axis === "x" ? 0 : axis === "y" ? 1 : 2;
      const half = modelSize[index] / 2;

      if (axis === "x" || axis === "z") {
        const max = roomHalf - half;
        const min = -roomHalf + half;
        newPos[index] = Math.max(min, Math.min(max, newPos[index] + delta));
      } else if (axis === "y" && !is2D) {
        newPos[1] = Math.max(modelSize[1] / 2, newPos[1] + delta);
      }

      onPositionChange?.(newPos);
      return newPos;
    });
  };

  return (
    <group
      position={pos}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
    >
      <Model
        ref={modelRef}
        color={color} // Pass color dynamically
        size={size}
        type={type}
      />

      {isSelected && (
        <Box args={adjustedSize}>
          <meshBasicMaterial color="yellow" wireframe />
        </Box>
      )}

      {isSelected && !is2D && (
        <>
          <MoveHandle
            axis="x"
            position={[modelSize[0] / 2 + 0.3, 0, 0]}
            onMove={handleMove}
            onDraggingChange={onDragging}
          />
          <MoveHandle
            axis="y"
            position={[0, modelSize[1] / 2 + 0.3, 0]}
            onMove={handleMove}
            onDraggingChange={onDragging}
          />
          <MoveHandle
            axis="z"
            position={[0, 0, modelSize[2] / 2 + 0.3]}
            onMove={handleMove}
            onDraggingChange={onDragging}
          />
        </>
      )}
    </group>
  );
};

export default Furniture;
