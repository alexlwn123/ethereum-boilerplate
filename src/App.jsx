import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "components/Profile/Profile";
import Community from "components/Community";
import NFTs from "components/NFTs";
import Tracks from "components/Tracks";
import { Layout, Image } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import Game from "components/Game";
import MenuItems from "./components/MenuItems";
import Background from "./assets/background.png";
import { DBConfig } from "./DBConfig";
import { initDB } from "react-indexed-db";
import Logo from "./assets/Logo-SRMG.png";

const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "40px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "rgb(235, 248, 252)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontFamily: "Roboto, sans-serif",
    borderBottom: "2px solid rgba(0, 0, 0, 0.06)",
    padding: "0 10px",
    boxShadow: "0 1px 10px rgb(151 164 175 / 10%)",
  },
  headerRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    fontSize: "15px",
    fontWeight: "600",
  },
};
initDB(DBConfig);
const App = () => {
  const { isWeb3Enabled, enableWeb3, isAuthenticated, isWeb3EnableLoading } =
    useMoralis();

  useEffect(() => {
    const connectorId = window.localStorage.getItem("connectorId");
    if (isAuthenticated && !isWeb3Enabled && !isWeb3EnableLoading)
      enableWeb3({ provider: connectorId });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, isWeb3Enabled]);

  return (
    <Layout
      style={{
        height: "100vh",
        overflow: "auto",
        backgroundImage: `url(${Background})`,
        backgroundPosition: "center",
      }}
    >
      <Router>
        <Header style={styles.header}>
          <Image
            style={{ maxHeight: "63px", maxWidth: "157px" }}
            width={"30vw"}
            preview={false}
            src={Logo}
          />
          <MenuItems />
          <div style={styles.headerRight}>
            <Profile />
          </div>
        </Header>

        <div style={styles.content}>
          <Routes>
            <Route path="/community" element={<Community />} />
            <Route path="/nfts" element={<NFTs />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/" element={<Game />} />
          </Routes>
        </div>
      </Router>
      {/* <Footer style={{ height: 0, textAlign: "center" }}> </Footer> */}
    </Layout>
  );
};

export default App;
