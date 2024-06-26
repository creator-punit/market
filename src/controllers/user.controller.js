import bcrypt from "bcrypt";
import { User } from "../db/models/user.model.js";
import { handleError } from "../utils/handler/error.handler.js";

const registerUser = async (req, res) => {
  const { firstname, lastname, phone, email, password } = req.body;

  if (!firstname && !lastname && !phone && !email && !password) {
    res.send({
      status: 0,
      msg: "required credentials missing",
    });
  }

  const exist = await User.find({ $or: [{ email }, { phone }] });

  if (exist.length) {
    res.send({
      status: 0,
      msg: "user already exists with given phone or email",
    });
  }

  const user = {
    firstname,
    lastname,
    phone,
    email,
    password,
  };

  const createdUser = await User.create(user);

  if (!createdUser) {
    res.status(500).send({
      status: 0,
      msg: "failed to add user to database",
    });
  }

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

    const exist = await User.find(where);

    if (!exist.length) {
      res.send({
        status: 0,
        message: "No account exists with the given credentials",
      });
    }
    const user = exist[0];

    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      res.send({
        status: 0,
        message: "entered password is incorrect",
      });
    }

    const refreshToken = await user.generateRefreshToken(exist._id);
    const accessToken = await user.generateAccessToken(exist);

    const userDetails = {
      name: user.firstname + " " + user.lastname,
      phone: user.phone,
      email: user.email,
      refreshToken: refreshToken,
    };

    const updateTokenData = await User.findOneAndUpdate(
      { _id: user._id },
      { refreshToken },
      { new: true, useFindAndModify: false }
    );

    if (!updateTokenData) {
      res.send(handleError());
    }
    res.send({
      status: 1,
      data: userDetails,
      token: accessToken,
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
