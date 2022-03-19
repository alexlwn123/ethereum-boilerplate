import { Image, Button, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
// import { useMoralis } from "react-moralis";
import Skiing from "../assets/Skiing.jpg";
import Unity, { UnityContext } from "react-unity-webgl";

const styles = {
  title: {
    fontSize: "20px",
    fontWeight: "700",
  },
  text: {
    fontSize: "16px",
  },
  card: {
    boxShadow: "0 0.5rem 1.2rem rgb(189 197 209 / 20%)",
    border: "1px solid #e7eaf3",
    borderRadius: "0.5rem",
  },
  timeline: {
    marginBottom: "-45px",
  },
};
const unityContext = new UnityContext({
  loaderUrl: "/game/snowRider-build.loader.js",
  dataUrl: "/game/snowRider-build.data",
  frameworkUrl: "/game/snowRider-build.framework.js",
  codeUrl: "/game/snowRider-build.wasm",
});

export default function Game() {
  // const { Moralis } = useMoralis();
  styles.title;
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    unityContext.setFullscreen(true);
    unityContext.on("loaded", () => {
      setIsLoaded(true);
      console.log("loaded!!!");
    });
  }, []);

  const handleFullScreen = () => {
    unityContext.setFullscreen(true);
  };

  const handleBoostButton = () => {
    unityContext.send("BoostButton", "SetBoostSpeed");
  };
  const handleNormalButton = () => {
    unityContext.send("buttonUI", "SetNormalSpeed");
  };

  /*
    BoostButton -> SetBoostSpeed
    NormalLineButton -> SetNormalSpeed
    BouncyButton -> SetBouncyPhys
    SaveButton -> SaveTrackButton 
    UploadButton -> LoadTrack
    VectorButton -> SetVectorDrawer
    PointsButton -> SetPointsDrawer
    PassThroughButton -> SetPassThrough
    CheckPointButton -> CheckPoint
  */

  // const setColor

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px",
        backgroundColor: `rgba(255,255,255,0.9)`,
        width: "100%",
        height: "100%",
      }}
    >
      <Image src={Skiing} style={{ width: "0" }} />
      <Col>
        <Row>
          <Button onClick={() => handleFullScreen()}>FullScreen</Button>
          <Button onClick={() => handleBoostButton()}>Boost</Button>
          <Button onClick={() => handleNormalButton()}>Normal</Button>
        </Row>
        <Row>
          <div style={{ height: "80vh", width: "90vw" }}>
            <Unity
              style={{
                width: "100%",
                height: "100%",
                visibility: isLoaded ? "visible" : "hidden",
              }}
              unityContext={unityContext}
            />
          </div>
        </Row>
      </Col>
    </div>
  );
}
