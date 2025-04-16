import React from "react";
import wall_icon from "../../assets/wall_icon.png"; // Adjust the path as necessary
import chair from "../../assets/chair_vector.jpg"; // Adjust the path as necessary
import table from "../../assets/table_vector.jpg"; // Adjust the path as necessary
import sofa from "../../assets/sofa_vector.jpg"; // Adjust the path as necessary
import bed from "../../assets/bed_vector.jpg"; // Adjust the path as necessary
import cupboard from "../../assets/cupboard_vector.jpg"; // Adjust the path as necessary
import { useState } from "react";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

const CustomerDashboard = () => {
  const [is3D, setIs3D] = useState(false); // false = 2D, true = 3D

  const handleToggle = () => {
    setIs3D((prev) => !prev);
  };

  return (
    <div className="container-fluid bg-light">
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

              {/* table 01 */}
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

              {/* table 02 */}
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

              {/* sofa 01 */}
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

              {/* sofa 02 */}
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

              {/* bed 01 */}
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

              {/* bed 02 */}
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

              {/* cupboard 01 */}
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

              {/* cupboard 02 */}
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
            </div>
          </div>
        </div>

        {/* Middle Content */}
        <div className="col-8 bg-white p-3 d-flex justify-content-center align-items-center border border-primary">
          <div className=" rounded w-100 h-100 d-flex justify-content-center align-items-center">
            <p className="text-muted">[Home Design Preview Area]</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-2 p-0 rounded shadow-lg ">
          <div className="bg-white border text-center rounded p-3">
            <h5 className="mb-2 text-start">Set the view</h5>
            <button
              className="btn border flex items-center justify-center gap-2 "
              style={{ fontSize: "14px" }}
              onClick={handleToggle}
            >
              {is3D ? "Switch to 2D" : "Switch to 3D"}{" "}
              <HiOutlineSwitchHorizontal />
            </button>
          </div>

          <div className=" bg-white  border mt-4 rounded p-3">
            <h5 className="mb-4">Settings</h5>
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
                  />
                </div>
              </div>
              <div className="form-group row align-items-center mb-2">
                <label
                  className="col-sm-6 col-form-label small  text-secondary"
                  style={{ fontSize: "12px" }}
                >
                  Wall Height
                </label>
                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </div>
              <div className="form-group row align-items-center mb-2">
                <label
                  className="col-sm-6 col-form-label small  text-secondary"
                  style={{ fontSize: "12px" }}
                >
                  Wall Thickness
                </label>
                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9.45 in"
                    style={{ fontSize: "12px" }}
                  />
                </div>
              </div>
            </div>

            <div className="furniture-settings">
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
                      min="0"
                      max="20"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
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
                      max="20"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
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
                      max="20"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
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
                    Elevation
                  </label>
                  <div className="">
                    <input
                      type="range"
                      className="thin-slider p-0 m-0"
                      style={{ marginTop: "0px" }}
                      min="0"
                      max="20"
                      step="0.1"
                    />
                  </div>
                </div>

                <div className="col-sm-6 ">
                  <input
                    type="number"
                    className="form-control form-control-sm"
                    placeholder="9'2&quot;"
                    style={{ fontSize: "12px" }}
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
