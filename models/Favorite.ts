import mongoose from 'mongoose'

const favoriteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  projectId: {
    type: mongoose.Types.ObjectId,
    ref: 'Project',
  },
})

export default mongoose.models.Favorite || mongoose.model('Favorite', favoriteSchema)
