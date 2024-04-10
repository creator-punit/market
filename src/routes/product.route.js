import { Router } from "express";
import {
  registerProduct,
  updateProduct,
  getProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/product").post(registerProduct);
router.route("/product").put(updateProduct);
router.route("/product").get(getProduct);
router.route("/product").delete(deleteProduct);
router.route("/product/list").post(listProduct);

export default router;
