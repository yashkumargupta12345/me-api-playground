# Me-API Playground - Backend Schema Documentation

## Database Schema

### Profile Model
The main profile schema that contains all user information including personal details, education, work experience, skills, and projects.

```javascript
{
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
  bio: String,
  location: String,
  profilePicture: String,
  
  // Education array
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
  
  // Skills array
  skills: [{
    name: {
      type: String,
      required: true
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
    },
    category: String
  }],
  
  // Projects array
  projects: [{
    title: {
      type: String,
      required: true
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
  }],
  
  // Work experience array
  work: [{
    company: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    startDate: Date,
    endDate: Date,
    current: {
      type: Boolean,
      default: false
    },
    description: String,
    technologies: [String]
  }],
  
  // Social/professional links
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    resume: String
  },
  
  timestamps: true 
}
```

