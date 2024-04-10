import { Router } from "express";
import {
  addToCart,
  removeFromCart,
  getCartProducts,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/user").post(addToCart);
router.route("/user").get(getCartProducts);
router.route("/user").delete(removeFromCart);

export default router;
