import { Space, Button, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
// import { useMoralis } from "react-moralis";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "/game/snowRider-build.loader.js",
  dataUrl: "/game/snowRider-build.data",
  frameworkUrl: "/game/snowRider-build.framework.js",
  codeUrl: "/game/snowRider-build.wasm",
});

export default function Game() {
  // const { Moralis } = useMoralis();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    unityContext.setFullscreen(true);
    unityContext.on("loaded", () => {
      setIsLoaded(true);
      console.log("loaded!!!");
    });
    unityContext.on("SendTrackData", (data) => {
      //do track save
      console.log("SAVED", data);
    });
  }, []);

  const loadTrack = () => {
    console.log("Loading Track...");
  };

  const saveTrack = () => {
    console.log("Saving Track...");
  };

  const handleFullScreen = () => {
    unityContext.setFullscreen(true);
  };

  const handleBoostButton = () => {
    unityContext.send("ButtonControler", "UseBoostLine");
  };
  const handleNormalButton = () => {
    unityContext.send("ButtonControler", "SetNormalSpeed");
  };
  const handleSave = () => {
    unityContext.send("ButtonControler", "SaveTrack");
    saveTrack();
  };
  const handleLoad = () => {
    unityContext.send("Manager", "LoadTrack", "{}");
    loadTrack();
  };
  const handlePublish = () => {
    unityContext.send("Manager", "LoadTrack", "{}");
    loadTrack();
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
        gap: "20px",
        width: "90vh",
        margin: "50px",
      }}
    >
      <Space direction="vertical">
        <Col justify="center">
          <Row>
            <Button onClick={() => handleFullScreen()}>FullScreen</Button>
            <Button onClick={() => handleBoostButton()}>Boost</Button>
            <Button onClick={() => handleNormalButton()}>Normal</Button>
            <Button onClick={() => handleSave()}>Save</Button>
            <Button onClick={() => handleLoad()}>Load</Button>
            <Button onClick={() => handlePublish()}>Publish</Button>
          </Row>
          <Row>
            <div style={{ height: "80vh", width: "60vw" }}>
              <Unity
                style={{
                  maxWidth: "100%",
                  height: "100%",
                  visibility: isLoaded ? "visible" : "hidden",
                }}
                unityContext={unityContext}
              />
            </div>
          </Row>
        </Col>
      </Space>
    </div>
  );
}
