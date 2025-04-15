import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom"; // Import NavLink
import Footer from "./Footer";
import sofa from "../../assets/sofa.jpeg";
import table from "../../assets/table.jpeg";
import chair from "../../assets/chair.jpeg";
import about from "../../assets/about.jpg";
import { FaHammer, FaLeaf, FaPencilRuler } from "react-icons/fa";
import custom_design from "../../assets/custom_design.jpg";
import consultant from "../../assets/consultant.jpg";
import delivery from "../../assets/delivery.jpg";
import { MdExplore } from "react-icons/md";
import { FiShoppingCart } from "react-icons/fi";

const HomePage = () => {
  const products = [
    {
      title: "Modern Sofa",
      image: sofa,
    },
    {
      title: "Elegant Chair",
      image: chair,
    },
    {
      title: "Wooden Table",
      image: table,
    },
    {
      title: "Cozy Lounge",
      image: sofa,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-light text-dark py-5 text-center">
        <div className="">
          <h1 className="fw-bold">Welcome to Furniture Store!</h1>
          <p className="lead" style={{ fontSize: "20px" }}>
            Discover premium furniture that matches your vibe
          </p>
          <NavLink
            to="/customer"
            className="btn btn-primary px-4 py-2 shadow-sm"
          >
            Shop Now <FiShoppingCart className="ms-2" size={20} />
          </NavLink>
        </div>
      </div>

      {/* Featured Products */}
      <div className=" my-5" id="products">
        <h2 className="text-center mb-4">Featured Products</h2>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{
                    height: "150px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    High quality and stylish {product.title.toLowerCase()} to
                    elevate your space.
                  </p>
                  <NavLink to={`/customer`} className="btn btn-outline-primary">
                    Purchase
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <div className="bg-white py-5" id="about">
        <div className="">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0">
              <img
                src={about}
                alt="About FurniStore"
                className="rounded shadow"
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </div>

            <div className="col-md-6">
              <h2 className="fw-bold mb-3">About Furniture Store</h2>
              <p className="text-muted">
                FurniStore is more than just a furniture store — it's where
                modern design meets comfort and quality...
              </p>
              <ul className="list-unstyled">
                <li className="mb-2 flex items-center">
                  <FaHammer className="me-2 text-xl text-gray-700" />
                  Over 10 years of experience in furniture craftsmanship
                </li>
                <li className="mb-2 flex items-center">
                  <FaLeaf className="me-2 text-xl text-green-600" />
                  Sustainably sourced materials and eco-friendly processes
                </li>
                <li className="mb-2 flex items-center">
                  <FaPencilRuler className="me-2 text-xl text-blue-600" />
                  Custom designs tailored to your personal style
                </li>
              </ul>
              <NavLink to="/customer" className="btn btn-primary mt-3">
                Explore Services <MdExplore className="ms-2" size={20} />
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-5" id="services">
        <div className="">
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row text-center">
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <div className="mb-3">
                  <img
                    src={custom_design}
                    alt="Custom Furniture"
                    style={{ width: "200px", height: "auto" }}
                    className="img-fluid"
                  />
                </div>
                <h5>Custom Furniture Design</h5>
                <p className="text-start">
                  We specialize in creating one-of-a-kind furniture pieces
                  tailored to your exact preferences.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <div className="mb-3">
                  <img
                    src={consultant}
                    alt="Interior Consultation"
                    style={{ width: "200px", height: "auto" }}
                    className="img-fluid"
                  />
                </div>
                <h5>Interior Consultation</h5>
                <p className="text-start">
                  Whether you're revamping a room or designing an entire home,
                  our consultation service offers expert insights.
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <div className="mb-3">
                  <img
                    src={delivery}
                    alt="Fast Delivery"
                    style={{ width: "200px", height: "auto" }}
                    className="img-fluid"
                  />
                </div>
                <h5>Fast & Reliable Delivery</h5>
                <p className="text-start">
                  Our delivery service ensures that your furniture arrives
                  safely, securely, and on time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
