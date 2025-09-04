# Me-API Playground

## 🚀 Live Demo
[Click here to view](https://me-api-playground-frontend-gules.vercel.app/)

## 📬 Postman Collection
[![Run in Postman](https://run.pstmn.io/button.svg)](https://api.postman.com/collections/39007991-2da14ac9-4659-4707-a1b4-24a084d6a270?access_key=PMAT-01K49GS11X8JPK379W3T2R04C6)


### Backend Architecture
```
backend/
├── src/
│   ├── app.js              
│   ├── seed.js             
│   ├── controllers/        
│   │   ├── profile.controller.js
│   │   ├── project.controller.js
│   │   ├── skill.controller.js
│   │   └── search.controller.js
│   ├── models/            
│   │   └── profile.model.js
│   └── routes/            
│       ├── profile.route.js
│       ├── project.route.js
│       ├── skill.route.js
│       ├── search.route.js
│       └── health.route.js
├── package.json
└── schema.md             
```

### Frontend Architecture
```
frontend/
├── src/
│   ├── App.jsx            
│   ├── main.jsx           
│   ├── components/       
│   │   ├── Navigation.jsx
│   │   ├── Loading.jsx
│   │   └── ErrorMessage.jsx
│   ├── pages/             
│   │   ├── Profile.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Search.jsx
│   │   └── Health.jsx
│   └── services/         
│       └── api.js
├── package.json
└── vercel.json           
```

### Technology Stack
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React, Vite, Tailwind CSS, React Router
- **Deployment**: Vercel
- **Database**: MongoDB Atlas

## 🚀 Setup Instructions

#### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- Git

#### Backend Setup
1. Clone the repository:
```bash
git clone https://github.com/yashkumargupta12345/me-api-playground.git
cd me-api-playground/backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/me-api-playground
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/me-api-playground
PORT=3000
```

4. Seed the database:
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

Backend will be running at `http://localhost:3000`

#### Frontend Setup
1. Navigate to frontend directory:
```bash
cd ../frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
```

4. Start the development server:
```bash
npm run dev
```

Frontend will be running at `http://localhost:5173`

### Production Deployment

#### Backend (Vercel)
1. Create `vercel.json` in backend directory:
```json
{
    "version": 2,
    "builds": [
        {
            "src": "src/app.js",
            "use": "@vercel/node"
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "src/app.js"
        }
    ]
}
```

2. Deploy to Vercel:
```bash
vercel --prod
```

3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: 3000

#### Frontend (Vercel)
1. Create `vercel.json` in frontend directory:
```json
{
    "rewrites": [
        {
            "source": "/(.*)",
            "destination": "/"
        }
    ]
}
```

2. Deploy to Vercel:
```bash
vercel --prod
```

3. Set environment variables:
   - `VITE_API_URL`: Your deployed backend URL

## 📊 Database Schema

### Profile Model
The main profile schema contains all user information:

```javascript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: String,
  location: String,
  profilePicture: String,
  
  education: [{
    institution: String,
    degree: String,
    field: String,
    startYear: Number,
    endYear: Number,
    current: Boolean
  }],
  
  skills: [{
    name: { type: String, required: true },
    level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
    category: String
  }],
  
  projects: [{
    title: { type: String, required: true },
    description: String,
    technologies: [String],
    links: {
      github: String,
      demo: String,
      other: String
    },
    status: { type: String, enum: ['Completed', 'In Progress', 'Planning'] },
    startDate: Date,
    endDate: Date
  }],
  
  work: [{
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: Date,
    endDate: Date,
    current: Boolean,
    description: String,
    technologies: [String]
  }],
  
  links: {
    github: String,
    linkedin: String,
    portfolio: String,
    resume: String
  }
}
```

## 🔌 API Endpoints

### Health
- `GET /api/health` - Check API health status

### Profile
- `GET /api/profile` - Get profile
- `POST /api/profile` - Create profile
- `PUT /api/profile` - Update profile
- `DELETE /api/profile` - Delete profile

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/top` - Get expert/advanced skills
- `GET /api/skills/category/:category` - Get skills by category

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects?skill=React` - Filter projects by skill
- `GET /api/projects/:id` - Get specific project

### Search
- `GET /api/search?q=keyword` - Global search across all data

## 📝 Sample API Requests

### Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Me-API Playground",
    "description": "Personal portfolio API endpoints"
  },
  "item": [
    {
      "name": "Health Check",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/health",
          "host": ["{{base_url}}"],
          "path": ["api", "health"]
        }
      }
    },
    {
      "name": "Get Profile",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/profile",
          "host": ["{{base_url}}"],
          "path": ["api", "profile"]
        }
      }
    },
    {
      "name": "Create Profile",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"bio\": \"Software Developer\"\n}"
        },
        "url": {
          "raw": "{{base_url}}/api/profile",
          "host": ["{{base_url}}"],
          "path": ["api", "profile"]
        }
      }
    },
    {
      "name": "Get All Skills",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/skills",
          "host": ["{{base_url}}"],
          "path": ["api", "skills"]
        }
      }
    },
    {
      "name": "Get Projects",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/projects",
          "host": ["{{base_url}}"],
          "path": ["api", "projects"]
        }
      }
    },
    {
      "name": "Search",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "{{base_url}}/api/search?q=React",
          "host": ["{{base_url}}"],
          "path": ["api", "search"],
          "query": [
            {
              "key": "q",
              "value": "React"
            }
          ]
        }
      }
    }
  ],
  "variable": [
    {
      "key": "base_url",
      "value": "http://localhost:3000"
    }
  ]
}
```

## ⚠️ Known Limitations

### Current Limitations
1. **Single User System**: The API is designed for a single profile only
2. **No Authentication**: No user authentication or authorization implemented
3. **No File Upload**: Profile pictures must be external URLs
4. **Limited Validation**: Basic input validation, could be more comprehensive
5. **No Rate Limiting**: API doesn't implement rate limiting


## 📄 Resume

**Yash Kumar Gupta**  
Full Stack Developer  
📄 **Resume**: [View Resume](https://drive.google.com/file/d/15qQhomRc0au_tPrQS9Tffue4Gf-AWAcv/view?usp=sharing)

### Contact Information
- 📧 Email: guptayashyg45227@gmail.com
- 🔗 LinkedIn: [linkedin.com/in/yash-kumar-gupta-47762424a](https://www.linkedin.com/in/yash-kumar-gupta-47762424a/)
- 🐙 GitHub: [github.com/yashkumargupta12345](https://github.com/yashkumargupta12345)
- 🌐 Portfolio: [portfolio-yash-lilac.vercel.app](https://portfolio-yash-lilac.vercel.app/)

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
