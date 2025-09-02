import mongoose from 'mongoose'

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    education: [{
        institution: String,
        degree: String,
        field: String,
        startYear: Number,
        endYear: Number,
        current: {
            type: Boolean,
            default: false
        }
    }],
    skills: [{
        name: {
            type: String,
            required: true
        },
        level: {
            type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
        },
        category: String
    }],
    projects: [
        {
            title: {
                type: String, required: true
            },
            description: String,
            technologies: [String],
            links: {
                github: String,
                demo: String,
                other: String
            },
            status: {
                type: String,
                enum: ['Completed', 'In Progress', 'Planning']
            },
            startDate: Date,
            endDate: Date
        }
    ],
    work: [{
        company: { type: String, required: true },
        position: { type: String, required: true },
        startDate: Date,
        endDate: Date,
        current: { type: Boolean, default: false },
        description: String,
        technologies: [String]
    }],
    links: {
        github: String,
        linkedin: String,
        portfolio: String,
        resume: String
    },
    bio: String,
    location: String,
    profilePicture: String
}, {
    timestamps: true
})



const Profile = mongoose.model('Profile', profileSchema)

export default Profile