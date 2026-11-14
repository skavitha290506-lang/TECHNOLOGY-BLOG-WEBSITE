
import React from "react";
import "./FeaturedArticle.css";

function FeaturedArticle() {
  return (
    <section className="featured-section" id="featured">
      <div className="featured-container">

        <div className="featured-heading">
          <div>
            <span className="section-label">EDITOR'S PICK</span>
            <h2>Featured Technology Story</h2>
          </div>

          <span className="featured-number">01 / FEATURED</span>
        </div>

        <div className="featured-card">

          <div className="featured-image">
            <img
              src="https://images.unsplash.com/photo-1676299081847-824916de030a?w=1000"
              alt="Artificial Intelligence and technology"
            />
          </div>

          <div className="featured-content">
            <span className="featured-category">
              ARTIFICIAL INTELLIGENCE
            </span>

            <h2>
              How Artificial Intelligence Is Transforming Our Future
            </h2>

            <p>
              Artificial Intelligence is changing the way we live,
              work and communicate. Discover how modern AI technologies
              are creating new possibilities across different industries.
            </p>

            <div className="featured-author">
              <div className="author-avatar">TN</div>
              <div>
                <h4>TechNova Editorial</h4>
                <span>Featured Technology Article</span>
              </div>
            </div>

            <a href="#blogs" className="featured-read-btn">
              Explore More Articles →
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturedArticle;
