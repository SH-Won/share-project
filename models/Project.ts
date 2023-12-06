import mongoose, { Schema } from 'mongoose'
const ProjectSchema = new mongoose.Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: String,
      maxlength: 50,
    },
    thumbnail: {
      type: Object,
      default: {
        imageUrl: '',
        imagePublicId: '',
      },
    },
    blocks: {
      type: Array,
      default: [],
    },
    category: {
      type: Number,
    },
    link: {
      type: String,
    },
    favoriteCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)
export default mongoose.models.Project || mongoose.model('Project', ProjectSchema)
