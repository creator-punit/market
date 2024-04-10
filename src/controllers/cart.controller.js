import { Cart } from "../db/models/cart.model.js";
import { CartProduct } from "../db/models/cart_product.model.js";
import { Product } from "../db/models/product.model.js";

const addToCart = async (req, res) => {
  try {
    const { cart_prod_id } = req.body;

    if (!cart_prod_id) {
      res.send({
        status: 0,
        msg: "cart_prod_id is required",
      });
    }

    const exist = await Cart.findAll({
      where: {
        cart_prod_id,
      },
    });

    if (exist.length) {
      res.send({
        status: 0,
        msg: "This product already exist in cart.",
      });
    }

    const addedCartProduct = await Cart.create({ cart_prod_id });

    if (!addedCartProduct) {
      res.semd({
        status: 0,
        msg: "interrnal server error saving product to cart",
      });
    }

    res.send({
      status: 1,
      msg: "Product successfully added to cart",
    });
  } catch (error) {
    throw error;
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { cart_prod_id } = req.body;

    if (!cart_prod_id) {
      res.send({
        status: 0,
        msg: "cart_prod_id is required",
      });
    }

    const exist = await Cart.findAll({
      where: {
        cart_prod_id,
      },
    });

    if (!exist.length) {
      res.send({
        status: 0,
        msg: "This product does not exist in cart.",
      });
    }

    const removedCartProduct = await Cart.delete({ cart_prod_id });

    if (!removedCartProduct) {
      res.semd({
        status: 0,
        msg: "interrnal server error deleting product from cart",
      });
    }

    res.send({
      status: 1,
      msg: "Product successfully removed from cart",
    });
  } catch (error) {
    throw error;
  }
};

const getCartProducts = async () => {
  try {
    const { cart_id } = req.body;

    if (!cart_id) {
      return res.send({
        status: 0,
        message: "no cart id found",
      });
    }

    const prod_id_array = await Cart.findAll({
      attributes: ["cart_prod_id"],
      where: { cart_id },
    });

    if (!prod_id_array.length) {
      return res.send({
        status: 0,
        message: "no product found",
      });
    }

    const cartProductIDs = await CartProduct.findAll({
      attributes: ["cart_prod_id"],
      where: { cart_prod_id: prod_id_array },
    });

    const cartProductDetails = await Product.findAll({
      attributes: [
        "prod_name",
        "prod_description",
        "prod_selling_price",
        "prod_listing_price",
        "discount",
        "prod_media_id",
      ],
      where: { prod_id: cartProductIDs },
    });

    if (!cartProductDetails.length) {
      return res.send({
        status: 0,
        message: "no product found in cart",
      });
    }

    res.send({
      status: 1,
      cartProductDetails,
      message: "cart product details found successfully",
    });
  } catch (error) {
    throw error;
  }
};

export { addToCart, removeFromCart, getCartProducts };
