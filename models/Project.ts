import mongoose, { Schema } from 'mongoose'
const ProjectSchema = new mongoose.Schema(
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
    imagePublicId: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { timestamps: true }
)
export default mongoose.models.Projects || mongoose.model('Projects', ProjectSchema)
