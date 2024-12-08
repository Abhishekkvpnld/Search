import express from "express";
import { create, fetchAllBlogs, search } from "../controllers/blogController.js";

const router = express.Router();

router.get("/all",fetchAllBlogs)
router.post("/create",create)
router.get("/search",search);


export default router;