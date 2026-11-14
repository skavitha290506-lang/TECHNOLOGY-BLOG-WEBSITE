
import React, { useEffect, useState } from "react";
import "./Header.css";

const API = import.meta.env.VITE_API_URL;

function Header() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API}/api/categories`);

        if (!response.ok) {
          throw new Error("Unable to fetch categories");
        }

        const data = await response.json();

        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Category Error:", error);
      }
    };

    fetchCategories();
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

          <a href="#admin-section">Admin</a>
        </nav>

        <a href="#login" className="login-btn">
          Login
        </a>

      </div>
    </header>
  );
}

export default Header;
