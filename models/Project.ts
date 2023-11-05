import mongoose, { Schema } from 'mongoose'
const ProductSchema = new mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
      maxlength: 50,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: Number,
    },
  },
  { timestamps: true }
)
export default mongoose.models.Products ||
  mongoose.model('Products', ProductSchema)
