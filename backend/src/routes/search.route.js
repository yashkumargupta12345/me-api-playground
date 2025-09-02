import express from 'express'
import { searchResults } from '../controllers/search.controller.js'

const searchRouter = express.Router()

// Global search endpoint
searchRouter.get('/', searchResults)


export default searchRouter