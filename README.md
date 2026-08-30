# Jworld — Social Media Application

A full-stack social media platform built with Express.js and MongoDB. Users can register, create posts, like, comment, follow other users, and manage their profiles through a responsive web interface.

Built as part of the **CodeAlpha Software Engineering Internship**.

## Features

- **Authentication** — User registration and login with bcrypt password hashing
- **Post Management** — Create, view, and delete posts with timestamps
- **Likes & Comments** — Like posts and add comments via modal UI
- **User Search** — Search users by username with regex matching
- **Profile Settings** — Update username and email from a settings modal
- **Share Posts** — Copy post links to clipboard
- **Suggested Users** — Right sidebar displays other users on the platform
- **Trending Topics** — Static trending section in the sidebar
- **Zero-Config Database** — Falls back to in-memory MongoDB when no `MONGO_URI` is set

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | Node.js, Express 5                  |
| Database  | MongoDB (Mongoose ODM)              |
| Auth      | bcryptjs                            |
| Frontend  | Vanilla HTML, CSS, JavaScript       |
| Icons     | Font Awesome 6                      |
| Dev DB    | mongodb-memory-server (in-memory)   |

## Project Structure

```
CodeAlpha_SocialMediaApp/
├── config/
│   └── db.js                # MongoDB connection (supports in-memory fallback)
├── models/
│   ├── User.js              # User schema (username, email, password, bio, profilePic)
│   ├── Post.js              # Post schema (content, image, likes, embedded comments)
│   ├── Comment.js           # Comment schema (post, user, text)
│   └── Follow.js            # Follow schema (follower, following)
├── routes/
│   ├── authRoutes.js        # POST /register, POST /login
│   ├── postRoutes.js        # CRUD posts, PUT /like, PUT /comment
│   └── userRoutes.js        # GET users, GET by ID, search, PUT update profile
├── public/
│   ├── index.html           # Main feed page (Jworld)
│   ├── login.html           # Login page
│   ├── register.html        # Registration page
│   ├── css/
│   │   ├── style.css        # Main app styles
│   │   └── auth.css         # Login/register page styles
│   └── js/
│       ├── app.js           # Feed logic (posts, likes, comments, settings)
│       ├── login.js          # Login form handler
│       └── register.js       # Registration form handler
├── server.js                # Express server entry point
└── package.json
```

## API Endpoints

### Auth
| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| POST   | `/api/auth/register` | Register a new user  |
| POST   | `/api/auth/login`    | Login with email     |

### Posts
| Method | Endpoint                  | Description        |
|--------|---------------------------|--------------------|
| GET    | `/api/posts`              | Get all posts      |
| GET    | `/api/posts/:id`          | Get single post    |
| POST   | `/api/posts`              | Create a post      |
| PUT    | `/api/posts/like/:id`     | Like a post        |
| PUT    | `/api/posts/comment/:id`  | Comment on a post  |
| DELETE | `/api/posts/:id`          | Delete a post      |

### Users
| Method | Endpoint                       | Description         |
|--------|--------------------------------|---------------------|
| GET    | `/api/users`                   | List all users      |
| GET    | `/api/users/:id`               | Get user by ID      |
| GET    | `/api/users/search/:username`  | Search users        |
| PUT    | `/api/users/:id`               | Update profile      |

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB (optional — the app falls back to in-memory MongoDB automatically)

### Installation

```bash
git clone https://github.com/jasonjose007/CodeAlpha_SocialMediaApp.git
cd CodeAlpha_SocialMediaApp
npm install
```

### Run

```bash
# Without MongoDB installed (uses in-memory DB):
npm start

# With MongoDB:
MONGO_URI=mongodb://localhost:27017/jworld npm start
```

The app starts at `http://localhost:5000`. Register an account and start posting.

## License

MIT
