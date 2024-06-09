import { User } from "../db/models/user.model.js";
import { handleError } from "../utils/handler/error.handler.js";

const tokenVerification = async (req, res, next) => {
  try {
    const { refreshtoken } = req.headers;

    if (!refreshtoken) {
      console.log("No refresh token provided");
      return res.status(400).send("Refresh token is required");
    }

    const user = await User.findOne({ refreshToken: refreshtoken });

    if (!user) {
      console.log("No user found with the provided refresh token");
      return res.status(404).send("User not found");
    }

    if (!user) {
      res.send({
        status: 400,
        message: "invalid user token!",
      });
    }
    next();
  } catch (error) {
    console.error("Error finding user with refresh token:", error);
    return res.send(handleError());
  }
};

export { tokenVerification };
