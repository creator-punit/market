import { DataTypes } from "sequelize";
import { sequelize } from "../db-connect.js";

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    lastName: {
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
      type: DataTypes.STRING,
      references: {
        model: Cart,
        key: "cart_id",
      },
    },
    history_id: {
      type: DataTypes.STRING,
      references: {
        model: History,
        key: "history_id",
      },
    },
  },
  {
    // Other model options go here
    timestamps: true,
  }
);

export { User };
