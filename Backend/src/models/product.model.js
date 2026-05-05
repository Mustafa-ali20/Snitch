import mongoose, { Mongoose, Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    seller: {
      required: true,
      type: mongoose.Schema.ObjectId,
      ref: "user",
    },
    price: {
      amount: {
        type: Number,
        required: true,
      },
      currency: {
        type: String,
        enum: ["USD", "EUR", "INR"],
        default: "KWD",
      },
    },
    images: {
      url: {
        type: String,
        required: true,
      },
      //   alt: {
      //     type: String,
      //     required: true,
      //   },
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model("product", productSchema);
export default productModel;
