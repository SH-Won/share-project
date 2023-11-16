import mongoose, { ConnectionStates } from 'mongoose'

let connection: typeof mongoose | null = null
const poolsize = 10

export const dbConnect = async () => {
  console.log('connect status', connection?.connection.readyState)
  if (
    !connection ||
    (connection.connection.readyState !== ConnectionStates.connected &&
      connection.connection.readyState !== ConnectionStates.connecting)
  ) {
    // console.log('[MONGOOSE] Creating New Connection')

    mongoose.connection.on('open', () => {
      // console.log(`[MONGOOSE] Connected with poolSize ${poolsize}`)
    })

    try {
      await mongoose.connect(process.env.NEXT_MONGO_URI, {
        dbName: 'main',
      })
      mongoose.set('bufferTimeoutMS', 2500)
    } catch (err) {
      console.log('Mongoose connection error', err)
    }
    connection = mongoose
    return connection
  } else {
    return connection
  }
}

export default dbConnect
