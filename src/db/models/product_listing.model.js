// import { DataTypes } from "sequelize";
// import { sequelize } from "../db-connect.js";
// import { User } from "./user.model.js";

// const ProductListing = sequelize.define(
//   "ProductListing",
//   {
//     prod_listing_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     prod_id: {
//       type: DataTypes.INTEGER,
//     },
//     prod_name: {
//       type: DataTypes.STRING,
//       // allowNull: false,
//     },
//     prod_listing_price: {
//       type: DataTypes.INTEGER,
//       // allowNull: false,
//     },
//     prod_selling_price: {
//       type: DataTypes.INTEGER,
//       // allowNull: false,
//     },
//     discount: {
//       type: DataTypes.INTEGER,
//       // allowNull: false,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       // allowNull: false,
//     },
//     is_listed: {
//       type: DataTypes.BOOLEAN,
//       // allowNull: false,
//     },
//   },
//   {
//     // Other model options go here
//     timestamps: true,
//     id: "product_listing_id",
//   }
// );

// await ProductListing.sync();

// export { ProductListing };
