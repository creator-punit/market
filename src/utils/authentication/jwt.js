import { jwt } from "jsonwebtoken";

const generateJWT = (user) => {
  jwt.sign(user, process.env.SECRET).then((token) => token);
};

export { generateJWT };
