import React, { useState } from "react";
import wall_icon from "../../assets/wall_icon.png";
import floor_icon from "../../assets/floor_icon.png";
import wood_icon from "../../assets/wood_floor.jpeg";
import marble_icon from "../../assets/marble_floor.jpg";
import granite_icon from "../../assets/granite_floor.jpg";
import carpet_icon from "../../assets/carpet_floor.jpg";
import tile_icon from "../../assets/tile_floor.jpg";

import smooth_finish_wall from "../../assets/smoothfinish_wall.jpeg";
import knockdown_wall from "../../assets/knowckdown_wall.jpg";
import orange_peel_wall from "../../assets/orangepeel_wall.jpeg";
import popcorn_wall from "../../assets/popcorn_wall.jpeg";
import sand_swirl_wall from "../../assets/sand_wall.jpg";
import sand_stone_wall from "../../assets/sandstone_wall.jpg";
import custom_color_wall from "../../assets/custom_color.png";

const wallOptions = [
  { name: "Custom Color", image: custom_color_wall },
  { name: "Smooth Finish Wall", image: smooth_finish_wall },
  { name: "Knockdown Wall", image: knockdown_wall },
  { name: "Orange Peel Wall", image: orange_peel_wall },
  { name: "Popcorn Wall", image: popcorn_wall },
  { name: "Sand Swirl Wall", image: sand_swirl_wall },
  { name: "Sand Stone Wall", image: sand_stone_wall },
];

const floorOptions = [
  { name: "Wood Floor", image: wood_icon },
  { name: "Marble Floor", image: marble_icon },
  { name: "Granite Floor", image: granite_icon },
  { name: "Carpet Floor", image: carpet_icon },
  { name: "Tile Floor", image: tile_icon },
];

const Sidebar = ({
  selectedWall,
  setSelectedWall,
  selectedFloor,
  setSelectedFloor,
}) => {
  const [showWallOptions, setShowWallOptions] = useState(false); // Track visibility of wall options
  const [showFloorOptions, setShowFloorOptions] = useState(false); // Track visibility of floor options

  // Function to handle wall selection and hide options
  const handleWallSelect = (wall) => {
    setSelectedWall(wall);
    setShowWallOptions(false); // Hide options after selecting
  };

  // Function to handle floor selection and hide options
  const handleFloorSelect = (floor) => {
    setSelectedFloor(floor);
    setShowFloorOptions(false); // Hide options after selecting
  };

  // Toggle wall options visibility
  const toggleWallOptions = () => {
    setShowWallOptions((prev) => !prev);
  };

  // Toggle floor options visibility
  const toggleFloorOptions = () => {
    setShowFloorOptions((prev) => !prev);
  };

  return (
    <div>
      <h5 className="mb-3 fw-bold">Create Room</h5>

      {/* Wall Button */}
      <div className="mb-2 d-grid gap-2">
        <button
          className="btn bg-white text-start w-100 py-2 select-wall-button border"
          onClick={toggleWallOptions} // Toggle visibility of wall options
        >
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              Select
              <small className="text-muted d-block">Wall Styles</small>
            </div>
            <div className="ms-2">
              <img
                src={wall_icon}
                alt="Wall Icon"
                style={{ width: 40, height: 40 }}
              />
            </div>
          </div>
        </button>

        {showWallOptions && (
          <div className="card p-2 shadow-sm">
            {wallOptions.map((option, index) => (
              <div
                key={index}
                className="d-flex align-items-center border-bottom py-2 justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={() => handleWallSelect(option.name)} // Update selected wall and hide options
              >
                <div style={{ fontSize: "13px" }}>{option.name}</div>
                <img
                  src={option.image}
                  alt={option.name}
                  width="25"
                  height="25"
                  className="me-2 rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Floor Button */}
      <div className="mb-2 d-grid gap-2">
        <button
          className="btn bg-white text-start w-100 py-2 select-wall-button border"
          onClick={toggleFloorOptions} // Toggle visibility of floor options
        >
          <div className="d-flex justify-content-between align-items-center w-100">
            <div>
              Select
              <small className="text-muted d-block">Floor Styles</small>
            </div>
            <div className="ms-2">
              <img
                src={floor_icon}
                alt="Floor Icon"
                style={{ width: 40, height: 40 }}
              />
            </div>
          </div>
        </button>

        {showFloorOptions && (
          <div className="card p-2 shadow-sm">
            {floorOptions.map((option, index) => (
              <div
                key={index}
                className="d-flex align-items-center border-bottom py-2 justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={() => handleFloorSelect(option.name)} // Update selected floor and hide options
              >
                <div style={{ fontSize: "13px" }}>{option.name}</div>
                <img
                  src={option.image}
                  alt={option.name}
                  width="25"
                  height="25"
                  className="me-2 rounded"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
