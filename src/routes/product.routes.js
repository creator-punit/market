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
 *      - name: prod_media_imgs
 *        description: array of product images, max 5 items
 *        type: array
 *        items:
 *          type: file
 *        required: false
 *      - name: prod_media_vds
 *        description: array of product videos, max 3 items
 *        type: array
 *        items:
 *          type: file
 *        required: false
 *      - name: prod_sizes
 *        description: prod_sizes
 *        type: array
 *        items:
 *          type: String
 *        required: false
 *      - name: prod_colors
 *        description: prod_colors
 *        required: false
 *        schema:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              imgs:
 *                type: file
 *                description: URL of the product image
 *              alt:
 *                type: string
 *                description: alt text for images
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

router.route("/").post(
  tokenVerification,
  upload.fields([
    { name: "prod_default_img", maxCount: 1 },
    { name: "prod_media_imgs", maxCount: 5 },
    { name: "prod_media_vds", maxCount: 3 },
  ]),
  registerProduct
);

export default router;
