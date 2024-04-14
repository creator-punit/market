import { Router } from "express";
import { upload } from "../utils/fileUpload/multer.js";
import {
  registerUser,
  updateUser,
  loginUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/user").post(upload.single("profile_img"), registerUser);
router.route("/user").put(updateUser);
router.route("/user").get(loginUser);
router.route("/user").delete(deleteUser);

export default router;
