import { Cart } from "../db/models/user.model.js";

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
    throw error
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


export { addToCart, removeFromCart };
