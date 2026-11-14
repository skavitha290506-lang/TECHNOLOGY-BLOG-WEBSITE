
const express = require("express");
const router = express.Router();

const Category = require("../models/Category");
const Blog = require("../models/Blog");

// GET: Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// POST: Add new category
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const existing = await Category.findOne({
      name: name.trim()
    });

    if (existing) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }

    const category = await Category.create({
      name: name.trim(),
      description: description || ""
    });

    res.status(201).json({
      message: "Category added successfully",
      category
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// PUT: Update category
router.put("/:id", async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({
        message: "Category name is required"
      });
    }

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const duplicate = await Category.findOne({
      name: name.trim(),
      _id: { $ne: req.params.id }
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Category already exists"
      });
    }

    const oldName = category.name;

    // Update blog category names too
    await Blog.updateMany(
      { category: oldName },
      { $set: { category: name.trim() } }
    );

    category.name = name.trim();
    category.description = description || "";

    await category.save();

    res.status(200).json({
      message: "Category updated successfully",
      category
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// DELETE: Delete category safely
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        message: "Category not found"
      });
    }

    const existingBlog = await Blog.findOne({
      category: category.name
    });

    if (existingBlog) {
      return res.status(400).json({
        message: "Cannot delete category. Blogs are using this category."
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Category deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
