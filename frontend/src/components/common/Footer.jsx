import React from "react";

const Footer = () => {
  return (
    <div id="footer">
      {/* Footer */}
      <footer className="bg-dark text-white mt-5 py-4">
        <div className="container">
          <div className="row">
            {/* Company Info */}
            <div className="col-md-3 mb-4">
              <h5 className="fw-bold">Furniture Store</h5>
              <p>
                Your comfort is our priority. Explore quality furniture at
                affordable prices.
              </p>
            </div>

            {/* Navigation Menu */}
            <div className="col-md-3 mb-4">
              <h6 className="text-uppercase fw-bold mb-3">Menu</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="/" className="text-white text-decoration-none">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-white text-decoration-none">
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="text-white text-decoration-none"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-white text-decoration-none"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Useful Links / Services */}
            <div className="col-md-3 mb-4">
              <h6 className="text-uppercase fw-bold mb-3">Services</h6>
              <ul className="list-unstyled">
                <li>
                  <a href="/shop" className="text-white text-decoration-none">
                    Shop Furniture
                  </a>
                </li>
                <li>
                  <a
                    href="/delivery"
                    className="text-white text-decoration-none"
                  >
                    Delivery Info
                  </a>
                </li>
                <li>
                  <a
                    href="/returns"
                    className="text-white text-decoration-none"
                  >
                    Returns
                  </a>
                </li>
                <li>
                  <a href="/faq" className="text-white text-decoration-none">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className="col-md-3 mb-4">
              <h6 className="text-uppercase fw-bold mb-3">Contact Us</h6>
              <p className="mb-1">
                <i className="bi bi-geo-alt-fill me-2"></i>123 Comfort Street,
                Cityville
              </p>
              <p className="mb-1">
                <i className="bi bi-telephone-fill me-2"></i>+1 (234) 567-890
              </p>
              <p>
                <i className="bi bi-envelope-fill me-2"></i>
                support@furnistyle.com
              </p>
            </div>
          </div>

          <div className="text-center pt-4 border-top mt-4">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Furniture Store. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
