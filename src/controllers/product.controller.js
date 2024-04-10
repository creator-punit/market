import { Product } from "../db/models/product.model.js";
import { ProductListing } from "../db/models/product_listing.model.js";

const registerProduct = async (req, res) => {
  try {
    const { prod_name, prod_description, user_id } = req.body;

    if (!prod_name && !prod_description && !user_id) {
      return res.send({
        status: 0,
        message: "product details missing",
      });
    }

    const productDetails = {
      prod_name,
      prod_description,
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
      attributes: ["prod_name", "prod_description", "user_id"],
      where: { prod_id },
    });

    if (!exist.length) {
      return res.send({
        status: 0,
        message: "no product found",
      });
    }

    const productDetails = {
      ...exist,
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

const listProduct = async (req, res, next) => {
  try {
    const {
      prod_id,
      prod_name,
      prod_listing_price,
      prod_selling_price,
      quantity,
    } = req.body;

    if (
      !prod_name &&
      !prod_id &&
      !prod_listing_price &&
      !prod_selling_price &&
      !quantity
    ) {
      return res.send({
        status: 0,
        message: "product listing details missing",
      });
    }

    const exist = await Product.findAll({
      where: { prod_id },
    });

    if (exist.lemgth) {
      return res.send({
        status: 0,
        message: "product has already been listed",
      });
    }

    const productListingDetails = {
      prod_id,
      prod_name,
      prod_listing_price,
      prod_selling_price,
      quantity,
      is_listed:true,
    };

    const listedProduct = await ProductListing.create(productListingDetails);

    if (!listedProduct) {
      return res.send({
        status: 0,
        message: "Internal error! could not list product",
      });
    }

    return res.send({
      status: 1,
      message: "Product successfully listed",
    });
  } catch (error) {
    throw error;
  }
};
const unlistProduct = async (req, res, next) => {
  try {
    const {
      listing_id
    } = req.body;

    if (!listing_id) {
      return res.send({
        status: 0,
        message: "product listing id required",
      });
    }

    const exist = await Product.findAll({
      where: { prod_id },
    });

    if (!exist.lemgth) {
      return res.send({
        status: 0,
        message: "product has has not been listed yet",
      });
    }

    const productListingDetails = {
      is_listed:false
    };

    const unlistedProduct = await ProductListing.update(productListingDetails, {
      where: { prod_id },
    });

    if (!unlistedProduct) {
      return res.send({
        status: 0,
        message: "Internal error! could not unlist product",
      });
    }

    return res.send({
      status: 1,
      message: "Product successfully unlisted",
    });
  } catch (error) {
    throw error;
  }
};

export {
  registerProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  listProduct,
  unlistProduct,
};
