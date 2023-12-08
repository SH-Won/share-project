import mongoose, { Mongoose, Types } from 'mongoose'

// const userInfoSchema = new mongoose.Schema({
//   favorites: {
//     type: mongoose.Schema.Types.Map,
//     of: new mongoose.Schema({
//       project: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Project',
//       },
//     }),
//   },
// })
// const favoriteSchema = new mongoose.Schema({
//   projectId : {
//     type : mongoose.Schema.Types.ObjectId,
//   }
// })
const userInventorySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    name: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
    },
    // imageUrl: {
    //   type: String,
    // },
    // imagePublicId: {
    //   type: String,
    // },
    works: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'Project',
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'Project',
    },
    clippings: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: 'Project',
    },
    totalProjectCount: {
      type: Number,
      default: 0,
    },
    totalFavoriteCount: {
      type: Number,
      default: 0,
    },
    totalClippingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
)

export default mongoose.models.UserInventory || mongoose.model('UserInventory', userInventorySchema)
