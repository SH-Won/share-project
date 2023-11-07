import mongoose from 'mongoose'
const connection = {} as { isConnected: number }

const dbConnect = async () => {
  console.log('init db')
  if (connection.isConnected) {
    console.log('already connected')
    return
  }
  const db = await mongoose.connect(process.env.NEXT_MONGO_URI, {
    dbName: 'main',
  })
  connection.isConnected = db.connections[0].readyState
  return db
}

export default dbConnect
