import React, { useRef, useState, useEffect } from "react";
import { Stage, Layer, Image as KonvaImage, Rect, Transformer } from "react-konva";
import EditableText from "./EditableText";
import useImage from "use-image";
import "./App.css";
import { useAuth } from "./contexts/Authcontexts";
import "./MemeEditer.css";

const CANVAS_WIDTH = 600;
const CANVAS_HEIGHT = 500;

const MemeEditor = () => {
  const { user, username } = useAuth();
  const [imageURL, setImageURL] = useState(null);
  const [textElements, setTextElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(false);
  const [imageAttrs, setImageAttrs] = useState({
    x: 0,
    y: 0,
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    scaleX: 1,
    scaleY: 1,
  });
  const [textColor, setTextColor] = useState("#ffffff");
  const [hashtags, setHashtags] = useState("");
  const [image] = useImage(imageURL);
  const stageRef = useRef(null);
  const imageRef = useRef(null);
  const trRef = useRef(null);

  // Comment section state
  const [comments, setComments] = useState([]);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState("");

  // Auto-fit and center image when loaded
  useEffect(() => {
    if (image && image.width && image.height) {
      const scale = Math.min(
        CANVAS_WIDTH / image.width,
        CANVAS_HEIGHT / image.height
      );
      const width = image.width * scale;
      const height = image.height * scale;
      const x = (CANVAS_WIDTH - width) / 2;
      const y = (CANVAS_HEIGHT - height) / 2;
      setImageAttrs({
        x,
        y,
        width,
        height,
        scaleX: 1,
        scaleY: 1,
      });
    }
    // eslint-disable-next-line
  }, [image]);

  // Add new text element
  const handleAddText = () => {
    const newId = Date.now().toString();
    setTextElements([
      ...textElements,
      {
        id: newId,
        text: "Edit me!",
        x: 50,
        y: 50 + textElements.length * 40,
        fontSize: 32,
        fill: textColor,
        draggable: true,
      },
    ]);
    setSelectedId(newId);
    setSelectedImage(false);
  };

  // Change color of selected text
  const handleColorChange = (e) => {
    setTextColor(e.target.value);
    setTextElements(
      textElements.map((el) =>
        el.id === selectedId ? { ...el, fill: e.target.value } : el
      )
    );
  };

  // Upload meme to Firebase Realtime Database as JPEG
  const handleUpload = async () => {
    if (!user) {
      alert("You must be logged in to upload memes.");
      return;
    }
    if (!imageURL) {
      alert("Please upload a background image first.");
      return;
    }
    // Save as JPEG
    const uri = stageRef.current.toDataURL({
      mimeType: "image/jpeg",
      quality: 0.92,
    });
    const tags = hashtags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const memeData = {
      username: username,
      img: uri,
      hashtags: tags,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await fetch(
        "https://memetic-b2143-default-rtdb.firebaseio.com/memes.json",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(memeData),
        }
      );
      if (!res.ok) throw new Error("Failed to upload meme");
      alert("Meme uploaded successfully!");
      setTextElements([]);
      setImageURL(null);
      setHashtags("");
    } catch (err) {
      alert("Upload failed: " + err.message);
    }
  };

  // Handle background image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setImageURL(ev.target.result);
    reader.readAsDataURL(file);
    // No need to set imageAttrs here; handled by useEffect above
  };

  // Delete selected text
  const handleDeleteText = () => {
    setTextElements(textElements.filter((el) => el.id !== selectedId));
    setSelectedId(null);
  };

  // Deselect everything
  const handleStageMouseDown = (e) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
      setSelectedImage(false);
    }
  };

  // Attach transformer to image when selected
  useEffect(() => {
    if (selectedImage && trRef.current && imageRef.current) {
      trRef.current.nodes([imageRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [selectedImage, image]);

  // Comment handlers
  const handleAddCommentClick = () => setShowCommentInput(true);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      { text: newComment, username: username || "Anonymous", id: Date.now() },
      ...comments,
    ]);
    setNewComment("");
    setShowCommentInput(false);
  };

  return (
    <div className="meme-editor-container">
      <div className="meme-editor-toolbar">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={handleAddText}>Add Text</button>
        <input
          type="color"
          value={textColor}
          onChange={handleColorChange}
          title="Text Color"
        />
        <input
          type="text"
          placeholder="Hashtags (comma-separated)"
          value={hashtags}
          onChange={(e) => setHashtags(e.target.value)}
        />
        <button onClick={handleUpload}>Upload Meme</button>
        {selectedId && (
          <button onClick={handleDeleteText} style={{ color: "red" }}>
            Delete Selected Text
          </button>
        )}
      </div>
      <div
        className="meme-editor-stage-wrapper"
        onClick={() => {
          setSelectedId(null);
          setSelectedImage(false);
        }}
        style={{
          border: "1px solid #ccc",
          marginTop: 16,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
        }}
      >
        <Stage
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          ref={stageRef}
          onMouseDown={handleStageMouseDown}
        >
          <Layer>
            {/* Always draw a white background */}
            <Rect
              x={0}
              y={0}
              width={CANVAS_WIDTH}
              height={CANVAS_HEIGHT}
              fill="#fff"
            />
            {image && (
              <>
                <KonvaImage
                  image={image}
                  x={imageAttrs.x}
                  y={imageAttrs.y}
                  width={imageAttrs.width}
                  height={imageAttrs.height}
                  scaleX={imageAttrs.scaleX}
                  scaleY={imageAttrs.scaleY}
                  draggable
                  ref={imageRef}
                  onClick={() => {
                    setSelectedImage(true);
                    setSelectedId(null);
                  }}
                  onTap={() => {
                    setSelectedImage(true);
                    setSelectedId(null);
                  }}
                  onDragEnd={(e) => {
                    setImageAttrs({
                      ...imageAttrs,
                      x: e.target.x(),
                      y: e.target.y(),
                    });
                  }}
                  onTransformEnd={(e) => {
                    const node = imageRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    setImageAttrs({
                      ...imageAttrs,
                      x: node.x(),
                      y: node.y(),
                      scaleX: 1,
                      scaleY: 1,
                      width: Math.max(5, node.width() * scaleX),
                      height: Math.max(5, node.height() * scaleY),
                    });
                    node.scaleX(1);
                    node.scaleY(1);
                  }}
                />
                {selectedImage && (
                  <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                      if (newBox.width < 5 || newBox.height < 5) {
                        return oldBox;
                      }
                      return newBox;
                    }}
                  />
                )}
              </>
            )}
            {textElements.map((text) => (
              <EditableText
                key={text.id}
                textProps={text}
                isSelected={text.id === selectedId}
                onSelect={() => {
                  setSelectedId(text.id);
                  setSelectedImage(false);
                }}
                onChange={(newProps) =>
                  setTextElements(
                    textElements.map((el) =>
                      el.id === newProps.id ? newProps : el
                    )
                  )
                }
              />
            ))}
          </Layer>
        </Stage>
      </div>
      {/* Comment Section */}
      <div style={{ marginTop: 24 }}>
        <button onClick={handleAddCommentClick}>Add Comment</button>
        {showCommentInput && (
          <form onSubmit={handleCommentSubmit} style={{ marginTop: 8 }}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={{ width: 300, marginRight: 8 }}
            />
            <button type="submit">Post</button>
          </form>
        )}
        <div style={{ marginTop: 16 }}>
          {comments.map((c) => (
            <div key={c.id} style={{ marginBottom: 8, borderBottom: "1px solid #eee", paddingBottom: 4 }}>
              <strong>{c.username}</strong>: {c.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemeEditor;