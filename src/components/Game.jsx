import { Space, Button, Row, Col } from "antd";
import React, { useState, useEffect } from "react";
// import { useMoralis } from "react-moralis";
import Unity, { UnityContext } from "react-unity-webgl";
import { useIndexedDB } from "react-indexed-db";
import { useParams } from "react-router-dom";

const unityContext = new UnityContext({
  loaderUrl: "https://snowrider.s3.amazonaws.com/snowRider-build.loader.js",
  dataUrl: "https://snowrider.s3.amazonaws.com/snowRider-build.data",
  frameworkUrl:
    "https://snowrider.s3.amazonaws.com/snowRider-build.framework.js",
  codeUrl: "https://snowrider.s3.amazonaws.com/snowRider-build.wasm",
});

export default function Game() {
  const { add, getByIndex, deleteRecord, getAll, clear } =
    useIndexedDB("autosave");
  const Tracks = useIndexedDB("tracks");
  const [isLoaded, setIsLoaded] = useState(false);
  const { trackid } = useParams();
  // const [savedTrack, setSavedTrack] = useState("[]");
  useEffect(() => {
    unityContext.setFullscreen(true);
    unityContext.on("loaded", async () => {
      // console.log(await Tracks.getByID(trackid));
      const strs = JSON.parse(
        trackid == null
          ? await serializeLines()
          : (await Tracks.getByID(trackid)).lines,
      );
      const out = JSON.stringify({ Items: strs });
      unityContext.send("Manager", "UploadJsonTrack", out);

      console.log("loaded!!!");
      setIsLoaded(true);
    });
    unityContext.on("SendTrackData", (bool, id, line) => {
      //do track save
      //boolean --> true --> written,  false -->  delete
      console.log("SAVED", bool, id, line);
      if (bool) {
        add({ line: line }); //.then((res) => {console.log('asdf')});
      } else {
        // console.log("deleting", id);
        getByIndex("line", line); //.then((line) => { console.log("line", line); });

        deleteRecord(line);
      }
    });
    // eslint-disable-next-line
  }, []);

  const serializeLines = async () => {
    const lines = await getAll("lines");
    let arr = [];
    console.log("ser", lines);
    await lines.forEach((line) => {
      arr.push(line.line);
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
    Tracks.add({
      creator: "myName",
      published: false,
      trackName: "testName",
      lines: lines,
      plays: 0,
      id: 3,
    });
  };

  const handleLoad = () => {
    const trackString = Tracks.getByID(0);
    const strs = JSON.parse(trackString);
    strs.forEach((line, key) => {
      key;
      console.log(line);
      add({ line: line });
    });
    const out = JSON.stringify({ Items: strs });
    unityContext.send("Manager", "UploadJsonTrack", out);
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
