import { Product } from "../db/models/product.model.js";

const registerProduct = async (req, res) => {
  try {
    const {
      prod_name,
      prod_description,
      prod_listing_price,
      prod_selling_price,
    } = req.body;
    const { user_id } = req.headers;

    if (
      !prod_name &&
      !prod_description &&
      !prod_listing_price &&
      !prod_selling_price
    ) {
      return res.send({
        status: 0,
        message: "product details missing",
      });
    }

    const productDetails = {
      prod_name,
      prod_description,
      prod_listing_price,
      prod_selling_price,
      user_id,
    };

    const addedProduct = await Product.create(productDetails);

    if (!addedProduct) {
      return res.send({
        status: 0,
        message: "internal error adding product",
      });
    }

    res.send({
      status: 1,
      message: "product successfully added",
    });
  } catch (error) {
    throw error;
  }
};
const getProduct = async (req, res) => { };

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

export { registerProduct, getProduct, updateProduct, deleteProduct };
