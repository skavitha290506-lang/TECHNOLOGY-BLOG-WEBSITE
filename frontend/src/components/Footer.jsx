
import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" id="contact">

      <div className="footer-container">

        <div className="footer-about">
          <a href="#home" className="footer-logo">
            Tech<span>Nova</span>
          </a>

          <p>
            Exploring the latest technology, inspiring innovation
            and bringing tomorrow's digital world closer to you.
          </p>

          <div className="footer-tagline">
            EXPLORE. INNOVATE. INSPIRE.
          </div>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <a href="#home">Home</a>
          <a href="#featured">Featured Stories</a>
          <a href="#about">About Us</a>
          <a href="#blogs">Latest Insights</a>
        </div>

        <div className="footer-contact">
          <h3>Get In Touch</h3>
          <p>✉ skavitha290506@gmail.com</p>
          <p>☎ +91 9876543210</p>
          <p>⌖ India</p>
          <a href="#login" className="footer-login-link">
            Join TechNova →
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 TechNova. All Rights Reserved.</p>
        <a href="#home">Back to Top ↑</a>
      </div>

    </footer>
  );
}

export default Footer;
