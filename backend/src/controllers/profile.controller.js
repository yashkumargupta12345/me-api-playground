import Profile from "../models/profile.model.js";


// Get Profile
export const getProfile = async (req, res) => {
    try {
        const profile = await Profile.findOne()

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }
        res.json(profile)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Create Profile
export const createProfile = async (req, res) => {
    try {
        const existingProfile = await Profile.findOne()
        if (existingProfile) {
            return res.status(400).json({ message: 'Profile already exists. Use PUT to update.' })
        }

        const profile = new Profile(req.body)
        await profile.save()
        res.status(201).json(profile)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// Update profile
export const updateProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndUpdate(
            {},
            req.body,
            { new: true, runValidators: true }
        )

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }

        res.json(profile)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}


// Delete Profile
export const deleteProfile = async (req, res) => {
    try {
        const profile = await Profile.findOneAndDelete()
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }
        res.json({ message: 'Profile deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


