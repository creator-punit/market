import { DataTypes } from "sequelize";
import { sequelize } from "../db-connect.js";

const Cart = sequelize.define(
  "Cart",
  {
    cart_id: {
      type: DataTypes.STRING,
    },
    cart_prod_id: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    timestamps: true,
    id: "cart_id",
  }
);

await Cart.sync();

export { Cart };
