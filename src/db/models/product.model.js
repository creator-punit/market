import { DataTypes } from "sequelize";
import { sequelize } from "../db-connect.js";

const Product = sequelize.define(
  "Product",
  {
    prod_name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    prod_description: {
      type: DataTypes.STRING,
    },
    prod_listing_price: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    prod_selling_price: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    discount: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    discount: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    discount: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "user_id",
      },
    },
    prod_media_id: {
      type: DataTypes.STRING,
    //   references: {
    //     model: User,
    //     key: "user_id",
    //   },
    },
  },
  {
    // Other model options go here
    timestamps: true,
    id: "product_id",
  }
);

await Product.sync();

export { Product };
