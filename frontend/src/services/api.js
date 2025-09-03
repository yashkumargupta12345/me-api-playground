import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})


// Profile API
export const profileAPI = {
    getProfile: () => api.get('/profile'),
    createProfile: (data) => api.post('/profile', data),
    updateProfile: (data) => api.put('/profile', data),
    deleteProfile: () => api.delete('/profile'), 
}


// projects Api
export const projectsAPI = {
  getProjects: (skill = '') => api.get(`/projects${skill ? `?skill=${skill}` : ''}`),
  getProjectById: (id) => api.get(`/projects/${id}`),
};


// Skills api
export const skillsAPI = {
  getSkills: () => api.get('/skills'),
  getTopSkills: () => api.get('/skills/top'),
  getSkillsByCategory: (category) => api.get(`/skills/category/${category}`),
};


// Search API
export const searchAPI = {
  search: (query) => api.get(`/search?q=${encodeURIComponent(query)}`),
};


// Health API
export const healthAPI = {
  getHealth: () => api.get('/health'),
};


export default api
