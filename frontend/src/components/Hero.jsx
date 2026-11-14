
import React from "react";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">

        <div className="hero-text">
          <span className="hero-label">
            ✦ EXPLORE THE FUTURE OF TECHNOLOGY
          </span>

          <h1>
            Discover What's
            <br />
            Next in <span>Technology.</span>
          </h1>

          <p>
            Stay informed with the latest innovations in Artificial
            Intelligence, Web Development, Robotics and Digital Technology.
            Explore ideas that shape tomorrow.
          </p>

          <div className="hero-buttons">
            <a href="#blogs" className="hero-primary-btn">
              Explore Articles →
            </a>

            <a href="#about" className="hero-secondary-btn">
              Discover More
            </a>
          </div>

          <div className="hero-stats">
            <div>
              <h3>Latest</h3>
              <p>Tech Updates</p>
            </div>

            <div>
              <h3>Trending</h3>
              <p>Innovations</p>
            </div>

            <div>
              <h3>Explore</h3>
              <p>New Ideas</p>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900"
            alt="Artificial Intelligence Technology"
          />

          <div className="hero-floating-card">
            <span>✦</span>
            <div>
              <h4>Future Starts Here</h4>
              <p>Technology & Innovation</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
