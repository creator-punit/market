import { DataTypes } from "sequelize";
import { sequelize } from "../db-connect.js";
import { User } from "./user.model.js";

const Product = sequelize.define(
  "Product",
  {
    prod_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    prod_name: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    prod_description: {
      type: DataTypes.TEXT,
    },
    prod_listing_price: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    prod_selling_price: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      // allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
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

await Product.sync({force:true});

export { Product };
