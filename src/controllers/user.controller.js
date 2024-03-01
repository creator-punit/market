import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { User } from "../db/models/user.model.js";

const registerUser = async (req, res) => {
  console.log(req.body, "-------------------1");
  const { firstname, lastname, phone, email, password } = req.body;

  if (!firstname && !lastname && !phone && !email && !password) {
    res.send({
      status: 0,
      msg: "required credentials missing",
    });
  }

  const exist = await User.findAll({
    where: {
      [Op.or]: [{ email }, { phone }],
    },
  });

  if (exist.length) {
    res.send({
      status: 0,
      msg: "user already exists with given phone or email",
    });
  }

  await bcrypt.hash(password, 10, async function (err, hash) {
    const user = {
      firstname,
      lastname,
      phone,
      email,
      password: hash,
    };
    const createdUser = await User.create(user);

    if (!createdUser) {
      res.status(500).send({
        status: 0,
        msg: "failed to add user to database",
      });
    }
  });

  res.send({
    status: 1,
    msg: "user successfully added",
  });
};

const loginUser = async (req, res) => {
  const { phone, email, password } = req.body;
};
const updateUser = async (req, res) => {
  const { phone, email, password } = req.body;
};
const deleteUser = async (req, res) => {
  const { phone, email, password } = req.body;
};

export { registerUser, loginUser, updateUser, deleteUser };
