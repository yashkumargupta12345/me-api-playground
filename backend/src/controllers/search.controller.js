import Profile from "../models/profile.model.js"


// Global search endpoint
export const searchResults = async (req, res) => {
    try {
        const { q } = req.query
        
        if (!q) {
            return res.status(400).json({ message: 'Search query is required' })
        }
        
        const profile = await Profile.findOne()
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' })
        }
        
        const searchTerm = q.toLowerCase()
        const results = {
            skills: [],
            projects: [],
            work: [],
            education: []
        }
        
        // search in skills
        results.skills = profile.skills.filter(skill =>
            skill.name.toLowerCase().includes(searchTerm) ||
            (skill.category && skill.category.toLowerCase().includes(searchTerm))
        )
        
        // Search in projeects
        results.projects = profile.projects.filter(project =>
            project.title.toLowerCase().includes(searchTerm) ||
            (project.description && project.description.toLowerCase().includes(searchTerm)) ||
            project.technologies.some(tech => tech.toLowerCase().includes(searchTerm))
        )
        
        // search in Work experience
        results.work = profile.work.filter(job =>
            job.company.toLowerCase().includes(searchTerm) ||
            job.position.toLowerCase().includes(searchTerm) ||
            (job.description && job.description.toLowerCase().includes(searchTerm)) ||
            (job.technologies && job.technologies.some(tech => tech.toLowerCase().includes(searchTerm)))
        )
        
        // search in education
        results.education = profile.education.filter(edu =>
            (edu.institution && edu.institution.toLowerCase().includes(searchTerm)) ||
            (edu.degree && edu.degree.toLowerCase().includes(searchTerm)) ||
            (edu.field && edu.field.toLowerCase().includes(searchTerm))
        )
        
        // total results
        const totalResults = results.skills.length + results.projects.length + 
                           results.work.length + results.education.length
        
        res.json({
            query: q,
            totalResults,
            results
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
