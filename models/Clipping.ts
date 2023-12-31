import mongoose from 'mongoose'

const clippingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    projectId: {
      type: mongoose.Types.ObjectId,
      ref: 'Project',
    },
  },
  { timestamps: true }
)

export default mongoose.models.Clipping || mongoose.model('Clipping', clippingSchema)
