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
const getProduct = async (req, res) => {
  try {
    const { prod_id } = req.headers;

    if (!prod_id) {
      return res.send({
        status: 0,
        message: "no product id found",
      });
    }

    const exist = await Product.findByPk(prod_id);

    if (!exist) {
      return res.send({
        status: 0,
        message: "no product found",
      });
    }

    const productDetails = {
      prod_id: exist.prod_id,
      prod_name: exist.prod_name,
      prod_description: exist.prod_description,
      prod_listing_price: exist.prod_listing_price,
      prod_selling_price: exist.prod_selling_price,
      discount: exist.discount,
      prod_media_id: exist.prod_media_id,
    };

    res.send({
      status: 1,
      productDetails,
      message: "product details found successfully",
    });
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {
  try {
    const { prod_id } = req.headers;

    if (!prod_id) {
      return res.send({
        status: 0,
        message: "no product id found",
      });
    }

    const deletedProduct = await Product.destroy({ where: { prod_id } });

    if (!deletedProduct) {
      return res.send({
        status: 0,
        message: "no product found",
      });
    }

    res.send({
      status: 1,
      message: "product details deleted successfully",
    });
  } catch (error) {
    throw error;
  }
};

export { registerProduct, getProduct, updateProduct, deleteProduct };
