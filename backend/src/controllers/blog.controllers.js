import { pool } from "../db/connect.js";
import asyncHandler from "express-async-handler";

// create a blog
export const createBlog = asyncHandler(async (req, res) => {
  const { title, content, author, image_url } = req.body;

  const result = await pool.query(
    "INSERT INTO blog (title, content, author, image_url) VALUES ($1, $2, $3, $4) RETURNING *",
    [title, content, author, image_url]
  );

  res.status(201).json({
    status: "success",
    message: "Blog created successfully",
    data: result.rows[0],
  });
});

// get all blogs
export const getAllBlogs = asyncHandler(async (req, res) => {
  const result = await pool.query("SELECT * FROM blog");

  res.status(200).json({
    status: "success",
    message: "All blogs fetched successfully",
    data: result.rows,
  });
});

// get a blog
export const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findBlog = await pool.query("SELECT * FROM blog WHERE id = $1", [id]);
  if (findBlog.rows.length === 0) {
    throw new Error("blog not found");
  }

  res.status(200).json({
    status: "success",
    message: "Blog fetched successfully",
    data: findBlog.rows[0],
  });
});

// delete a blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const findBlog = await pool.query("SELECT * FROM blog WHERE id = $1", [id]);
  if (findBlog.rows.length === 0) {
    throw new Error("blog not found");
  }

  await pool.query("DELETE FROM blog WHERE id = $1", [id]);

  res.status(200).json({
    status: "success",
    message: "Blog deleted successfully",
  });
});

// update a blog
export const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, content, author, image_url } = req.body;

  const findBlog = await pool.query("SELECT * FROM blog WHERE id = $1", [id]);
  if (findBlog.rows.length === 0) {
    throw new Error("blog not found");
  }

  const result = await pool.query(
    "UPDATE blog SET title = $1, content = $2, author = $3, image_url = $4 WHERE id = $5 RETURNING *",
    [title, content, author, image_url, id]
  );

  res.status(200).json({
    status: "success",
    message: "Blog updated successfully",
    data: result.rows[0],
  });
});
