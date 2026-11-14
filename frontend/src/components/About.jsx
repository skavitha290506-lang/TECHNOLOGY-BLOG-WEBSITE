
import React from "react";
import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">

        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=900"
            alt="Modern technology and innovation"
          />

          <div className="about-image-card">
            <h3>Innovation</h3>
            <p>Ideas that shape tomorrow.</p>
          </div>
        </div>

        <div className="about-content">
          <span className="about-label">ABOUT TECHNOVA</span>

          <h2>
            Exploring Technology.
            <br />
            <span>Inspiring Innovation.</span>
          </h2>

          <p>
            TechNova is a technology information platform created
            to bring the latest digital developments, innovations
            and ideas closer to everyone.
          </p>

          <p>
            From Artificial Intelligence and Robotics to Web
            Development and Internet of Things, we explore the
            technologies transforming our world.
          </p>

          <div className="about-features">
            <div>
              <span>✓</span>
              Latest Technology Updates
            </div>

            <div>
              <span>✓</span>
              Informative Articles
            </div>

            <div>
              <span>✓</span>
              Future Innovation Insights
            </div>
          </div>

          <a href="#blogs" className="about-btn">
            Explore Our Articles →
          </a>
        </div>

      </div>
    </section>
  );
}

export default About;
