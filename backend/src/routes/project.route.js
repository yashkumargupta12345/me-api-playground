import express from 'express'
import { getProjects, getProjectsById } from '../controllers/project.controller.js'

const projectRouter = express.Router()

// Get all projects with optional skill filter
projectRouter.get('/', getProjects)


// Get project by ID
projectRouter.get('/:id', getProjectsById)

export default projectRouter


