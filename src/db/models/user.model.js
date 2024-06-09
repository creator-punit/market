import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { generateJWT } from "../../utils/authentication/jwt.js";

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profile_img: {
      type: String, //Cloudnary URL
    },
    refreshToken: {
      type: String,
    },
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

userSchema.methods.generateAccessToken = function () {
  return generateJWT(
    {
      _id: this._id,
      email: this.email,
      phone: this.phone,
      firstname: this.firstname,
      lastname: this.lastname,
    },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    process.env.JWT_ACCESS_TOKEN_EXPIRY
  );
};

userSchema.methods.generateRefreshToken = function (payload) {
  return generateJWT(
    {
      _id: this._id,
    },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    process.env.JWT_REFRESH_TOKEN_EXPIRY
  );
};

export const User = model("User", userSchema);
