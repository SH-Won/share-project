import mongoose from 'mongoose'

const clippingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
  },
})

export default mongoose.models.Clipping || mongoose.model('Clipping', clippingSchema)
