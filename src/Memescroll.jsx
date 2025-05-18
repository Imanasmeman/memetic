import React, { useEffect, useState } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import { db, auth } from './firebase';
import './MemeScroll.css';

export default function MemeScroller() {
  const [memes, setMemes] = useState([]);
  const [sortBy, setSortBy] = useState('latest');
  const [user, setUser] = useState(null);

  // For comments UI and input
  const [showComments, setShowComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const memeRef = ref(db, 'memes');
    const unsubscribe = onValue(memeRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const memeList = Object.entries(data).map(([id, meme]) => ({
          id,
          ...meme,
        }));

        if (sortBy === 'latest') {
          memeList.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        } else if (sortBy === 'likes') {
          memeList.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        }

        setMemes(memeList);
      }
    });

    return () => unsubscribe();
  }, [sortBy]);

  // Toggle like/unlike
  const likeMeme = (memeId, likedBy = {}, currentLikes = 0) => {
    if (!user) return;

    const userId = user.uid;
    const memeRef = ref(db, `memes/${memeId}`);

    if (likedBy[userId]) {
      // Unlike: remove user from likedBy and decrement likes
      const updates = {
        [`likedBy/${userId}`]: null,
        likes: Math.max((currentLikes || 1) - 1, 0),
      };
      update(memeRef, updates);
    } else {
      // Like: add user to likedBy and increment likes
      update(memeRef, {
        [`likedBy/${userId}`]: true,
        likes: (currentLikes || 0) + 1,
      });
    }
  };

  // Toggle comments visibility for a meme
  const toggleComments = (memeId) => {
    setShowComments((prev) => ({
      ...prev,
      [memeId]: !prev[memeId],
    }));
  };

  // Handle comment input change
  const handleCommentInput = (memeId, value) => {
    setCommentInputs((prev) => ({
      ...prev,
      [memeId]: value,
    }));
  };

  // Add a comment to the meme
  const addComment = (memeId, currentComments = []) => {
    if (!user) return;
    const commentText = commentInputs[memeId]?.trim();
    if (!commentText) return;

    const memeRef = ref(db, `memes/${memeId}`);
    const newComment = {
      user: user.displayName || user.email || "Anonymous",
      text: commentText,
      createdAt: new Date().toISOString(),
    };

    // Add new comment to the array (handle both array and object)
    const updatedComments = Array.isArray(currentComments)
      ? [...currentComments, newComment]
      : [newComment];

    update(memeRef, {
      comments: updatedComments,
    });

    setCommentInputs((prev) => ({ ...prev, [memeId]: "" }));
  };

  return (
    <div className="feedContainer">
      <h2>Meme Feed</h2>
      <div className="feedSort">
        <button
          className={sortBy === 'latest' ? 'active' : ''}
          onClick={() => setSortBy('latest')}
        >
          Sort by Latest
        </button>
        <button
          className={sortBy === 'likes' ? 'active' : ''}
          onClick={() => setSortBy('likes')}
        >
          Sort by Likes
        </button>
      </div>

      <div className="feedScroll">
        {memes.map((meme) => (
          <div key={meme.id} className="card">
            <img src={meme.img} alt="Meme" />
            <div className="hashtags">
              {meme.hashtags?.map((tag) => `#${tag}`).join(' ')}
            </div>
            <div className="username">{meme.username}</div>
            <div className="likesRow">
              <span className="likes">❤️ {meme.likes || 0}</span>
              <button
                className="likeBtn"
                onClick={() => likeMeme(meme.id, meme.likedBy, meme.likes)}
                aria-label="Like"
              >
                {user && meme.likedBy && meme.likedBy[user.uid] ? (
                  <i className="fa-solid fa-heart" style={{ color: "#ff5252" }}></i>
                ) : (
                  <i className="fa-regular fa-heart" style={{ color: "white" }}></i>
                )}
              </button>
              <button
                className="commentBtn"
                onClick={() => toggleComments(meme.id)}
                aria-label="Comments"
              >
                <i className="fa-regular fa-comment"></i>
              </button>
            </div>
            {showComments[meme.id] && (
              <div className="commentsSection">
                {/* Comments list first */}
                <div className="addCommentRow">
                  <input
                    type="text"
                    className="commentInput"
                    placeholder="Add a comment..."
                    value={commentInputs[meme.id] || ""}
                    onChange={(e) => handleCommentInput(meme.id, e.target.value)}
                  />
                  <button
                    className="postCommentBtn"
                    onClick={() => addComment(meme.id, meme.comments)}
                    disabled={!user || !(commentInputs[meme.id] || "").trim()}
                    style={{ marginLeft: 8 }}
                  >
                    Post
                  </button>
                </div>
                <div className="commentsList">
                  {(meme.comments || []).map((c, idx) => (
                    <div key={idx} className="commentItem">
                      <strong>{c.user}:</strong> {c.text}
                    </div>
                  ))}
                </div>
                {/* Add comment input below the comments */}
                
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}