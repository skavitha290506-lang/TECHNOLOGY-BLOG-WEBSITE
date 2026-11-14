
import React, { useEffect, useState } from "react";
import "./Admin.css";

const API = import.meta.env.VITE_API_URL;

function Admin() {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("Admin");
  const [image, setImage] = useState("");

  const [editBlogId, setEditBlogId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, []);

  // Fetch Blogs
  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${API}/api/blogs`);
      const data = await response.json();

      if (response.ok) {
        setBlogs(Array.isArray(data) ? data : data.blogs || []);
      }
    } catch (error) {
      console.error("Blog fetch error:", error);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API}/api/categories`);
      const data = await response.json();

      if (response.ok) {
        setCategories(Array.isArray(data) ? data : data.categories || []);
      }
    } catch (error) {
      console.error("Category fetch error:", error);
    }
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`${API}/api/blogs/upload`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Image upload failed");
        return;
      }

      setImage(data.image || data.imageUrl || data.url || "");
      setMessage("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      setMessage("Image upload failed");
    }
  };

  // Add or Update Blog
  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !description || !content) {
      setMessage("Please fill all required fields");
      return;
    }

    const blogData = {
      title,
      category,
      description,
      content,
      author,
      image
    };

    try {
      setLoading(true);

      const url = editBlogId
        ? `${API}/api/blogs/${editBlogId}`
        : `${API}/api/blogs`;

      const response = await fetch(url, {
        method: editBlogId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(blogData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to save blog");
        return;
      }

      setMessage(
        editBlogId
          ? "Blog updated successfully"
          : "Blog added successfully"
      );

      resetBlogForm();
      fetchBlogs();
    } catch (error) {
      console.error("Blog save error:", error);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Edit Blog
  const handleBlogEdit = (blog) => {
    setTitle(blog.title || "");
    setCategory(blog.category || "");
    setDescription(blog.description || "");
    setContent(blog.content || "");
    setAuthor(blog.author || "Admin");
    setImage(blog.image || "");
    setEditBlogId(blog._id);

    document.getElementById("admin-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  // Delete Blog
  const handleBlogDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API}/api/blogs/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to delete blog");
        return;
      }

      setMessage("Blog deleted successfully");
      fetchBlogs();
    } catch (error) {
      console.error("Blog delete error:", error);
      setMessage("Blog delete failed");
    }
  };

  // Reset Blog Form
  const resetBlogForm = () => {
    setTitle("");
    setCategory("");
    setDescription("");
    setContent("");
    setAuthor("Admin");
    setImage("");
    setEditBlogId(null);
  };

  // Add or Update Category
  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setMessage("Please enter category name");
      return;
    }

    const categoryData = {
      name: categoryName.trim(),
      description: categoryDescription.trim()
    };

    try {
      setLoading(true);

      const url = editCategoryId
        ? `${API}/api/categories/${editCategoryId}`
        : `${API}/api/categories`;

      const response = await fetch(url, {
        method: editCategoryId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(categoryData)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to save category");
        return;
      }

      setMessage(
        editCategoryId
          ? "Category updated successfully"
          : "Category added successfully"
      );

      resetCategoryForm();
      fetchCategories();
      fetchBlogs();
    } catch (error) {
      console.error("Category save error:", error);
      setMessage("Category save failed");
    } finally {
      setLoading(false);
    }
  };

  // Edit Category
  const handleCategoryEdit = (item) => {
    setCategoryName(item.name || "");
    setCategoryDescription(item.description || "");
    setEditCategoryId(item._id);

    setMessage("Editing selected category");

    document.getElementById("category-management")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  // Delete Category
  const handleCategoryDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`${API}/api/categories/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Unable to delete category");
        return;
      }

      setMessage("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.error("Category delete error:", error);
      setMessage("Category delete failed");
    }
  };

  // Reset Category Form
  const resetCategoryForm = () => {
    setCategoryName("");
    setCategoryDescription("");
    setEditCategoryId(null);
  };

  return (
    <section className="admin-section" id="admin-section">
      <div className="admin-container">

        <h2>Admin Dashboard</h2>
        <p>Manage your blogs and categories</p>

        {message && (
          <p className="admin-message">{message}</p>
        )}

        {/* Blog Form */}
        <div className="admin-form-container">
          <h2>{editBlogId ? "Update Blog" : "Add New Blog"}</h2>

          <form className="admin-form" onSubmit={handleBlogSubmit}>

            <label>Blog Title</label>
            <input
              type="text"
              placeholder="Enter blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>

              {categories.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>

            <label>Short Description</label>
            <textarea
              placeholder="Enter short description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />

            <label>Blog Content</label>
            <textarea
              placeholder="Enter full blog content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="6"
              required
            />

            <label>Author</label>
            <input
              type="text"
              placeholder="Enter author name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <label>Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />

            {image && (
              <div className="image-preview">
                <img
                  src={
                    image.startsWith("http")
                      ? image
                      : `${API}${image.startsWith("/") ? "" : "/"}${image}`
                  }
                  alt="Blog Preview"
                />
              </div>
            )}

            <button type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : editBlogId
                ? "Update Blog"
                : "Add Blog"}
            </button>

            {editBlogId && (
              <button
                type="button"
                onClick={resetBlogForm}
              >
                Cancel Edit
              </button>
            )}
          </form>
        </div>

        {/* Category Management */}
        <div
          className="category-management"
          id="category-management"
        >
          <h2>Category Management</h2>
          <p>Add, edit and manage blog categories</p>

          <form
            className="admin-form"
            onSubmit={handleCategorySubmit}
          >
            <label>Category Name</label>
            <input
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />

            <label>Category Description</label>
            <textarea
              placeholder="Enter category description"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : editCategoryId
                ? "Update Category"
                : "Add Category"}
            </button>

            {editCategoryId && (
              <button
                type="button"
                onClick={resetCategoryForm}
              >
                Cancel Edit
              </button>
            )}
          </form>

          <h3 className="manage-title">Existing Categories</h3>

          <div className="category-list">
            {categories.length === 0 ? (
              <p>No categories found</p>
            ) : (
              categories.map((item) => (
                <div className="category-item" key={item._id}>
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                  </div>

                  <div className="manage-buttons">
                    <button
                      type="button"
                      onClick={() => handleCategoryEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCategoryDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Manage Blogs */}
        <div className="manage-blog-list">
          <h2 className="manage-title">Manage Blogs</h2>

          {blogs.length === 0 ? (
            <p>No blogs available</p>
          ) : (
            blogs.map((blog) => (
              <div className="manage-blog-item" key={blog._id}>
                <div>
                  <h3>{blog.title}</h3>
                  <p>Category: {blog.category}</p>
                  <p>Author: {blog.author}</p>
                </div>

                <div className="manage-buttons">
                  <button
                    type="button"
                    onClick={() => handleBlogEdit(blog)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBlogDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </section>
  );
}

export default Admin;
