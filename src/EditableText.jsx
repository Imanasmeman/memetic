import React, { useRef, useEffect, useState } from "react";
import { Text, Transformer } from "react-konva";

const EditableText = ({ textProps, isSelected, onSelect, onChange }) => {
  const shapeRef = useRef();
  const trRef = useRef();
  const textAreaRef = useRef();
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(textProps.text);

  useEffect(() => {
    if (isSelected && trRef.current) {
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  const handleDoubleClick = (e) => {
    const textNode = shapeRef.current;
    const stage = textNode.getStage();
    const stageBox = stage.container().getBoundingClientRect();
    const textPosition = textNode.absolutePosition();

    const areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.value = textProps.text;
    textarea.style.position = "absolute";
    textarea.style.top = areaPosition.y + "px";
    textarea.style.left = areaPosition.x + "px";
    textarea.style.width = textNode.width() - textNode.padding() * 2 + "px";
    textarea.style.fontSize = textNode.fontSize() + "px";
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.transform = `rotate(${textNode.rotation()}deg)`;
    textarea.style.color = textNode.fill();
    textarea.style.background = "transparent";
    textarea.style.border = "none";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.overflow = "hidden";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.lineHeight = textNode.lineHeight();
    textarea.style.zIndex = 9999;
    textarea.focus();

    const removeTextarea = () => {
      document.body.removeChild(textarea);
      window.removeEventListener("click", handleOutsideClick);
    };

    const setTextareaValue = () => {
      onChange({ ...textProps, text: textarea.value });
      removeTextarea();
    };

    textarea.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        setTextareaValue();
      } else if (e.key === "Escape") {
        removeTextarea();
      }
    });

    const handleOutsideClick = (e) => {
      if (e.target !== textarea) {
        setTextareaValue();
      }
    };

    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick);
    });
  };

  return (
    <>
      <Text
        {...textProps}
        ref={shapeRef}
        onClick={onSelect}
        onTap={onSelect}
        onDblClick={handleDoubleClick}
        onTouchStart={handleDoubleClick}
        draggable
        onDragEnd={(e) => {
          onChange({ ...textProps, x: e.target.x(), y: e.target.y() });
        }}
      />
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

export default EditableText;
