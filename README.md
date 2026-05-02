# 🗳️ VoteWise AI

**VoteWise AI** is a smart, AI-powered assistant that helps users understand the voting process in a simple, personalized, and interactive way.

It provides step-by-step guidance tailored to a user's age and location, making civic participation easier and more accessible for everyone.

---

## 🚀 Features

* 🤖 **AI-Powered Guidance**
  Generates personalized voting journeys using Google Gemini API

* 🧭 **Step-by-Step Process**
  Clear, structured steps for voter registration and participation

* 🎯 **Personalization**
  Based on user inputs like age and state

* ⚡ **Fast & Responsive UI**
  Built with React + Tailwind CSS

* 🔐 **Secure Backend**
  API key protected using Node.js backend

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Framer Motion
* Lucide Icons

### Backend

* Node.js
* Express.js
* Google Gemini API

### Deployment

* Frontend: Vercel
* Backend: Render

---

## 📂 Project Structure

```
VoteWise-AI/
│
├── server/              # Backend (Express API)
│   ├── index.js
│   ├── package.json
│   └── .env (not pushed)
│
├── src/                 # Frontend (React)
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── App.jsx
│
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository

```
git clone https://github.com/your-username/VoteWise-AI.git
cd VoteWise-AI
```

---

### 2️⃣ Setup Backend

```
cd server
npm install
```

Create a `.env` file inside `server/`:

```
GEMINI_API_KEY=your_api_key_here
```

Run server:

```
node index.js
```

---

### 3️⃣ Setup Frontend

```
cd ..
npm install
npm run dev
```

---

## 🌐 API Endpoint

```
POST /api/ai
```

**Request Body:**

```
{
  "query": "Explain voting process"
}
```

**Response:**

```
{
  "text": "Generated AI response..."
}
```

---

## 🔐 Security

* API keys are stored securely in environment variables
* `.env` files are excluded using `.gitignore`
* No sensitive data is exposed in the frontend

---

## 📸 Demo

* 🌍 Live App: https://vote-wise-ai-delta.vercel.app/
* ⚙️ Backend API: https://votewise-ai-aptl.onrender.com

---

## 🎯 Use Case

* First-time voters
* Students learning about elections
* General awareness of democratic processes

---

## 🧠 Future Improvements

* Multi-language support
* Real-time election data integration
* Voice assistant support
* Location-based polling booth finder

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork and improve the project.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👩‍💻 Author

**Srashti Chauhan**
B.Tech CSE Student | Aspiring Software Engineer

---

## ⭐ If you like this project

Give it a star ⭐ and share it!
