import { Product } from "../db/models/product.model.js";
import { handleError } from "../utils/handler/error.handler.js";

const registerProduct = (req, res, _next) => {
  try {
    const { prod_name, prod_description, prod_price } = req.body;
    console.log(req.body, "--------------");
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
    console.log(product, "----------");

    const createdProduct = Product.create(product);

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

export { registerProduct };
