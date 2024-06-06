import { Product } from "../db/models/product.model.js";
import { handleError } from "../utils/handler/error.handler.js";

const registerProduct = async (req, res, _next) => {
  try {
    const { prod_name, prod_description, prod_price } = req.body;

    const { _id: user_id } = req.user;

    if (!prod_name || !prod_description || !prod_price) {
      res.send(
        handleError({
          title: "missing data!",
          message: "required product details missing!",
          status: "400",
        })
      );
    }

    const product = {
      prod_name,
      prod_description,
      prod_price,
      prod_created_by: user_id,
    };

    const createdProduct = await Product.create(product);
    console.log(createdProduct);
    if (!createdProduct) {
      res.send(handleError());
    }

    res.send({
      title: "product created!",
      message: "product details added to the database!",
      data: createdProduct,
    });
  } catch (error) {
    throw error;
  }
};

const getProductDetail = async (req, res, _next) => {
  try {
    const { prod_id } = req.body;

    if (!prod_id) {
      res.send(
        handleError({
          status: 402,
          title: "request data missing!",
          message: "product id missing in request!",
        })
      );
    }

    const productData = Product.findOne({ prod_id });

    if (!productData) {
      res.send(
        handleError({
          status: 404,
          title: "product not found!",
          message: "product not found with provided product id!",
        })
      );
    }

    res.send({
      data: productData,
      status: 200,
      title: "data fetched successfully!",
      message: "product data fetched successfully!",
    });
  } catch (error) {
    throw err;
  }
};

export { registerProduct, getProductDetail };
