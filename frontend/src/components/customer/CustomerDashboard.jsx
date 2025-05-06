import React, { useEffect, useRef } from "react";
import wall_icon from "../../assets/wall_icon.png"; // Adjust the path as necessary
import chair1 from "../../assets/chair01.png"; // Adjust the path as necessary
import chair2 from "../../assets/chair02.png"; // Adjust the path as necessary
import table1 from "../../assets/table01.png"; // Adjust the path as necessary
import table3 from "../../assets/table03.png"; // Adjust the path as necessary
import sofa1 from "../../assets/sofa01.png"; // Adjust the path as necessary
import sofa2 from "../../assets/sofa02.png"; // Adjust the path as necessary
import bed1 from "../../assets/bed01.png"; // Adjust the path as necessary
import bed2 from "../../assets/bed02.png"; // Adjust the path as necessary
import closet1 from "../../assets/closet01.png"; // Adjust the path as necessary
import closet2 from "../../assets/closet02.png"; // Adjust the path as necessary
import { useState } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import RoomScene from "./RoomScene.jsx";
import floor_icon from "../../assets/floor_icon.png"; // Adjust the path as necessary
import Sidebar from "./SideBar.jsx";
import { Shadow } from "@react-three/drei";

const CustomerDashboard = () => {
  const [viewMode, setViewMode] = useState("3D");
  const [wallColor, setWallColor] = useState("#ffffff");
  const [wallHeight, setWallHeight] = useState(3);
  const [wallThickness, setWallThickness] = useState(0.2);
  const [furnitureColor, setFurnitureColor] = useState("#ff0000");
  const [furnitureWidth, setFurnitureWidth] = useState(1);
  const [furnitureHeight, setFurnitureHeight] = useState(1);
  const [furnitureLength, setFurnitureLength] = useState(1);
  const [furnitureShade, setFurnitureShade] = useState(1);
  const [isDraggingFurniture, setIsDraggingFurniture] = useState(false);
  const [roomSize, setRoomSize] = useState(10);
  const [furnitureList, setFurnitureList] = useState([]);
  const [selectedFurnitureId, setSelectedFurnitureId] = useState(null);
  const [selectedWall, setSelectedWall] = useState("Sand Stone Wall"); // Wall selection state moved to parent
  const [selectedFloor, setSelectedFloor] = useState("Tile Floor"); // Floor selection state moved to parent
  const [furnitureShadow, setFurnitureShadow] = useState(false);

  const removeFurniture = (id) => {
    setFurnitureList((prevList) => prevList.filter((f) => f.id !== id));
  };

  const toggleView = () => {
    setViewMode((prev) => (prev === "3D" ? "2D" : "3D"));
  };

  const selectedFurniture = furnitureList.find(
    (f) => f.id === selectedFurnitureId
  );

  const updateSelectedFurniture = (key, value) => {
    setFurnitureList((prevList) =>
      prevList.map((f) =>
        f.id === selectedFurnitureId ? { ...f, [key]: value } : f
      )
    );
  };
  const toggleShadow = () => {
    setFurnitureShadow((prev) => !prev); // Toggle shadow state
    console.log(furnitureShadow);
  };

  return (
    <div
      className="container-fluid bg-light rounded"
      style={{
        backgroundImage: `
                linear-gradient(to top, #ffffff 20%, #cce5ff 60%, #b3d9ff 100%),
                linear-gradient(#ddd 1px, transparent 1px),
                linear-gradient(to right, #ddd 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
        backgroundPosition: "center bottom, center bottom, center bottom",
        backgroundRepeat: "no-repeat, repeat, repeat",
      }}
    >
      <div className="row vh-100">
        {/* Left Sidebar */}
        <div className="col-2 bg-white p-3 overflow-auto rounded shadow-lg">
          <Sidebar
            selectedWall={selectedWall} // Pass selectedWall as prop to Sidebar
            setSelectedWall={setSelectedWall} // Pass setSelectedWall function to Sidebar
            selectedFloor={selectedFloor} // Pass selectedFloor as prop to Sidebar
            setSelectedFloor={setSelectedFloor} // Pass setSelectedFloor function to Sidebar
          />

          <div className="mb-4">
            <h6 className="fw-semibold">Select Furnitures</h6>

            <div
              className="d-grid gap-2"
              style={{
                gridTemplateColumns: "repeat(2, 1fr)",
                display: "grid",
                maxWidth: "220px",
              }}
            >
              {[
                { id: "chair1", label: "Chair", img: chair1 },
                { id: "chair2", label: "Chair", img: chair2 },
                { id: "table1", label: "Table", img: table1 },
                { id: "table2", label: "Table", img: table3 },
                { id: "sofa1", label: "Sofa", img: sofa1 },
                { id: "sofa2", label: "Sofa", img: sofa2 },
                { id: "bed1", label: "Bed", img: bed1 },
                { id: "bed2", label: "Bed", img: bed2 },
                { id: "cupboard1", label: "Closet", img: closet1 },
                { id: "cupboard2", label: "Closet", img: closet2 },
              ].map((item) => (
                <div
                  key={item.id}
                  className="border p-2 rounded text-center d-flex flex-column align-items-center justify-content-between"
                  style={{
                    width: "100px",
                    height: "110px",
                    boxSizing: "border-box",
                  }}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("furniture-type", item.id)
                  }
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{
                      width: "75px",
                      height: "75px",
                      objectFit: "contain",
                    }}
                  />
                  <div>
                    <small className="text-secondary">{item.label}</small>
                    <span
                      className="badge bg-success ms-1"
                      style={{ fontSize: "9px" }}
                    >
                      NEW
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle Content */}
        <div
          className="col-8 p-3 d-flex justify-content-center align-items-center"
          style={{ overflow: "hidden", height: "100vh" }}
        >
          <div
            className="rounded w-100 h-100"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const type = e.dataTransfer.getData("furniture-type");

              if (type) {
                const newFurniture = {
                  id: Date.now(),
                  type: type,
                  position: [0, furnitureHeight / 2 + 0.1, 0],
                  size: [furnitureWidth, furnitureHeight, furnitureLength],
                  color: furnitureColor,
                  shade: furnitureShade,
                  shadow: furnitureShadow,
                };
                setFurnitureList((prev) => [...prev, newFurniture]);
              }
            }}
          >
            <RoomScene
              wallColor={wallColor}
              wallHeight={wallHeight}
              roomSize={roomSize}
              wallThickness={wallThickness}
              furnitureColor={furnitureColor}
              furnitureWidth={furnitureWidth}
              furnitureHeight={furnitureHeight}
              furnitureLength={furnitureLength}
              isDraggingFurniture={isDraggingFurniture}
              setIsDraggingFurniture={setIsDraggingFurniture}
              furnitureList={furnitureList}
              selectedFurnitureId={selectedFurnitureId}
              setSelectedFurnitureId={setSelectedFurnitureId}
              setFurnitureList={setFurnitureList}
              viewMode={viewMode}
              selectedFloor={selectedFloor}
              selectedWall={selectedWall}
            />
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-2 p-0 rounded shadow-lg ">
          <div className="bg-white  text-center rounded p-3">
            <h5 className="mb-2 text-start">Set the view</h5>
            <button
              className="btn border flex items-center justify-center gap-2 "
              style={{ fontSize: "14px" }}
              onClick={toggleView}
            >
              Switch to {viewMode === "3D" ? "2D" : "3D"}{" "}
              <HiOutlineSwitchHorizontal />
            </button>
          </div>

          <div className=" bg-white   mt-1 rounded p-3">
            <h5 className="mb-2">Settings</h5>
            <div className="form-group row align-items-center mb-2 ">
              <div className="col-sm-6  ">
                <label
                  className=" small text-secondary "
                  style={{
                    fontSize: "12px",
                    marginBottom: 0,
                    display: "block",
                  }}
                >
                  Room Size
                </label>
                <div className="">
                  <input
                    type="range"
                    className="thin-slider p-0 m-0"
                    style={{ marginTop: "0px" }}
                    min="10"
                    max="20"
                    step="0.1"
                    value={roomSize}
                    onChange={(e) => setRoomSize(parseFloat(e.target.value))}
                  />
                </div>
              </div>

              <div className="col-sm-6 ">
                <input
                  type="number"
                  className="form-control form-control-sm"
                  placeholder="9'2&quot;"
                  style={{ fontSize: "12px" }}
                  value={roomSize}
                  onChange={(e) => setRoomSize(parseFloat(e.target.value))}
                />
              </div>
            </div>
            <div className="wall-settings">
              <h6 className="mb-2">Wall</h6>
              <div className="form-group row align-items-center mb-2">
                <label
                  className="col-sm-6 col-form-label small text-secondary"
                  style={{ fontSize: "12px" }}
                >
                  Wall Color
                </label>
                <div className="col-sm-6 ">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    style={{ fontSize: "12px" }}
                    onChange={(e) => setWallColor(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group row align-items-center mb-2 ">
                <div className="col-sm-6  ">
                  <label
                    className=" small text-secondary "
                    style={{
                      fontSize: "12px",
                      marginBottom: 0,
                      display: "block",
                    }}
                  >
                    Wall Height
                  </label>
                  <div className="">
                    <input
                      type="range"
                      className="thin-slider p-0 m-0"
                      style={{ marginTop: "0px" }}
                      min="2"
                      max="5"
                      step="0.1"
                      value={wallHeight}
                      onChange={(e) =>
                        setWallHeight(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
                    value={wallHeight}
                    onChange={(e) => setWallHeight(parseFloat(e.target.value))}
                  />
                </div>
              </div>
              <div className="form-group row align-items-center mb-2 ">
                <div className="col-sm-6  ">
                  <label
                    className=" small text-secondary "
                    style={{
                      fontSize: "12px",
                      marginBottom: 0,
                      display: "block",
                    }}
                  >
                    Wall Thickness
                  </label>
                  <div className="">
                    <input
                      type="range"
                      className="thin-slider p-0 m-0"
                      style={{ marginTop: "0px" }}
                      min="0.2"
                      max="1"
                      step="0.005"
                      value={wallThickness}
                      onChange={(e) =>
                        setWallThickness(parseFloat(e.target.value))
                      }
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
                    value={wallThickness}
                    onChange={(e) =>
                      setWallThickness(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
            </div>

            <div className="furniture-settings mt-4">
              <h6 className="mb-2">Furniture</h6>
              <div className="form-group row align-items-center mb-2">
                <label
                  className="col-sm-6 col-form-label small text-secondary"
                  style={{ fontSize: "12px" }}
                >
                  Color
                </label>
                <div className="col-sm-6 ">
                  <input
                    type="color"
                    className="form-control form-control-color"
                    style={{ fontSize: "12px" }}
                    value={selectedFurniture?.color || furnitureColor}
                    onChange={(e) => {
                      if (selectedFurnitureId) {
                        updateSelectedFurniture("color", e.target.value);
                      } else {
                        setFurnitureColor(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="form-group row align-items-center mb-2">
                <label
                  className="col-sm-6 col-form-label small text-secondary"
                  style={{ fontSize: "12px" }}
                >
                  Shadow
                </label>
                <div className="col-sm-6 mt-2">
                  <button
                    type="button"
                    className={`btn ${
                      furnitureShadow ? "btn-danger" : "btn-success"
                    }`}
                    style={{ fontSize: "12px", width: "100%" }}
                    onClick={() => {
                      toggleShadow(); // Toggle shadow state
                      if (selectedFurnitureId) {
                        updateSelectedFurniture("shadow", !furnitureShadow); // Update shadow state for selected furniture
                      } else {
                        setFurnitureShadow(!furnitureShadow); // Set shadow state for general furniture
                      }
                    }}
                  >
                    {furnitureShadow ? "Turn Off Shadow" : "Turn On Shadow"}
                  </button>
                </div>
              </div>
              <div className="form-group row align-items-center mb-2 ">
                <div className="col-sm-6  ">
                  <label
                    className=" small text-secondary "
                    style={{
                      fontSize: "12px",
                      marginBottom: 0,
                      display: "block",
                    }}
                  >
                    Shades
                  </label>
                  <div className="">
                    <input
                      type="range"
                      className="thin-slider p-0 m-0"
                      style={{ marginTop: "0px" }}
                      min="1"
                      max="2"
                      step="0.1"
                      value={selectedFurniture?.shade || furnitureShade}
                      onChange={(e) => {
                        if (selectedFurnitureId) {
                          updateSelectedFurniture("shade", e.target.value);
                        } else {
                          setFurnitureShade(e.target.value);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
                    value={selectedFurniture?.shade ?? furnitureShade}
                    onChange={(e) =>
                      setFurnitureShade(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className="form-group row align-items-center mb-2 ">
                <div className="col-sm-6  ">
                  <label
                    className=" small text-secondary "
                    style={{
                      fontSize: "12px",
                      marginBottom: 0,
                      display: "block",
                    }}
                  >
                    Width
                  </label>
                  <div className="">
                    <input
                      type="range"
                      className="thin-slider p-0 m-0"
                      style={{ marginTop: "0px" }}
                      min="1"
                      max="2"
                      step="0.1"
                      value={selectedFurniture?.size[0] || furnitureWidth}
                      onChange={(e) => {
                        const newWidth = parseFloat(e.target.value);
                        if (selectedFurnitureId) {
                          const newSize = [...selectedFurniture.size];
                          newSize[0] = newWidth;
                          updateSelectedFurniture("size", newSize);
                        } else {
                          setFurnitureWidth(newWidth);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
                    value={selectedFurniture?.size[0] ?? furnitureWidth}
                    onChange={(e) =>
                      setFurnitureWidth(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className="form-group row align-items-center mb-2 ">
                <div className="col-sm-6  ">
                  <label
                    className=" small text-secondary "
                    style={{
                      fontSize: "12px",
                      marginBottom: 0,
                      display: "block",
                    }}
                  >
                    Height
                  </label>
                  <div className="">
                    <input
                      type="range"
                      className="thin-slider p-0 m-0"
                      style={{ marginTop: "0px" }}
                      min="1"
                      max="2"
                      step="0.1"
                      value={selectedFurniture?.size[1] || furnitureHeight}
                      onChange={(e) => {
                        const newHeight = parseFloat(e.target.value);
                        if (selectedFurnitureId) {
                          const newSize = [...selectedFurniture.size];
                          newSize[1] = newHeight;
                          updateSelectedFurniture("size", newSize);
                        } else {
                          setFurnitureHeight(newHeight);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
                    value={selectedFurniture?.size[1] ?? furnitureHeight}
                    onChange={(e) =>
                      setFurnitureHeight(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className="form-group row align-items-center mb-2 ">
                <div className="col-sm-6  ">
                  <label
                    className=" small text-secondary "
                    style={{
                      fontSize: "12px",
                      marginBottom: 0,
                      display: "block",
                    }}
                  >
                    Length
                  </label>
                  <div className="">
                    <input
                      type="range"
                      className="thin-slider p-0 m-0"
                      style={{ marginTop: "0px" }}
                      min="1"
                      max="2"
                      step="0.1"
                      value={selectedFurniture?.size[2] || furnitureLength}
                      onChange={(e) => {
                        const newLength = parseFloat(e.target.value);
                        if (selectedFurnitureId) {
                          const newSize = [...selectedFurniture.size];
                          newSize[2] = newLength;
                          updateSelectedFurniture("size", newSize);
                        } else {
                          setFurnitureLength(newLength);
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
                    value={selectedFurniture?.size[2] ?? furnitureLength}
                    onChange={(e) =>
                      setFurnitureLength(parseFloat(e.target.value))
                    }
                  />
                </div>
              </div>
              <div className="form-group row align-items-center mb-2 ">
                <div className="col-sm-6  "></div>
                {/* View and settings */}
                <div className="bg-white text-center rounded p-3">
                  {selectedFurnitureId && (
                    <button
                      className="btn btn-danger mt-2"
                      onClick={() => removeFurniture(selectedFurnitureId)}
                    >
                      Remove Furniture
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
