import mongoose from 'mongoose'
const ProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      maxlength: 50,
    },
    label: {
      type: String,
      maxlength: 50,
    },
    description: {
      type: String,
    },
    category: {
      type: Number,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
)
export default mongoose.models.Products || mongoose.model('Products', ProductSchema)
