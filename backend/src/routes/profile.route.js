import express from 'express'
import {
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
} from '../controllers/profile.controller.js'

const profileRouter = express.Router()

profileRouter.get('/', getProfile)
profileRouter.post('/', createProfile)
profileRouter.put('/', updateProfile)
profileRouter.delete('/', deleteProfile)

export default profileRouter