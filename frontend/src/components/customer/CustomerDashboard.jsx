import React, { useRef } from "react";
import wall_icon from "../../assets/wall_icon.png"; // Adjust the path as necessary
import chair from "../../assets/chair_vector.jpg"; // Adjust the path as necessary
import table from "../../assets/table_vector.jpg"; // Adjust the path as necessary
import sofa from "../../assets/sofa_vector.jpg"; // Adjust the path as necessary
import bed from "../../assets/bed_vector.jpg"; // Adjust the path as necessary
import cupboard from "../../assets/cupboard_vector.jpg"; // Adjust the path as necessary
import { useState } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import RoomScene from "./RoomScene.jsx";

const CustomerDashboard = () => {
  const [viewMode, setViewMode] = useState("3D");
  const [wallColor, setWallColor] = useState("#ffffff");
  const [wallHeight, setWallHeight] = useState(3);
  const [wallThickness, setWallThickness] = useState(0.2);
  const [furnitureColor, setFurnitureColor] = useState("#ff0000");
  const [furnitureWidth, setFurnitureWidth] = useState(1);
  const [furnitureHeight, setFurnitureHeight] = useState(1);
  const [furnitureLength, setFurnitureLength] = useState(1);
  const [isDraggingFurniture, setIsDraggingFurniture] = useState(false);
  const [roomSize, setRoomSize] = useState(10);
  const [furnitureList, setFurnitureList] = useState([]);
  const [selectedFurnitureId, setSelectedFurnitureId] = useState(null);

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
  const updateFurniturePosition = (id, newPosition) => {
    setFurnitureList((prev) =>
      prev.map((f) => (f.id === id ? { ...f, position: newPosition } : f))
    );
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
          <h5 className="mb-3 fw-bold">Create Room</h5>

          {/* Section 1: Top Options */}
          <div className="mb-4">
            <div className="d-grid gap-2 mb-2 ">
              <button className="btn bg-white text-start w-100 py-2 select-wall-button border">
                <div className="d-flex justify-content-between align-items-center w-100">
                  <div>
                    Select
                    <small className="text-muted d-block">Wall Styles</small>
                  </div>
                  <div className="ms-2">
                    <img
                      src={wall_icon}
                      alt="Wall Icon"
                      style={{ width: "40px", height: "40px" }}
                    />
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Section 2: Draw Walls */}
          <div className="mb-4">
            <h6 className="fw-semibold">Select Furnitures</h6>
            <div className="d-flex flex-wrap gap-1">
              {/* chair 01 */}
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("furniture-type", "chair");
                }}
              >
                <div>
                  <img src={chair} alt="Chair" style={{ width: "75px" }} />
                </div>
                <small className="text-secondary">Chair</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>

              {/* chair 02 */}
              <div
                className="border p-2 rounded text-center"
                style={{ width: "100px" }}
              >
                <div>
                  <img
                    src={chair}
                    alt=""
                    className=""
                    style={{ width: "75px" }}
                  />
                </div>
                <small className="text-secondary ">Chair</small>
                <span
                  className="badge bg-success ms-1"
                  style={{ fontSize: "9px" }}
                >
                  NEW
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Content */}
        <div className="col-8 p-3 d-flex justify-content-center align-items-center">
          <div
            className="rounded w-100 h-100"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const type = e.dataTransfer.getData("furniture-type");
              if (type) {
                const newFurniture = {
                  id: Date.now(),
                  type,
                  position: [0, furnitureHeight / 2 + 0.1, 0],
                  size: [furnitureWidth, furnitureHeight, furnitureLength],
                  color: furnitureColor,
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
                      step="0.01"
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
                      min="0"
                      max="1"
                      step="0.001"
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
                      min="0"
                      max="1"
                      step="0.01"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
