import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
  },
  projectId: {
    type: mongoose.Types.ObjectId,
  },
})

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema)
