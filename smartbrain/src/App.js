// import files
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import { useCallback } from "react";
import Particles from "react-particles";
import SignIn from "./Components/signin/SignIn";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { loadSlim } from "tsparticles-slim";
import Rank from "./Components/Rank/Rank";
import { useState, useEffect } from "react";
// main app function
function App() {
  const [text, setText] = useState("");
  const [facebox, setFaceBox] = useState("");
  // calculate face location function
  const calculateFaceLocation = (data) => {
    const face = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: face.left_col * width,
      topRow: face.top_row * height,
      rightCol: width - face.right_col * width,
      bottomRow: height - face.bottom_row * height,
    };
  };
  // display Face Box function
  const displayFaceBox = (box) => {
    console.log(box);
    setFaceBox(box);
  };

  function inputChange(e) {
    setText(e.target.value);
  }

  const onSubmit = () => {
    console.log("Click");
  };

  // api call method
  const raw = {
    user_app_id: {
      user_id: "clarifai",
      app_id: "main",
    },
    inputs: [
      {
        data: {
          image: {
            url: text,
          },
        },
      },
    ],
  };

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key 2820acdfae4f4f47bef8526cf6e76dc8",
    },
    body: JSON.stringify(raw),
  };

  useEffect(() => {
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/versions/6dc7e46bc9124c5c8824be4822abe105/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => displayFaceBox(calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  }, [text]);

  // particle js
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <div className="App">
      <Particles
        className="particles"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "linear-gradient(89deg,#FF5EDF 0%,#04C8DE 100%)",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 5,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 100,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "square",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route index element={<SignIn />} />
          <Route
            path="/home"
            element={
              <>
                <Navigation />
                <Logo />
                <Rank />
                <ImageLinkForm
                  inputChange={inputChange}
                  onSubmit={onSubmit}
                  imgu={text}
                />
                <FaceRecognition ibox={facebox} imgUrl={text} />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
