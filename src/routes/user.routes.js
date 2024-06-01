import { Router } from "express";
import { upload } from "../utils/fileUpload/multer.js";
import {
  registerUser,
  updateUser,
  loginUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/").post(upload.single("profile_img"), registerUser);
router.route("/").put(updateUser);
router.route("/").get(loginUser);
router.route("/").delete(deleteUser);

export default router;
