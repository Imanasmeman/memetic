# 🖼️ Memetic

**Memetic** is a modern meme creation and sharing web app built with **React**, **Vite**, **Firebase**, and **Konva.js**. It allows users to create custom memes using an interactive canvas editor, upload them to a public feed, like and comment on memes, and authenticate securely with Firebase.

---

## 🚀 Features

* 🔐 **User Authentication**
  Sign up and log in with email/password using Firebase Authentication.

* 🎨 **Meme Editor (Konva.js)**

  * Upload background images
  * Add, move, resize, and edit text overlays
  * Change text color and add hashtags
  * Drag, resize, and transform elements interactively

* 📰 **Meme Feed**

  * View all uploaded memes in a scrollable feed
  * Sort memes by latest or most liked
  * Like/unlike memes (1 like per user)
  * Comment on memes

* 📱 **Responsive Design**
  Optimized for both desktop and mobile devices.

* ☁️ **Cloud Storage**

  * Memes stored in Firebase Realtime Database
  * Optional image uploads to Cloudinary

---

## 💠 Tech Stack

| Technology  | Purpose                            |
| ----------- | ---------------------------------- |
| React       | Frontend framework for UI          |
| Vite        | Fast development and build tool    |
| Firebase    | Authentication & Realtime Database |
| Cloudinary  | Optional image storage             |
| Konva.js    | Canvas editing                     |
| react-konva | React bindings for Konva.js        |

---

## 📁 Project Structure

```plaintext
memetic/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── public/                      # Static files (favicon, etc.)
├── .env                         # Firebase & Cloudinary environment variables
├── src/
│   ├── App.jsx                  # App entry and routing
│   ├── App.css                  # Global styles
│   ├── Authform.jsx             # Login/Signup component
│   ├── EditableText.jsx         # Canvas text handler
│   ├── firebase.jsx             # Firebase setup
│   ├── index.css                # Base CSS
│   ├── main.jsx                 # React DOM entry
│   ├── MemeEditer.jsx           # Meme creation/editor
│   ├── MemeEditer.css           # Meme editor styles
│   ├── Memescroll.jsx           # Meme feed
│   ├── MemeScroll.css           # Feed styles
│   ├── assets/                  # App assets
│   ├── contexts/
│   │   └── Authcontexts.jsx     # Auth context
│   └── components/
│       ├── imageupload.jsx      # Cloudinary upload
│       ├── Navbar.jsx           # Navigation bar
│       ├── Navbar.css           # Navbar styles
│       └── Uploadmeme.jsx       # Meme submission
```

---

## ⚙️ Getting Started

### ✅ Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* npm (comes with Node.js)

### 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd memetic/memetic
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

   * Create a `.env` file
   * Add your Firebase config in `src/firebase.jsx`
   * (Optional) Set your Cloudinary upload preset and cloud name in `src/components/imageupload.jsx`

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Visit: `http://localhost:5173`

---

## 💡 Usage

* 🔐 **Sign Up / Login** – Create an account using your email and password
* 🎨 **Create a Meme** – Upload an image, add/edit text, set hashtags
* 🚀 **Upload to Feed** – Share memes with the public feed
* ❤️ **Like/Comment** – Interact with memes from other users

🔗 **Live Demo**: [https://memeticsite.netlify.app/feed](https://memeticsite.netlify.app/feed)

---

## 🧹 Main Components Overview

| File                         | Description                   |
| ---------------------------- | ----------------------------- |
| `App.jsx`                    | App router and layout         |
| `Authform.jsx`               | Authentication form           |
| `MemeEditer.jsx`             | Meme editing canvas           |
| `Memescroll.jsx`             | Meme feed list                |
| `components/Navbar.jsx`      | Top navigation bar            |
| `components/imageupload.jsx` | Cloudinary upload utility     |
| `contexts/Authcontexts.jsx`  | Global authentication context |
| `firebase.jsx`               | Firebase setup                |

---

## 🎨 Customization

* 🔧 **Firebase** – Update your config in `src/firebase.jsx`
* ☁️ **Cloudinary** – Set your credentials in `components/imageupload.jsx`
* 🌟 **Styling** – Tweak styles in `.css` files under `src/` and `components/`

---

## 📜 Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `npm run dev`     | Start development server   |
| `npm run build`   | Build app for production   |
| `npm run preview` | Preview production build   |
| `npm run lint`    | Lint your code with ESLint |

---

## 📄 License

This project is intended for educational and demo purposes.
You may add your own license if deploying to production.

---

## 👌 Credits

Built with ❤️ using:

* React, Vite, Firebase, Konva.js, Cloudinary
* Icons from Font Awesome

---

## 📬 Contact

Got feedback or questions?
Open an issue in the repository or contribute directly!
