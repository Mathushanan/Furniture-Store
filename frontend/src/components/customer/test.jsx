{
  /* table 01 
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={table}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Table</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>

              
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={table}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Table</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>

              
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={sofa}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Sofa</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>

              
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={sofa}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Sofa</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>

             
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={bed}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Bed</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>

              
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={bed}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Bed</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>

              
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={cupboard}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Cupboard</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>

              
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={cupboard}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Cupboard</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>
              */
}

import React, { useState, useEffect } from "react";
import { Box } from "@react-three/drei";
import MoveHandle from "./MoveHandle";

const Furniture = ({
  id,
  position,
  color = "orange",
  size = [1, 1, 1],
  onDragging,
  isSelected,
  onClick,
  onPositionChange,
  viewMode,
}) => {
  const [dragging, setDragging] = useState(false);
  const is2D = viewMode === "2D";
  const adjustedSize = is2D ? [size[0], 0.01, size[2]] : size;
  const [pos, setPos] = useState([
    position[0],
    is2D ? 0.05 : size[1] / 2,
    position[2],
  ]);

  const roomHalf = 5;

  useEffect(() => {
    setPos([position[0], is2D ? 0.05 : size[1] / 2, position[2]]);
  }, [position, size, is2D]);

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
      const newX = Math.max(
        -roomHalf + size[0] / 2,
        Math.min(roomHalf - size[0] / 2, e.point.x)
      );
      const newZ = Math.max(
        -roomHalf + size[2] / 2,
        Math.min(roomHalf - size[2] / 2, e.point.z)
      );
      const newPos = [newX, is2D ? 0 : size[1] / 2, newZ];
      setPos(newPos);
      onPositionChange?.(newPos);
    }
  };

  const handleMove = (axis, delta) => {
    console.log(`Moving ${axis} with delta ${delta}`); // Debug log to check delta value

    setPos((prev) => {
      const newPos = [...prev];
      const index = axis === "x" ? 0 : axis === "y" ? 1 : 2;
      const half = size[index] / 2;

      if (axis === "x" || axis === "z") {
        const max = roomHalf - half;
        const min = -roomHalf + half;
        newPos[index] = Math.max(min, Math.min(max, newPos[index] + delta));
      } else if (axis === "y" && !is2D) {
        // Allow Y-axis movement only in 3D mode
        const newY = Math.max(size[1] / 2, newPos[1] + delta); // Move Y
        newPos[1] = newY;
      }

      onPositionChange?.(newPos);
      return newPos;
    });
  };

  return (
    <group>
      <Box
        args={adjustedSize}
        position={pos}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerMove={onPointerMove}
        castShadow={!is2D}
        receiveShadow={!is2D}
      >
        <meshStandardMaterial color={color} />
      </Box>

      {isSelected && (
        <Box args={adjustedSize} position={pos}>
          <meshBasicMaterial color="yellow" wireframe />
        </Box>
      )}

      {isSelected && !is2D && (
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
