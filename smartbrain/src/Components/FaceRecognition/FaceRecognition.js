import "./FaceRecognition.css";
const FaceRecognition = ({ imgUrl, ibox }) => {
  console.log(ibox.topRow + " " + ibox.leftCol);
  return (
    <div className="center">
      <div className="absolute mt2">
        <img
          id="inputimage"
          src={imgUrl}
          alt="No Url entered"
          width="500px"
          height="auto"
        />
        <div
          className="bounding-box"
          style={{
            top: ibox.topRow + "px",
            right: ibox.rightCol,
            bottom: ibox.bottomRow,
            left: ibox.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};
export default FaceRecognition;
