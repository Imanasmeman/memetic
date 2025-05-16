import React, { useRef, useState } from "react";
import { Stage, Layer, Image as KonvaImage } from "react-konva";
import EditableText from "./EditableText"; // we'll create this component
import useImage from "use-image";
import "./App.css"; // Add your CSS styles here
const MemeEditor = () => {
  const [imageURL, setImageURL] = useState(null);
  const [textElements, setTextElements] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [textColor, setTextColor] = useState("#ffffff");
  const inputRef = useRef();

  const [image] = useImage(imageURL);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageURL(url);
  };

  const handleAddText = () => {
    setTextElements([
      ...textElements,
      {
        id: Date.now(),
        x: 50,
        y: 50,
        text: "Double click to edit",
        fontSize: 24,
        fill: textColor,
        draggable: true,
      },
    ]);
  };

  const handleTextChange = (newProps) => {
    setTextElements(
      textElements.map((el) => (el.id === newProps.id ? newProps : el))
    );
  };

  const handleDeselect = () => {
    setSelectedId(null);
  };

  return (
    <div className="meme-editor-container">
      <div className="meme-editor-toolbar">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
        />
        <button onClick={handleAddText}>Add Text</button>
      </div>
      <div
        className="meme-editor-stage-wrapper"
        onClick={handleDeselect}
      >
        <Stage width={600} height={500} onMouseDown={handleDeselect}>
          <Layer>
            {image && <KonvaImage image={image} />}
            {textElements.map((text, i) => (
              <EditableText
                key={text.id}
                textProps={text}
                isSelected={text.id === selectedId}
                onSelect={() => setSelectedId(text.id)}
                onChange={handleTextChange}
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default MemeEditor;