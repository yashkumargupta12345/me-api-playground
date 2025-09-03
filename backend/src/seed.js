import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Profile from './models/profile.model.js'

dotenv.config()

const seedData = {
    name: "Yash Kumar Gupta",
    email: "guptayashyg45227@gmail.com",
    bio: "full stack developer passionate about creating innovative solutions using modern web technologies",
    location: "India",
    education: [
        {
            institution: "IIIT Kottayam", 
            degree: "Bachelor of Technology",
            field: "Computer Science",
            startYear: 2022,
            endYear: 2026,
            current: true
        }
    ],
    skills: [
        { name: "JavaScript", level: "intermediate", category: "Programming" },
        { name: "React", level: "intermediate", category: "Frontend" },
        { name: "Node.js", level: "intermediate", category: "Backend" },
        { name: "MongoDB", level: "Advanced", category: "Database" },
        { name: "Express.js", level: "Advanced", category: "Backend" },
        { name: "Python", level: "Intermediate", category: "Programming" },
        { name: "Git", level: "Advanced", category: "Tools" },
        { name: "Tailwind CSS", level: "Intermediate", category: "Frontend" },
        { name: "HTML", level: "Expert", category: "Frontend" },
        { name: "CSS", level: "Advanced", category: "Frontend" }
    ],
    projects: [
        {
            title: "Me-API Playground",
            description: "A personal portfolio API with MongoDB backend and React frontend using Tailwind css",
            technologies: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "Tailwind CSS"],
            links: {
                github: "https://github.com/yashkumargupta12345",
                demo: "https://your-app.vercel.app"
            },
            status: "In Progress",
            startDate: new Date("2025-09-02")
        },
        {
            title: "Quick AI",
            description: "A full-stack movie ticket booking platform",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            links: {
                github: "https://github.com/yashkumargupta12345/quickai"
            },
            status: "Completed",
            startDate: new Date("2024-07-17"),
            endDate: new Date("2024-07-24")
        }
    ],
    work: [
        {
            company: "Tech Startup",
            position: "Full Stack Developer Intern",
            startDate: new Date("2024-12-01"),
            endDate: new Date("2024-12-30"),
            current: false,
            description: "Developed web applications using React, Node.js, and MongoDB. Collaborated with team to implement new features and optimize performance.",
            technologies: ["React", "Node.js", "MongoDB", "Express.js"]
        }
    ],
    links: {
        github: "https://github.com/yashkumargupta12345",
        linkedin: "https://www.linkedin.com/in/yash-kumar-gupta-47762424a/",
        portfolio: "https://portfolio-yash-lilac.vercel.app/",
        resume: "https://drive.google.com/file/d/15qQhomRc0au_tPrQS9Tffue4Gf-AWAcv/view?usp=sharing"
    }
}

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')
        
        await Profile.deleteMany({})
        
        const profile = new Profile(seedData)
        await profile.save()
        
        console.log('Database seeded successfully!')
        console.log('Profile created:', profile.name)
        process.exit(0)
    } catch (error) {
        console.error('Error seeding database:', error)
        process.exit(1)
    }
}

seedDatabase()