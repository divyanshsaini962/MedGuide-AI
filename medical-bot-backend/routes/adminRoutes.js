import { Router } from "express";
import path from "path";
import multer from "multer";

import auth from "../middleware/auth.js";
import { status } from "../controllers/adminController.js";
import { buildIndex } from "../services/ragService.js";

const router = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      path.join(path.dirname(new URL(import.meta.url).pathname), "../data")
    );
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

router.get("/status", auth, status);

router.post(
  "/upload-pdf",
  auth,
  upload.single("pdf"),
  async (req, res, next) => {
    try {
      await buildIndex(
        path.join(path.dirname(new URL(import.meta.url).pathname), "../data")
      );
      res.json({ success: true, file: req.file.filename });
    } catch (err) {
      next(err);
    }
  }
);

export default router;
