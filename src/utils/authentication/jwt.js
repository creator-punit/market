import jwt from "jsonwebtoken";

const generateJWT = (payload,secret, expiry) => {
  return jwt.sign(payload, secret, { expiresIn: expiry })
};

export { generateJWT };
