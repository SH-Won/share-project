import mongoose from 'mongoose'
const connection = {} as { isConnected: number }

const dbConnect = async () => {
  if (connection.isConnected) {
    return
  }
  const db = await mongoose.connect(process.env.NEXT_MONGO_URI, {
    dbName: 'main',
  })
  connection.isConnected = db.connections[0].readyState

  return db
}

export default dbConnect
