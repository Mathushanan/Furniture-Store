import React, { useState } from "react";

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

    onMove(axis, moveAmount); // Ensure onMove properly passes 'y' delta for y-axis
    setStartPoint(e.point);
  };

  const handlePointerUp = (e) => {
    e.stopPropagation();
    setDragging(false);
    setStartPoint(null);
    onDraggingChange?.(false);
  };

  const rotation =
    axis === "x"
      ? [0, 0, -Math.PI / 2]
      : axis === "z"
      ? [Math.PI / 2, 0, 0]
      : [0, 0, 0]; // y-axis

  // Offset the handle from the furniture by 0.8 units in the direction of the axis
  const offset = {
    x: axis === "x" ? 0.2 : 0,
    y: axis === "y" ? 0.2 : 0,
    z: axis === "z" ? 0.2 : 0,
  };

  const handlePosition = [
    position[0] + offset.x,
    position[1] + offset.y,
    position[2] + offset.z,
  ];

  return (
    <group position={handlePosition} rotation={rotation}>
      {/* Arrow Shaft */}
      <mesh
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <cylinderGeometry args={[0.05, 0.05, 0.6, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* Arrow Head */}
      <mesh
        position={[0, 0.4, 0]}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <coneGeometry args={[0.1, 0.2, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
};

export default MoveHandle;
