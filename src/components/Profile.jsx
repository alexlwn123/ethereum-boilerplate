import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { getEllipsisTxt } from "helpers/formatters";
import Blockie from "./Blockie";
import { Button, Card, Modal } from "antd";
import Address from "./Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./Account/config";
const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
  token: {
    padding: "0 7px",
    height: "42px",
    gap: "5px",
    width: "fit-content",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
};
function Profile(props) {
  const { authenticate, isAuthenticated, chainId, account, user } = useMoralis();
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isGuest, setIsGuest] = useState(false);

  // useEffect(() => {}, [riderName, avatar]);

  const noLogoToken = "https://etherscan.io/images/main/empty-token.png";

  if (!isAuthenticated || !account) {
    return (
      <>
        <div onClick={() => setIsAuthModalVisible(true)}>
          <p style={styles.text}>Authenticate</p>
        </div>
        <Modal
          visible={isAuthModalVisible}
          footer={null}
          onCancel={() => setIsAuthModalVisible(false)}
          bodyStyle={{
            padding: "15px",
            fontSize: "17px",
            fontWeight: "500",
          }}
          style={{ fontSize: "16px", fontWeight: "500" }}
          width="340px"
        >
          <div
            style={{
              padding: "10px",
              display: "flex",
              justifyContent: "center",
              fontWeight: "700",
              fontSize: "20px",
            }}
          >
            Connect Wallet
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                style={styles.connector}
                key={key}
                onClick={async () => {
                  try {
                    await authenticate({
                      signingMessage: "Welcome to Snow Rider!",
                      provider: connectorId,
                    });
                    window.localStorage.setItem("connectorId", connectorId);
                    setIsAuthModalVisible(false);
                  } catch (e) {
                    console.error(e);
                  }
                }}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <Text style={{ fontSize: "14px" }}>{title}</Text>
              </div>
            ))}
          </div>
        </Modal>
      </>
    );
    // return (
    //   <div style={styles.token}>
    //     <img
    //       src={props.image || noLogoToken}
    //       alt="logo"
    //       style={{ height: props?.size || "35px" }}
    //     />
    //     <span
    //       style={{ cursor: "pointer" }}
    //       onClick={toggleDisplayStyle}
    //       title={`Show in ${isUSDMode ? "ETH" : "USD"}`}
    //     >
    //       {formattedData &&
    //         (isUSDMode
    //           ? formattedData.formattedUsd
    //           : formattedData.formattedNative)}
    //     </span>
    //   </div>
    // );
  }
  return (
    <>
      {/* <button
        onClick={async () => {
          try {
            console.log("change")
            await web3._provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x38" }],
            });
            console.log("changed")
          } catch (e) {
            console.error(e);
          }
        }}
      >
        Hi
      </button> */}
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px", ...styles.text }}>
          {getEllipsisTxt(account, 6)}
        </p>
        <Blockie currentWallet scale={3} />
      </div>
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={() => setIsModalVisible(false)}
        bodyStyle={{
          padding: "15px",
          fontSize: "17px",
          fontWeight: "500",
        }}
        style={{ fontSize: "16px", fontWeight: "500" }}
        width="400px"
      >
        Snow Rider Profile
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <p style={{ fontSize: "16px", fontWeight: "500" }}>Nickname</p>
          <p>
            {console.log(user.attributes)}
            {console.log(user.get("riderName"))}
            {user.attributes.riderName
              ? user.attributes.riderName
              : "undefined"}
            {console.log(user.attributes)}
          </p>
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <Button
              onClick={() => {
                user.set("riderName", "alexlwn");
              }}
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </Button>
          </div>
        </Card>
        Account
        <Card
          style={{
            marginTop: "10px",
            borderRadius: "1rem",
          }}
          bodyStyle={{ padding: "15px" }}
        >
          <Address
            avatar="left"
            size={6}
            copyable
            style={{ fontSize: "20px" }}
          />
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <a
              href={`${getExplorer(chainId)}/address/${account}`}
              target="_blank"
              rel="noreferrer"
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              View on Explorer
            </a>
          </div>
        </Card>
        <Button
          size="large"
          type="primary"
          style={{
            width: "100%",
            marginTop: "10px",
            borderRadius: "0.5rem",
            fontSize: "16px",
            fontWeight: "500",
          }}
          onClick={async () => {
            await logout();
            window.localStorage.removeItem("connectorId");
            setIsModalVisible(false);
          }}
        >
          Disconnect Wallet
        </Button>
      </Modal>
    </>
  );
}
export default Profile;
