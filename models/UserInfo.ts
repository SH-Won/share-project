import mongoose from 'mongoose'

// const userInfoSchema = new mongoose.Schema({
//   type: mongoose.Schema.Types.Map,
//   of: new mongoose.Schema({
//     userId: {
//       type: mongoose.Schema.Types.Map,
//       of: new mongoose.Schema({
//         favorites: {
//           type: mongoose.Schema.Types.Map,
//           of: new mongoose.Schema({
//             type: mongoose.Schema.Types.ObjectId,
//             ref: 'Project',
//           }),
//         },
//       }),
//     },
//   }),
// })
const userInfoSchema = new mongoose.Schema({
  favorites: {
    type: mongoose.Schema.Types.Map,
    of: new mongoose.Schema({
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
      },
    }),
  },
})

export default mongoose.models.UserInfo || mongoose.model('UserInfo', userInfoSchema)
