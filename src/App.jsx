import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chains from "components/Chains";
import Profile from "components/Profile/Profile";
import ERC20Balance from "components/ERC20Balance";
import NFTBalance from "components/NFTBalance";
import EditProfile from "components/EditProfile/EditProfile";
import { Layout } from "antd";
import "antd/dist/antd.css";
import "./style.css";
import Game from "components/Game";
import Contract from "components/Contract/Contract";
import MenuItems from "./components/MenuItems";
import Background from "./assets/background.png";
const { Header } = Layout;

const styles = {
  content: {
    display: "flex",
    justifyContent: "center",
    fontFamily: "Roboto, sans-serif",
    color: "#041836",
    marginTop: "130px",
    padding: "10px",
  },
  header: {
    position: "fixed",
    zIndex: 1,
    width: "100%",
    background: "#fff",
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
const App = ({ isServerInfo }) => {
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
          <MenuItems />
          <div style={styles.headerRight}>
            <Chains />
            <Profile />
          </div>
        </Header>

        <div style={styles.content}>
          <Routes>
            <Route path="/erc20balance" element={<ERC20Balance />} />
            <Route path="/nftBalance" element={<NFTBalance />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/contract" element={<Contract />} />
            <Route path="/" element={<Game isServerInfo={isServerInfo} />} />
          </Routes>
        </div>
      </Router>
      {/* <Footer style={{ height: 0, textAlign: "center" }}> </Footer> */}
    </Layout>
  );
};

export default App;
