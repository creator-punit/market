import { Router } from "express";
import { registerProduct } from "../controllers/product.controller.js";
import { tokenVerification } from "../middleware/auth.middleware.js";
import { upload } from "../utils/fileUpload/multer.js";

const router = Router();

/**
 * @swagger
 * /api/v1/product/:
 *  post:
 *    tags :
 *      - Product
 *    summary: Create a new product
 *    parameters:
 *      - name: refreshToken
 *        description: refreshToken
 *        in: header
 *        required: true
 *      - name: prod_name
 *        description: prod_name
 *        in: formData
 *        required: true
 *      - name: prod_description
 *        description: prod_description
 *        in: formData
 *        required: true
 *      - name: prod_price
 *        description: prod_price
 *        in: formData
 *        required: true
 *      - name: prod_default_img
 *        description: prod_default_img
 *        in: formData
 *        type: file
 *        required: false
 *      - name: prod_sizes
 *        description: prod_sizes
 *        type: array
 *        items:
 *          type: String
 *        required: false
 *      - name: prod_colors
 *        description: prod_colors
 *        in: formData
 *        required: false
 *    responses:
 *       '200':
 *         description: added successfully
 *       '500':
 *         description: server error
 */
router
  .route("/")
  .post(tokenVerification, upload.single("prod_default_img"), registerProduct);

export default router;
