# 🎓 AI Study Abroad Assistant — Frontend (Next.js)

This is the **frontend** interface for the AI Study Abroad Assistant app.  
It provides a sleek and intuitive web UI that connects with the FastAPI backend to handle authentication, chat, and document interactions for students planning to study abroad.

---

## 🚀 Live Website

🔹 **Frontend (Vercel):**  
👉 [https://ai-study-abroad-frontend.vercel.app](https://ai-study-abroad-frontend.vercel.app)

🔹 **Backend (Render):**  
👉 [https://ai-study-abroad-backend.onrender.com](https://ai-study-abroad-backend.onrender.com)

---

## 🧩 Key Features

✅ **User Signup & Login** — Securely register and authenticate users via backend JWT  
✅ **AI Chat Interface** — Talk to an AI assistant for personalized study-abroad help  
✅ **Document Upload UI** — Upload PDFs for evaluation and recommendations  
✅ **Chat History Retrieval** — Display previous conversations  
✅ **Responsive Design** — Fully optimized for mobile and desktop  
✅ **Tailwind CSS Styling** — Clean and modern user experience  

---

## ⚙️ Tech Stack

| Component | Technology |
|------------|-------------|
| Framework | **Next.js 16.0.1** |
| Language | **TypeScript** |
| UI Library | **React 19** |
| Styling | **Tailwind CSS** |
| API Client | **Axios** |
| Deployment | **Vercel** |
| Backend | **FastAPI (Render)** |

---

## 🧰 Setup Instructions

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Bhavana546/ai-study-abroad-frontend.git
cd ai-study-abroad-frontend
````

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a file named `.env.local` in the root directory and add:

```bash
NEXT_PUBLIC_API_URL=https://ai-study-abroad-backend.onrender.com
```

### 4️⃣ Run the development server

```bash
npm run dev
```

Then open 👉 [http://localhost:3000](http://localhost:3000)

---

## 🧠 Folder Structure

```
ai-study-abroad-frontend/
│
├── app/
│   ├── signup/        → Signup Page
│   ├── login/         → Login Page
│   ├── chat/          → Chat Interface
│   ├── page.tsx       → Home Page
│   └── layout.tsx     → App layout configuration
│
├── public/            → Static assets
├── styles/            → Global CSS
├── .env.local         → Environment configuration
└── package.json       → Dependencies and scripts
```

---

## 🪄 Available Scripts

| Command         | Description                   |
| --------------- | ----------------------------- |
| `npm run dev`   | Starts the development server |
| `npm run build` | Builds the app for production |
| `npm run start` | Starts the production build   |
| `npm run lint`  | Runs ESLint for code checks   |

---

## 📸 Screenshots (Add After Deployment)
<img width="1919" height="956" alt="Screenshot 2025-11-12 093731" src="https://github.com/user-attachments/assets/c6f0b495-d08b-48c4-86fd-bab272cf94ce" />



<img width="1919" height="971" alt="Screenshot 2025-11-12 093749" src="https://github.com/user-attachments/assets/f15428ed-8900-4448-a0cf-b5f55f71ad7a" />



<img width="1919" height="953" alt="Screenshot 2025-11-12 134543" src="https://github.com/user-attachments/assets/8d4c3a92-947e-4ed5-93e1-b440cd51e313" />


---

## 🌍 Deployment Details

* **Frontend Hosting:** Vercel
* **Backend API:** Render
* **Integration:** Axios with JWT headers

**Environment Used:**
✅ NEXT_DISABLE_TURBOPACK=1 (to fix Turbopack build issue on Vercel)

---

## 🔐 Authentication Flow

1️⃣ User signs up via `/auth/signup`
2️⃣ Backend returns a JWT token
3️⃣ Token stored in `localStorage`
4️⃣ Used for authenticated routes (e.g., `/chat`, `/docs/upload`)
5️⃣ Logout clears token from localStorage

---

## 🎥 Demo Video

🎬 *Watch the complete app demo here:*



https://github.com/user-attachments/assets/cc9d5d00-8c16-404a-9d46-b4b6f5e781ff


---

## 👩‍💻 Author

**Bhavana Kolluri**
🎓 B.Tech in CSE (AI & Data Science) – Siddhartha Academy of Higher Education
📧 **Email:** [bhavana.demo@gmail.com](mailto:bhavana.demo@gmail.com)
💼 [LinkedIn](https://www.linkedin.com/in/bhavana-kolluri)
🌐 [GitHub](https://github.com/Bhavana546)

---

⭐ *Built with ❤️ using Next.js 16, Tailwind CSS, and FastAPI — Deployed on Vercel.*

```
