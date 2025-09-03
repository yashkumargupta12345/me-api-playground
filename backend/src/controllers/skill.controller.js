import Profile from "../models/profile.model.js";


// Get all skills
export const getSkills = async(req, res) => {
    try {
        const profile = await Profile.findOne()
        if(!profile){
            return res.status(404).json({ message: 'Profile not found' })
        }

        res.json(profile.skills)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Get top skills
export const getTopSkills = async (req, res) => {
    try {
        const profile = await Profile.findOne()
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }
        
        const topSkills = profile.skills.filter(skill => 
            skill.level === 'Expert' || skill.level === 'Advanced'
        )
        
        res.json(topSkills)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Get skills by category
export const getSkillsByCategory =  async (req, res) => {
    try {
        const { category } = req.params
        const profile = await Profile.findOne()
        
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }
        
        const categorySkills = profile.skills.filter(skill => 
            skill.category && skill.category.toLowerCase() === category.toLowerCase()
        )
        
        res.json(categorySkills)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

