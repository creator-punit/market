import pkg from "jsonwebtoken";
const { jwt } = pkg;

const generateJWT = (user) => {
  jwt.sign(user, process.env.SECRET).then((token) => token);
};

export { generateJWT };
