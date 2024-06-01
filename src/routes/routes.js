import { default as userRouter } from "./user.routes.js";
import { default as productRouter } from "./product.routes.js";

export const Routing = (app) => {
  app.use("/api/v1/user", userRouter);
  app.use("/api/v1/product", productRouter);
};
