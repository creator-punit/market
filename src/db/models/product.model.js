import { model, Schema } from "mongoose";

const ImageSchema = new Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const VideoSchema = new Schema({
  src: {
    type: String,
    required: true,
  },
  alt: {
    type: String,
    required: true,
  },
});

const SizeSchema = new Schema({
  size: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

const ColorSchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
});

const productSchema = new Schema(
  {
    prod_name: {
      type: String,
      required: true,
    },
    prod_description: {
      type: String,
      required: true,
    },
    prod_price: {
      type: Number,
      required: true,
    },
    prod_default_img: {
      type: String,
    },
    prod_created_by: {
      type: String,
      required: true,
    },
    prod_media_imgs: [ImageSchema],
    prod_media_vds: [VideoSchema],
    prod_sizes: [SizeSchema],
    prod_colors: [ColorSchema],
  },
  {
    timestamps: true,
  }
);

// //A method--pre--from mongoose that runs a function just before an action---here the action is set to saving data.
// productSchema.pre("save", async function (next) {
//   //Above an arrow function is not used as it does not have access to 'this'

//   if (!this.isModified("password")) return next();

//   //bcrypt hash method with 10 iterations of its algorithm
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });

// productSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password);
// };

export const Product = model("Product", productSchema);
