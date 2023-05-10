import express from "express";
import { shows } from "../controllers/shows.js";

const router = express.Router();

router.get("/", shows);

export default router;