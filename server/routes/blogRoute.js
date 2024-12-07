import express from "express";
import { create, fetchAllBlogs } from "../controllers/blogController.js";

const router = express.Router();

router.get("/all",fetchAllBlogs)
router.post("/create",create)

export default router;