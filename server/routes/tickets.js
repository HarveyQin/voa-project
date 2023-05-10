import express from "express";
import { tickets } from "../controllers/tickets.js";

const router = express.Router();

router.get("/", tickets);

export default router;