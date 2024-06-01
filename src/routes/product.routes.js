import { Router } from "express";
import {
  registerProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/").post(registerProduct);
router.route("/").put(updateProduct);
router.route("/").get(getProduct);
router.route("/").delete(deleteProduct);

export default router;
