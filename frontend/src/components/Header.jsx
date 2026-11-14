
import React, { useEffect, useState } from "react";
import "./Header.css";

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.log("Category Error:", error));
  }, []);

  return (
    <header className="header">
      <div className="header-container">

        <a href="#home" className="logo">
          Tech<span>Nova</span>
        </a>

        <nav className="navbar">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#blogs">Blogs</a>

          <div className="category-menu">
            <a href="#categories">Categories ▾</a>

            <div className="category-dropdown">
              {categories.map((category) => (
                <a
                  key={category._id}
                  href="#blogs"
                >
                  {category.name}
                </a>
              ))}
            </div>
          </div>

          <a href="#admin">Admin</a>
        </nav>

        <a href="#login" className="login-btn">
          Login
        </a>

      </div>
    </header>
  );
}

export default Header;
