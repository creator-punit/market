import { Router } from "express";
import {
  registerUser,
  updateUser,
  loginUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/").post(registerUser);
router.route("/").put(updateUser);
router.route("/").get(loginUser);
router.route("/").delete(deleteUser);

export default router;
