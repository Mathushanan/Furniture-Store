// components/MoveHandle.jsx
import React, { useState } from "react";
import { Box } from "@react-three/drei";

const MoveHandle = ({ axis, onMove, position, onDraggingChange }) => {
  const [dragging, setDragging] = useState(false);
  const [startPoint, setStartPoint] = useState(null);

  const color = axis === "x" ? "red" : axis === "y" ? "green" : "blue";

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setDragging(true);
    setStartPoint(e.point);
    onDraggingChange?.(true);
  };

  const handlePointerMove = (e) => {
    if (!dragging || !startPoint) return;
    e.stopPropagation();

    const delta = {
      x: e.point.x - startPoint.x,
      y: e.point.y - startPoint.y,
      z: e.point.z - startPoint.z,
    };

    const moveAmount =
      axis === "x" ? delta.x : axis === "y" ? delta.y : delta.z;
    onMove(axis, moveAmount);

    setStartPoint(e.point);
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setDragging(false);
    setStartPoint(null);
    onDraggingChange?.(false);
  };

  return (
    <Box
      args={[0.2, 0.2, 0.2]}
      position={position}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      cursor="pointer"
    >
      <meshStandardMaterial color={color} />
    </Box>
  );
};

export default MoveHandle;
