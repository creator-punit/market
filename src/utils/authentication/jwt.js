import jwt from "jsonwebtoken";

const generateJWT = (user) => {
  return jwt.sign(user, process.env.SECRET)
};

export { generateJWT };
