
import React, { useEffect, useState } from "react";
import "./BlogCard.css";

const API = import.meta.env.VITE_API_URL;

function BlogCard() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        if (!API) {
          throw new Error("Backend API URL is missing");
        }

        const [blogRes, categoryRes] = await Promise.all([
          fetch(`${API}/api/blogs`, {
            cache: "no-store"
          }),
          fetch(`${API}/api/categories`, {
            cache: "no-store"
          })
        ]);

        if (!blogRes.ok || !categoryRes.ok) {
          throw new Error("Unable to load data");
        }

        const blogData = await blogRes.json();
        const categoryData = await categoryRes.json();

        console.log("Blogs loaded:", blogData);
        console.log("Categories loaded:", categoryData);

        setBlogs(Array.isArray(blogData) ? blogData : []);
        setCategories(
          Array.isArray(categoryData) ? categoryData : []
        );

      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Unable to load articles. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImageUrl = (image) => {
    if (!image) return "";

    return image.startsWith("http")
      ? image
      : `${API}${image}`;
  };

  const filteredBlogs = blogs.filter((blog) => {
    const searchText = search.trim().toLowerCase();

    const title = (blog.title || "").toLowerCase();
    const description = (blog.description || "").toLowerCase();
    const content = (blog.content || "").toLowerCase();

    const blogCategory = (blog.category || "")
      .trim()
      .toLowerCase();

    const selectedCategory = category.trim().toLowerCase();

    const matchesSearch =
      title.includes(searchText) ||
      description.includes(searchText) ||
      content.includes(searchText);

    const matchesCategory =
      selectedCategory === "all" ||
      blogCategory === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  console.log("Total Blogs:", blogs.length);
  console.log("Filtered Blogs:", filteredBlogs);

  if (selectedBlog) {
    return (
      <section className="blogs-section" id="blogs">
        <div className="article-detail">

          <button
            className="back-btn"
            onClick={() => setSelectedBlog(null)}
          >
            ← Back to Articles
          </button>

          {selectedBlog.image && (
            <img
              className="detail-image"
              src={getImageUrl(selectedBlog.image)}
              alt={selectedBlog.title}
            />
          )}

          <span className="blog-category">
            {selectedBlog.category}
          </span>

          <h1>{selectedBlog.title}</h1>

          <p className="detail-author">
            By {selectedBlog.author || "Admin"}
          </p>

          <p className="detail-description">
            {selectedBlog.description}
          </p>

          <div className="detail-content">
            {selectedBlog.content}
          </div>

        </div>
      </section>
    );
  }

  return (
    <section className="blogs-section" id="blogs">
      <div className="blogs-container">

        <div className="blogs-heading">
          <span className="blogs-label">
            THE LATEST FROM TECHNOVA
          </span>

          <h2>
            Explore Latest <span>Insights.</span>
          </h2>

          <p>
            Discover ideas, innovations and stories from the world
            of modern technology.
          </p>
        </div>

        <div className="blog-controls">

          <input
            type="text"
            placeholder="Search technology articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="category-filters">

            <button
              className={category === "All" ? "active" : ""}
              onClick={() => setCategory("All")}
            >
              All
            </button>

            {categories.map((item) => (
              <button
                key={item._id}
                className={
                  category === item.name ? "active" : ""
                }
                onClick={() => setCategory(item.name)}
              >
                {item.name}
              </button>
            ))}

          </div>
        </div>

        {loading && (
          <p className="blog-message">
            Loading articles...
          </p>
        )}

        {error && (
          <p className="blog-message">{error}</p>
        )}

        {!loading && !error && filteredBlogs.length === 0 && (
          <p className="blog-message">
            No articles found. Add an article from the Admin Dashboard.
          </p>
        )}

        <div className="blogs-grid">

          {filteredBlogs.map((blog) => (
            <article className="blog-card" key={blog._id}>

              <div className="blog-card-image">
                {blog.image ? (
                  <img
                    src={getImageUrl(blog.image)}
                    alt={blog.title}
                  />
                ) : (
                  <div className="blog-no-image">
                    TECHNOVA
                  </div>
                )}
              </div>

              <div className="blog-card-content">

                <span className="blog-category">
                  {blog.category || "Technology"}
                </span>

                <h3>{blog.title}</h3>

                <p>{blog.description}</p>

                <div className="blog-card-bottom">
                  <span>{blog.author || "Admin"}</span>

                  <button
                    onClick={() => setSelectedBlog(blog)}
                  >
                    Read More →
                  </button>
                </div>

              </div>
            </article>
          ))}

        </div>

      </div>
    </section>
  );
}

export default BlogCard;
