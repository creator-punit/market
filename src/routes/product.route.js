import { Router } from "express";
import { upload } from "../utils/fileUpload/multer.js";
import {
  registerProduct,
  updateProduct,
  getProduct,
  deleteProduct,
  listProduct,
  unlistProduct,
} from "../controllers/product.controller.js";

const router = Router();

router.route("/product").post(registerProduct);
router.route("/product").put(updateProduct);
router.route("/product").get(getProduct);
router.route("/product").delete(deleteProduct);
router.route("/product/list").post(listProduct);
router.route("/product/list").delete(unlistProduct);

export default router;
