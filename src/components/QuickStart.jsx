import { Image } from "antd";
import React from "react";
// import { useMoralis } from "react-moralis";
import Skiing from "../assets/Skiing.jpg";
// import Unity, { UnityContext } from "react-unity-webgl";

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

// const unityContext = new UnityContext({
//   loaderUrl: "../../public/snowRider-build.loader.js",
//   dataUrl: "../../public/snowRider-build.data",
//   frameworkUrl: "../../public/snowRider-build.framework.js",
//   codeUrl: "../../public/snowRider-build.wasm",
// });
// const unityContext = new UnityContext({
//   loaderUrl: "public/snowRider-build.loader.js",
//   dataUrl: "public/snowRider-build.data",
//   frameworkUrl: "public/snowRider-build.framework.js",
//   codeUrl: "public/snowRider-build.wasm",
// });

export default function QuickStart() {
  // const { Moralis } = useMoralis();
  styles.title;

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      <Image src={Skiing} />
    </div>
    // <Unity unityContext={unityContext} />
  );
}
