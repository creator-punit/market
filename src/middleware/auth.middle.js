import { User } from "../db/models/user.model";

const tokenVerification = async (req, res, next) => {
  const refreshToken = req.header.refreshToken;
  const exist = User.find({ refreshToken });
  const user = exist[0];
  if (!user) {
    res.send({
      status: 400,
      message: "invalid user token!",
    });
  }
  req.user = user;
  next();
};

export { tokenVerification };
