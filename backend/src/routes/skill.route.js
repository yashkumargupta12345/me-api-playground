import express from 'express'
import { getSkills, getSkillsByCategory, getTopSkills } from '../controllers/skill.controller.js'

const skillRouter = express.Router()


// GEt all skills
skillRouter.get("/", getSkills)


// Get top skills
skillRouter.get("/top", getTopSkills)


// get skills by category
skillRouter.get("/category/:category", getSkillsByCategory)


export default skillRouter