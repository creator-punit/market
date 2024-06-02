// import { DataTypes } from "sequelize";
// import { sequelize } from "../db-connect.js";
// import { User } from "./user.model.js";

// const Product = sequelize.define(
//   "Product",
//   {
//     prod_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     prod_name: {
//       type: DataTypes.STRING,
//       // allowNull: false,
//     },
//     prod_description: {
//       type: DataTypes.TEXT,
//     },
//     user_id: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: User,
//         key: "user_id",
//       },
//     },
//     prod_img: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//     },
//     prod_vid: {
//       type: DataTypes.ARRAY(DataTypes.STRING),
//     },
//   },
//   {
//     // Other model options go here
//     timestamps: true,
//     id: "product_id",
//   }
// );

// await Product.sync();

// export { Product };
