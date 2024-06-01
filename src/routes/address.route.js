import { Router } from "express";
import {
  registerAddress,
  updateAddress,
  getAddress,
  deleteAddress,
} from "../controllers/address.controller.js";

const router = Router();

router.route("/address").post(registerAddress);
router.route("/address").put(updateAddress);
router.route("/address").get(getAddress);
router.route("/address").delete(deleteAddress);

export default router;
