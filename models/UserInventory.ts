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
const userInventorySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  clipping: {
    type: Array,
    default: [],
  },
})

export default mongoose.models.UserInventory || mongoose.model('UserInventory', userInventorySchema)
