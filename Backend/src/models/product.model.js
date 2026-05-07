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
    createdBy: {
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
        enum: ["USD", "EUR", "INR", "KWD"],
        default: "KWD",
      },
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

const productModel = mongoose.model("product", productSchema);
export default productModel;
