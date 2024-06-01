import { DataTypes } from "sequelize";
import { sequelize } from "../db-connect.js";
import { User } from "./user.model.js";

const Address = sequelize.define(
  "Address",
  {
    address_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    add_firstname: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    add_lastname: {
      type: DataTypes.STRING,
    },
    add_phone: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    add_locality: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    add_street: {
      type: DataTypes.STRING,
      // allowNull: false,
    },
    add_city: {
      type: DataTypes.STRING,
    },
    add_state: {
      type: DataTypes.STRING,
    },
    add_landmark: {
      type: DataTypes.STRING,
    },
    add_alt_phone: {
      type: DataTypes.STRING,
    },
  },
  {
    // Other model options go here
    timestamps: true,
    id: "address_id",
  }
);

await Address.sync();

export { Address };
