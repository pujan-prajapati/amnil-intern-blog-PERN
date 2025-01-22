import express from "express";
const router = express.Router();

import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
} from "../controllers/blog.controllers.js";

router.route("/").post(createBlog);

router.route("/:id").put(updateBlog);

router.route("/:id").delete(deleteBlog);

router.route("/").get(getAllBlogs);
router.route("/:id").get(getBlog);

export default router;
