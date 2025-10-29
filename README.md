📚 Book Finder — 
🧩 Project Overview

Book Finder is a modern React web application that allows users to search for books, view detailed information, and create a personalized collection.
It was built for Alex, a college student who wants an easy way to discover and save books using the Open Library API.

👩‍💻 User Need

“I often need to quickly look up books for college projects or personal reading. I want something simple, clean, and fast.”

🎨 Features

🔍 Search books by title using Open Library API
📖 View detailed book info (cover, author, year, subjects)
💾 Add or remove books from personal collection (stored in localStorage)
🧭 Responsive UI with TailwindCSS styling
💡 Handles loading states and missing data gracefully

🧠 How I Used AI (ChatGPT)

Recruiters asked how I leverage AI — here’s my genuine workflow:
Idea Structuring: I asked ChatGPT to help break down the problem from user persona → feature list → data flow.
UI Guidance: ChatGPT helped me design a clean layout (Home, Book Details, Collection) and guided on component separation.
API Debugging: When the Open Library JSON responses were inconsistent, ChatGPT explained key formats and edge-case handling.
Code Review: I refined my useEffect logic and context state management after AI suggestions for cleaner patterns.
Styling Polish: ChatGPT helped modernize my Tailwind design to match a real-world book discovery app look.
I used AI as a collaborator, not a crutch — generating design direction, architecture clarity, and speed.

🛠️ Tech Stack

Framework: React (Vite)
Styling: Tailwind CSS
State Management: React Context
API: Open Library API
Persistence: localStorage

⚙️ Installation & Setup
git clone https://github.com/yourusername/book-finder.git
cd book-finder
npm install
npm run dev


Then open http://localhost:5173 in your browser.

🚀 Deployment

Deployed on Vercel (or Netlify) — [Live Demo](https://book-finder-neon-xi.vercel.app/)
