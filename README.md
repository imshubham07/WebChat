# WebChat 💬  
*A Real-Time Chat Application with WebSockets*

![Tech Stack](https://img.shields.io/badge/React-18.2.0-blue)
![Tech Stack](https://img.shields.io/badge/TypeScript-5.0.0-blue)
![Tech Stack](https://img.shields.io/badge/WebSockets-Node.js-green)

A full-stack real-time chat application built using **React**, **TypeScript**, and **WebSockets**. Create private rooms, exchange instant messages, and collaborate seamlessly across devices.

---

## ✨ Features

- 🚀 **Instant Messaging** — Real-time communication via WebSockets  
- 🔒 **Private Rooms** — Join or create rooms with unique 6-character codes  
- 🧑 **User Identity** — Choose your display name for personalized chats  
- ✍️ **Typing Indicators** — See when others are typing in real-time  
- 🔄 **Auto-Reconnect** — Seamless recovery from dropped connections  
- 📘 **Built-in Docs** — Easy-to-access usage guide  
- 📱 **Responsive UI** — Tailwind CSS-powered design for all screen sizes  

---

## 🛠 Tech Stack

| Frontend               | Backend                 | Tooling               |
|------------------------|-------------------------|------------------------|
| React + TypeScript     | Node.js (`ws` library)  | Vite, ESLint, Prettier |
| Tailwind CSS           | WebSocket Protocol      |                        |

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/imshubham07/WebChat.git
cd webchat
```

### 2. Install Dependencies

**Client:**
```bash
cd client
npm install
```

**Server:**
```bash
cd ../server
npm install
```

### 3. Run the Application

**Start WebSocket Server** (from `server` directory):
```bash
node index.js
```

**Start Frontend Client** (from `client` directory):
```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

## 🧑‍💻 Usage

- Enter a **username** and **room code** to join
- Create a room using the "Generate" option or join an existing one
- Start chatting in real-time!
- Use the navigation bar to access documentation or exit rooms

---



---

## 📄 License

This project is licensed under the **MIT License**  
© 2025
