import express from "express";
import { parking } from "../controllers/parking.js";

const router = express.Router();

router.get("/", parking);

export default router;