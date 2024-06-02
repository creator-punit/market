import { DataTypes } from "sequelize";
import { sequelize } from "../db-connect.js";
import { Cart } from "./cart.model.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey:true
    },
    firstname: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    cart_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Cart,
        key: "cart_id",
      },
    },
    history_id: {
      type: DataTypes.STRING,
      // references: {
      //   model: History,
      //   key: "history_id",
      // },
    },
    profile_img: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    timestamps: true,
    id: "user_id",
  }
);

await User.sync();

export { User };
