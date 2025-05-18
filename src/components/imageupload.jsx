import React, { useState } from "react";

const CloudinaryUpload = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUploadClick = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "myupload"); // 🔁 Replace with your actual unsigned preset name

    setLoading(true);

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxfbb6toc/image/upload", // 🔁 Replace with your actual Cloud name
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Cloudinary upload error:", errorText);
        alert("Upload failed. See console for details.");
        return;
      }

      const data = await response.json();
      console.log("Upload success:", data);

      setImageUrl(data.secure_url);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. See console for error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>Upload Image to Cloudinary</h2>
      <input type="file" onChange={handleFileChange} />
      <br /><br />
      <button onClick={handleUploadClick} disabled={loading}>
        {loading ? "Uploading..." : "Upload Image"}
      </button>

      {imageUrl && (
        <div style={{ marginTop: "20px" }}>
          <p>Image Uploaded:</p>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer">
            {imageUrl}
          </a>
          <br />
          <img src={imageUrl} alt="Uploaded" width="200" />
        </div>
      )}
    </div>
  );
};

export default CloudinaryUpload;
