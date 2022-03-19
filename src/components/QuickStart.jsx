import { Image, Button } from "antd";
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

export default function QuickStart() {
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

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Image src={Skiing} style={{ width: "0" }} />
      <Button onClick={() => handleFullScreen()}>FullScreen</Button>
      <vr />
      <div style={{ height: 1000 }}>
        <Unity
          style={{
            width: "100%",
            height: "100%",
            border: "2px solid black",
            visibility: isLoaded ? "visible" : "hidden",
          }}
          unityContext={unityContext}
        />
      </div>
    </div>
  );
}
