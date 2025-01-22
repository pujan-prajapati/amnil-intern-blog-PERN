import express from "express";

export const app = express();

import cors from "cors";

app.use(express.json());
app.use(cors());

// routes
import blogRoutes from "./routes/blog.routes.js";

app.use("/api/v1/blogs", blogRoutes);

// middlewares
import {
  errorHandler,
  notFound,
} from "./middlewares/errorHandler.middleware.js";
app.use(errorHandler);
app.use(notFound);
