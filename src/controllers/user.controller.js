import { Op } from "sequelize";
import bcrypt from "bcrypt";
import { User } from "../db/models/user.model.js";

const registerUser = async (req, res) => {

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
  try {
    const { phone, email, password } = req.body;

    if (!phone && !email) {
      res.send({
        status: 0,
        message: "user phone number or email required",
      });
    }

    let where;

    if (phone) {
      where = {
        phone,
      };
    } else {
      where = {
        email,
      };
    }

    const exist = await User.findAll({ where });

    if (!exist.length) {
      res.send({
        status: 0,
        message: "No account exists with the given credentials",
      });
    }
    const user = exist[0].dataValues;

    await bcrypt.compare(password, user.password, async function (err, result) {
      if (!result) {
        res.send({
          status: 0,
          message: "The entered password is incorrect",
        });
      }
    });

    const userDetails = {
      name: user.firstname + " " + user.lastname,
      phone: user.phone,
      email: user.email,
      cart: user.cart_id,
      history: user.history_id,
    };

    res.send({
      status: 1,
      userDetails,
      message: "User is successfully loggedIn",
    });
  } catch (error) {
    throw error;
  }
};
const updateUser = async (req, res) => {
  const { phone, email, password } = req.body;
};
const deleteUser = async (req, res) => {
  try {
    const { phone, email, password } = req.body;

    if (!phone && !email) {
      return res.send({
        status: 0,
        message: "user phone number or email required",
      });
    }

    let where;

    if (phone) {
      where = {
        phone,
      };
    } else {
      where = {
        email,
      };
    }

    const exist = await User.findAll({ where });

    if (!exist.length) {
      return res.send({
        status: 0,
        message: "No account exists with the given credentials",
      });
    }

    const user = exist[0].dataValues;
    let isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.send({
        status: 0,
        message: "The entered password is incorrect",
      });
    }

    const userDeleted = await User.destroy({
      where: {
        phone,
      },
    });

    if (!userDeleted) {
      return res.send({
        status: 0,
        message: "Internal error deleting User",
      });
    }

    return res.send({
      status: 1,
      message: "User is successfully deleted",
    });
  } catch (error) {
    throw error;
  }
};

export { registerUser, loginUser, updateUser, deleteUser };
