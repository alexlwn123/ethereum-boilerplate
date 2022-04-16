import { Space, Button, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
// import { useMoralis } from "react-moralis";
import Unity, { UnityContext } from "react-unity-webgl";
import { useIndexedDB } from "react-indexed-db";

const unityContext = new UnityContext({
  loaderUrl: "/game/snowRider-build.loader.js",
  dataUrl: "/game/snowRider-build.data",
  frameworkUrl: "/game/snowRider-build.framework.js",
  codeUrl: "/game/snowRider-build.wasm",
});

export default function Game() {
  const { add, getByIndex, deleteRecord, getAll, clear } =
    useIndexedDB("autosave");
  const [isLoaded, setIsLoaded] = useState(false);
  const [savedTrack, setSavedTrack] = useState("[]");
  useEffect(() => {
    unityContext.setFullscreen(true);
    unityContext.on("loaded", async () => {
      const lines = await serializeLines();
      await unityContext.send("Manager", "LoadJsonTrack", lines);
      console.log("loaded!!!");
      setIsLoaded(true);
    });
    unityContext.on("SendTrackData", (bool, id, line) => {
      //do track save
      //boolean --> true --> written,  false -->  delete
      console.log("SAVED", bool, id, line);
      if (bool) {
        add({ id: id, line: line }); //.then((res) => {console.log('asdf')});
      } else {
        // console.log("deleting", id);
        getByIndex("line", line); //.then((line) => { console.log("line", line); });

        deleteRecord(line).then((res) => {
          console.log(res, "Deleted!");
        });
      }
    });
    // eslint-disable-next-line
  }, []);

  const serializeLines = async () => {
    const lines = await getAll("lines");
    let arr = [];
    await lines.forEach((line, key) => {
      arr.push(line.line);
      console.log(line.line, key);
    });

    return await JSON.stringify(arr);
  };

  const handleFullScreen = () => {
    unityContext.setFullscreen(true);
  };

  const handleBoostButton = () => {
    unityContext.send("ButtonControler", "SetBoostLineType");
  };
  const handleNormalButton = () => {
    unityContext.send("ButtonControler", "SetNormalSpeed");
  };
  const handleSave = async () => {
    const lines = await serializeLines();
    setSavedTrack(lines);
  };

  const handleLoad = () => {
    console.log("saved", savedTrack);
    unityContext.send("Manager", "LoadJsonTrack", savedTrack);
  };
  const handlePublish = () => {
    unityContext.send("LineManager", "LoadTrack", "{}");
  };

  const handleClear = () => {
    unityContext.send("Manager", "ClearAll", "{}");
    clear();
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
            <Button onClick={() => handleClear()}>Clear</Button>
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
