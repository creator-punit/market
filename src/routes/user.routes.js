import { Router } from "express";
import { upload } from "../utils/fileUpload/multer.js";
import {
  registerUser,
  updateUser,
  loginUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = Router();

/**
 * @swagger
 * /api/v1/user/register:
 *  post:
 *    tags :
 *      - User
 *    summary: User registration using mobile/email and password
 *    parameters:
 *      - name: firstname
 *        description: firstname
 *        in: formData
 *        required: true
 *      - name: lastname
 *        description: lastname
 *        in: formData
 *        required: true
 *      - name: email
 *        description: email
 *        in: formData
 *        required: true
 *      - name: phone
 *        description: phone
 *        in: formData
 *        required: true
 *      - name: password
 *        description: password
 *        in: formData
 *        required: true
 *      - name: profile_img
 *        description: profile photo
 *        in: formData
 *        type: file
 *        required: false
 *    responses:
 *       '200':
 *         description: added successfully
 *       '500':
 *         description: server error
 */
router.route("/register").post(upload.single("profile_img"), registerUser);
router.route("/").put(updateUser);

/**
 * @swagger
 * /user/login:
 *  post:
 *    tags :
 *      - User
 *    summary: User Authentication using mobile/email and password
 *    parameters:
 *      - name: email
 *        description: email
 *        in: formData
 *        required: false
 *      - name: phone
 *        description: phone
 *        in: formData
 *        required: false
 *      - name: password
 *        description: password
 *        in: formData
 *        required: true
 *    responses:
 *       '200':
 *         description: added successfully
 *       '500':
 *         description: server error
 */
router.route("/login").post(loginUser);

router.route("/").delete(deleteUser);

export default router;
