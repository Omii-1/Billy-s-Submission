# MERN Stack Movie Application: Role-Based Access Control

## 🚀 Live Demo
[Live Application](https://billy-s-frontend.vercel.app/)

## 📌 Project Overview
This is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) application that allows users to browse, search, and sort movies from IMDb's Top 250 Movies. Admins can add, edit, and delete movies.

### **Features**
#### User Features:
- View movie details fetched from IMDb’s Top 250 Movies.
- Search movies by name or description.
- Sort movies by name, rating, release date, and duration.

#### Admin Features:
- Add new movie details.
- Edit or delete existing movies.
- Secure access via role-based authentication.

### **Tech Stack**
#### **Frontend:**
- React.js
- Material-UI (MUI) for UI components & responsiveness
- React Router for navigation
- Context API for state management

#### **Backend:**
- Node.js with Express.js
- MongoDB (Hosted on MongoDB Atlas)
- JWT-based authentication & role-based access control
- Zod for input validation & error handling

#### **Deployment:**
- **Frontend:** Vercel
- **Backend:** Render
- **Database:** MongoDB Atlas

---

## 🛠️ Installation & Setup
Follow these steps to run the project locally.

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/Omii-1/Billy-s-Submission.git
cd Billy-s-Submission
```

### **2️⃣ Backend Setup**
#### **Install Dependencies**
```sh
cd backend
npm install
```

#### **Create a `.env` File**
Inside the `backend/` directory, create a `.env` file and add:
```env
MONGODB_URL=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
(*Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual values.*)

#### **Run the Backend**
```sh
npm run server
```

---

### **3️⃣ Frontend Setup**
#### **Install Dependencies**
```sh
cd frontend
npm install
```

#### **Create a `.env` File**
Inside the `frontend/` directory, create a `.env` file and add:
```env
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

#### **Run the Frontend**
```sh
npm run dev
```

---

## 🔥 API Endpoints
| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/v1/movies` | Get all movies |
| GET | `/api/v1/movies/sorted` | Get movies sorted by name, rating, release date, or duration |
| GET | `/api/v1/movies/search` | Search movies by name or description |
| POST | `/api/v1/movies` | Add a new movie (Admin only) |
| PUT | `/api/v1/movies/:id` | Edit movie details (Admin only) |
| DELETE | `/api/v1/movies/:id` | Delete a movie (Admin only) |

---

## 📸 Screenshots
(Add screenshots of your application here, such as home page, admin dashboard, search functionality, etc.)

---

## 🎯 Additional Features & Considerations
- **JWT Authentication**: Secure user authentication and role-based access.
- **Zod Validation**: Ensures API request data is valid.
- **Optimized Performance**: Efficient API calls & database queries.

---

## 🤝 Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-branch`)
3. Commit your changes (`git commit -m "Added new feature"`)
4. Push to the branch (`git push origin feature-branch`)
5. Create a pull request

---

## 📝 License
This project is licensed under the MIT License.

---

## 📬 Contact
For any issues or inquiries, feel free to reach out!

💻 **Developer:** Om Juvatkar  
📧 **Email:** [omjuvatkar123@gmail.com](mailto:omjuvatkar123@gmail.com)  
🔗 **GitHub:** [Omii-1](https://github.com/Omii-1)

