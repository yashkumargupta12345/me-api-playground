import mongoose from 'mongoose'
import Profile from '../models/profile.model.js'


export const getProjects = async (req, res) => {
    try {
        const { skill } = req.query
        const profile = await Profile.findOne()

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }

        let projects = profile.projects

        if (skill) {
            projects = projects.filter(project =>
                project.technologies.some(tech =>
                    tech.toLowerCase().includes(skill.toLowerCase())
                )
            )
        }

        res.json(projects)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


// Get project by ID
export const getProjectsById = async (req, res) => {
    try {
        const profile = await Profile.findOne()
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }

        const project = profile.projects.id(req.params.id)
        if (!project) {
            return res.status(404).json({ message: 'Project not found' })
        }

        res.json(project)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
