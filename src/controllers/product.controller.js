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

    const exist = await Product.findAll({
      attributes: [
        "prod_name",
        "prod_description",
        "prod_listing_price",
        "prod_selling_price",
        "discount",
        "prod_media_id",
      ],
      where: { prod_id },
    });

    if (!exist.length) {
      return res.send({
        status: 0,
        message: "no product found",
      });
    }

    console.log("exist....................", exist);

    const productDetails = {
      ...exist
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
