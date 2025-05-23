Memetic - Meme Creation & Sharing App
=====================================

Memetic is a modern web app for creating, editing, and sharing memes. Built using React, Vite, Firebase, and Konva.js, it allows users to design custom memes on an interactive canvas, upload them to a public feed, engage with others via likes and comments, and manage authentication with Firebase.

---

Features
--------

- User Authentication:
  - Sign up and log in using Firebase Auth (email/password)

- Interactive Meme Editor (Konva.js):
  - Upload background images
  - Add, move, resize, and edit text overlays
  - Customize text color and add hashtags
  - Interactive drag, resize, transform capabilities

- Meme Feed:
  - Scrollable feed of all uploaded memes
  - Sort by latest or most liked
  - Like/unlike (one per user)
  - Add and view comments

- Responsive Design:
  - Works on desktop and mobile

- Cloud Storage:
  - Uses Firebase Realtime Database for meme data
  - Optional Cloudinary integration for image uploads

---

Tech Stack
----------

- React – Frontend UI
- Vite – Development & build tool
- Firebase – Authentication and Realtime DB
- Cloudinary – Optional image storage
- Konva.js – Canvas-based editor
- react-konva – React bindings for Konva.js

---

Project Structure
-----------------

memetic/
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── Authform.jsx
│   ├── EditableText.jsx
│   ├── firebase.jsx
│   ├── main.jsx
│   ├── MemeEditer.jsx
│   ├── MemeEditer.css
│   ├── Memescroll.jsx
│   ├── MemeScroll.css
│   ├── index.css
│   ├── components/
│   │   ├── imageupload.jsx
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   └── Uploadmeme.jsx
│   └── contexts/
│       └── Authcontexts.jsx

---

Getting Started
---------------

1. Prerequisites:
   - Node.js (v18+)
   - npm (comes with Node)

2. Installation:
   git clone <your-repo-url>
   cd memetic/memetic
   npm install

3. Configuration:
   - Set up your Firebase project
   - Update `src/firebase.jsx` with Firebase config
   - (Optional) Configure Cloudinary in `components/imageupload.jsx`

4. Run the Dev Server:
   npm run dev
   Open http://localhost:5173

---

Usage
-----

- Visit: https://memeticsite.netlify.app/feed
- Sign up or log in
- Use the Meme Editor to create memes
- Upload memes to the feed
- Like and comment on others’ memes

---

Main Components
---------------

- App.jsx – App layout and router
- Authform.jsx – Handles user login/signup
- MemeEditer.jsx – Canvas meme editor (Konva.js)
- Memescroll.jsx – Meme feed with sorting and likes
- Navbar.jsx – Top navigation bar
- imageupload.jsx – Cloudinary image uploader
- Authcontexts.jsx – Firebase Auth context
- firebase.jsx – Firebase setup

---

Customization
-------------

- Firebase: Edit `src/firebase.jsx`
- Cloudinary: Update cloud name and upload preset in `imageupload.jsx`
- Styles: Modify CSS files in `src/` and `components/`

---

Scripts
-------

- npm run dev – Start dev server
- npm run build – Production build
- npm run preview – Preview build
- npm run lint – Run ESLint

---

License
-------

This project is for educational/demo purposes. Update the license for production use.

---

Credits
-------

Built with React, Vite, Firebase, Konva.js, and Cloudinary.
Icons from Font Awesome.

---

Contact
-------

For questions or feedback, please open an issue on the repository.
