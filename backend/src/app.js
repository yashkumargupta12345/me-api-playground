import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'


// Import Routes
import healthRouter from './routes/health.route.js'
import profileRouter from './routes/profile.route.js'
import projectRouter from './routes/project.route.js'



dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware for security
app.use(cors())
app.use(express.json())


//MongoDB connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log('Connected to MongoDB')).catch(err => console.error("MongoDB connection error: ", err))


// Routes
app.use('/api/health', healthRouter)
app.use('/api/profile', profileRouter)
app.use('/api/projects', projectRouter)

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})

export default app

