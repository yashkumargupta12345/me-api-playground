import express from 'express'
import mongoose from 'mongoose'

const healthRouter = express.Router()

healthRouter.get('/', (req, res) => {
    try {
        const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'

        res.status(200).json({
            status: 'OK',
            timestamp: new Date().toISOString(),
            database: dbStatus,
            uptime: process.uptime()
        })
    } catch (error) {
        res.status(500).json({
            status: 'ERROR',
            message: error.message
        });
    }
})

export default healthRouter
