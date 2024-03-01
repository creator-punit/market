import { Router } from "express";
import {
  registerUser,
  updateUser,
  loginUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/user").post(registerUser);
router.route("/user").put(updateUser);
router.route("/user").get(loginUser);
router.route("/user").delete(deleteUser);

export default router;
