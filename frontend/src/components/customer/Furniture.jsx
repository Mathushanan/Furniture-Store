import React, { useState } from "react";
import { Box } from "@react-three/drei";
import MoveHandle from "./MoveHandle";

const Furniture = ({
  position,
  color = "orange",
  size = [1, 1, 1],
  onDragging,
}) => {
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState([position[0], size[1] / 2, position[2]]);
  const [selected, setSelected] = useState(false);

  const roomHalf = 5;

  const onPointerDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    setSelected(true);
    onDragging(true);
  };

  const onPointerUp = (e) => {
    e.stopPropagation();
    setDragging(false);
    onDragging(false);
  };

  const onPointerMove = (e) => {
    if (dragging) {
      const newX = Math.max(
        -roomHalf + size[0] / 2,
        Math.min(roomHalf - size[0] / 2, e.point.x)
      );
      const newZ = Math.max(
        -roomHalf + size[2] / 2,
        Math.min(roomHalf - size[2] / 2, e.point.z)
      );
      // Maintain bottom-anchored position
      setPos([newX, size[1] / 2, newZ]);
    }
  };

  const handleMove = (axis, delta) => {
    setPos((prev) => {
      const newPos = [...prev];
      const index = axis === "x" ? 0 : axis === "y" ? 1 : 2;
      const half = size[index] / 2;

      if (axis === "x" || axis === "z") {
        const max = roomHalf - half;
        const min = -roomHalf + half;
        newPos[index] = Math.max(min, Math.min(max, newPos[index] + delta));
      } else if (axis === "y") {
        // Grow upward only: base stays at y = 0, so center is at half the height
        const newY = Math.max(size[1] / 2, newPos[1] + delta);
        newPos[1] = newY < size[1] / 2 ? size[1] / 2 : newY;
      }

      return newPos;
    });
  };

  return (
    <group>
      <Box
        args={size}
        position={pos}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color={color} />
      </Box>

      {selected && (
        <>
          <MoveHandle
            axis="x"
            position={[pos[0] + size[0] / 2 + 0.3, pos[1], pos[2]]}
            onMove={handleMove}
            onDraggingChange={onDragging}
          />
          <MoveHandle
            axis="y"
            position={[pos[0], pos[1] + size[1] / 2 + 0.3, pos[2]]}
            onMove={handleMove}
            onDraggingChange={onDragging}
          />
          <MoveHandle
            axis="z"
            position={[pos[0], pos[1], pos[2] + size[2] / 2 + 0.3]}
            onMove={handleMove}
            onDraggingChange={onDragging}
          />
        </>
      )}
    </group>
  );
};

export default Furniture;
