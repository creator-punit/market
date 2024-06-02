  import { model, Schema } from "mongoose";
  import jwt from "jsonwebtoken";
  import bcrypt from "bcrypt";

  const userSchema = new Schema(
    {
      firstname: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, //when the field is extensively used in searching
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
      },
      password: {
        type: String,
        required: [true, "Password is required"],
      },
      lastname: {
        type: String,
        required: true,
        trim: true,
        index: true,
      },
      coverImage: {
        type: String, //Cloudnary URL
      },
      avatar: {
        type: String, //Cloudnary URL
        required: true,
      },
      refreshToken: {
        type: String,
      },
      watchHistory: [
        {
          type: Schema.Types.ObjectId,
          ref: "Video",
        },
      ],
      // cartDetails: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: "Video",
      //   },
      // ],
    },
    {
      timestamps: true,
    }
  );

  //A method--pre--from mongoose that runs a function just before an action---here the action is set to saving data.
  userSchema.pre("save", async function (next) {
    //Above an arrow function is not used as it does not have access to 'this'

    if (!this.isModified("password")) return next();

    //bcrypt hash method with 10 iterations of its algorithm
    this.password = await bcrypt.hash(this.password, 10);
    next();
  });

  userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  userSchema.methods.generateAcessToken = function () {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullNamw,
      },
      process.env.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
      }
    );
  };

  userSchema.methods.generateRefreshToken = function (payload) {
    return jwt.sign(
      {
        _id: this._id,
      },
      process.env.JWT_REFRESH_TOKEN_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
      }
    );
  };

  export const User = model("User", userSchema);

