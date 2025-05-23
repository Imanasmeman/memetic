# Memetic

Memetic is a modern meme creation and sharing web app built with React, Vite, Firebase, and Konva.js. Users can create custom memes using an interactive canvas editor, upload them to a public feed, like and comment on memes, and manage authentication with Firebase.

---

## Features

- **User Authentication**: Sign up and log in with email/password using Firebase Auth.
- **Meme Editor** (powered by Konva.js):
  - Upload background images.
  - Add, move, resize, and edit text overlays on a canvas.
  - Change text color and add hashtags.
  - Drag, resize, and transform images and text interactively.
- **Meme Feed**:
  - View all uploaded memes in a scrollable feed.
  - Sort memes by latest or most liked.
  - Like/unlike memes (one like per user).
  - Add comments to memes.
- **Responsive Design**: Works well on desktop and mobile devices.
- **Cloud Storage**: Memes are stored in Firebase Realtime Database and images can be uploaded to Cloudinary.

---

## Technologies Used

- **React** – Frontend framework for building UI.
- **Vite** – Fast development server and build tool.
- **Firebase** – Authentication and Realtime Database for user and meme data.
- **Cloudinary** – For image uploads (optional).
- **Konva.js** – Canvas-based meme editing (drag, resize, text overlays, etc).
- **react-konva** – React bindings for Konva.js, enabling interactive canvas editing.

---

memetic/
  ├── .gitignore
  ├── eslint.config.js
  ├── index.html
  ├── package.json
  ├── README.md
  ├── vite.config.js
  ├── public/
  ├── src/
      ├── App.css
      ├── App.jsx
      ├── Authform.jsx
      ├── EditableText.jsx
      ├── firebase.jsx
      ├── index.css
      ├── main.jsx
      ├── MemeEditer.css
      ├── MemeEditer.jsx
      ├── MemeScroll.css
      ├── Memescroll.jsx
      ├── .env/
      ├── assets/
      ├── components/
      │    ├── imageupload.jsx
      │    ├── Navbar.css
      │    ├── Navbar.jsx
      │    └── Uploadmeme.jsx
      └── contexts/
           └── Authcontexts.jsx
---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   git clone <your-repo-url>
   cd memetic/memetic

2. **Install dependencies:**
   npm install

3. **Environment Variables:**
   - The project uses Firebase and Cloudinary. Make sure to set up your Firebase project and Cloudinary account.
   - Update src/firebase.jsx with your Firebase config.
   - For Cloudinary uploads, update the upload preset and cloud name in src/components/imageupload.jsx.

4. **Start the development server:**
   npm run dev
   The app will be available at http://localhost:5173 (or as indicated in your terminal).

---

## Usage

- **Live Demo:**  
  Try the deployed app here: https://memeticsite.netlify.app/feed

- **Sign Up / Login:** Use the authentication form to create an account or log in.
- **Create a Meme:** Go to the editor, upload an image, add/edit text, set hashtags, and upload your meme.
- **Browse Feed:** View memes from all users, like, and comment on them.
- **Like/Comment:** Click the heart to like/unlike. Click the comment icon to view/add comments.

---

## Main Components

- App.jsx: Main app router and layout.
- Authform.jsx: Handles user authentication.
- MemeEditer.jsx: Meme creation and editing interface using Konva.js.
- Memescroll.jsx: Meme feed with sorting, likes, and comments.
- components/Navbar.jsx: Top navigation bar.
- components/imageupload.jsx: Cloudinary image upload utility.
- contexts/Authcontexts.jsx: React context for authentication state.
- firebase.jsx: Firebase configuration and exports.

---

## Customization

- **Firebase:**  
  Update src/firebase.jsx with your Firebase project credentials.
- **Cloudinary:**  
  Update the upload preset and cloud name in src/components/imageupload.jsx.
- **Styling:**  
  Modify CSS files in src/ and src/components/ for custom themes.

---

## Scripts

- npm run dev – Start development server
- npm run build – Build for production
- npm run preview – Preview production build
- npm run lint – Run ESLint

---

## License

This project is for educational/demo purposes. Please update with your own license if you plan to use it in production.

---

## Credits

- Built with React, Vite, Firebase, Cloudinary, and Konva.js.
- UI icons from Font Awesome.

---

## Contact

For questions or suggestions, open an issue.
