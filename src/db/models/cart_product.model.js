import { DataTypes } from "sequelize";
import { sequelize } from "../db-connect.js";

const Cart = sequelize.define(
  "Cart",
  {
    cart_prod_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    prod_id: {
      type: DataTypes.STRING,
    },
    prod_quantity: {
      type: DataTypes.INTEGER,
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
