import React, { useState } from "react";
import Clarifai from "clarifai";

const app = new Clarifai.App({
  apiKey: "2820acdfae4f4f47bef8526cf6e76dc8",
});

function FaceDetection() {
  const [inputURL, setInputURL] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [faceBoxes, setFaceBoxes] = useState([]);

  const onInputChange = (event) => {
    setInputURL(event.target.value);
  };

  const onDetectClick = () => {
    setImageUrl(inputURL);
    setFaceBoxes([]);

    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, inputURL)
      .then((response) => {
        const regions = response.outputs[0].data.regions || [];
        const boxes = regions.map((region) => {
          const face = region.region_info.bounding_box;
          const image = document.getElementById("input-image");
          const width = image.width;
          const height = image.height;

          return {
            leftCol: face.left_col * width,
            topRow: face.top_row * height,
            rightCol: width - face.right_col * width,
            bottomRow: height - face.bottom_row * height,
          };
        });
        setFaceBoxes(boxes);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Face Detection App</h1>
        <div>
          <input
            type="text"
            placeholder="Enter image URL"
            onChange={onInputChange}
          />
          <button onClick={onDetectClick}>Detect</button>
        </div>
        <div className="image-container">
          <img id="input-image" src={imageUrl} alt="" />
          {faceBoxes.map((box, index) => (
            <div
              key={index}
              className="bounding-box"
              style={{
                top: box.topRow,
                right: box.rightCol,
                bottom: box.bottomRow,
                left: box.leftCol,
              }}
            ></div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default FaceDetection;
