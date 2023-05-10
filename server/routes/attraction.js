import express from "express";
import { attractions } from "../controllers/attractions.js";

const router = express.Router();

router.get("/", attractions);

export default router;