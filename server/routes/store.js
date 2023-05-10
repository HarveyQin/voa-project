import express from "express";
import { store } from "../controllers/store.js";

const router = express.Router();

router.get("/", store);

export default router;