import { default as userRouter } from "./user.routes.js";

export const Routing = (app) => {
  app.use("/api/v1/user", userRouter);
};
