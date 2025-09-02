import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware for security
app.use(cors())

//MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.error("MongoDB connection error: ", err))


app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})

export default app

