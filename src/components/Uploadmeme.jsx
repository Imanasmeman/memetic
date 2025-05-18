// uploadMeme.js
import { ref as dbRef, push, serverTimestamp } from "firebase/database";
import { ref as storageRef, uploadString, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase"; // Adjust the import path as necessary
import { db } from "../firebase"; // Adjust the import path as necessary
import { storage } from "../firebase";

// Adjust the import path as necessary


export const uploadMemeImage = async (base64Image, hashtags = []) => {
  const user = auth.currentUser;
  if (!user) throw new Error("User not logged in");

  const fileName = `memes/${user.uid}/${Date.now()}.png`;
  const imageRef = storageRef(storage, fileName);

  // Upload base64 image
  await uploadString(imageRef, base64Image, "data_url");
  const downloadURL = await getDownloadURL(imageRef);

  // Save meme metadata in Realtime Database
  await push(dbRef(db, "memes"), {
     "userId": "demoUser123",
      "img": "https://i.imgur.com/your-demo-meme.png",
      "hashtags": ["funny", "demo", "memetic"],
      "createdAt": "2025-05-17T12:00:00Z",
      "likes": 0,
      "likedBy": {
        "user123": true,
      }
  });

  return downloadURL;
};
