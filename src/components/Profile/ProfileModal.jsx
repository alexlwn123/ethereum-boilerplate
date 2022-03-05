import { useMoralis } from "react-moralis";
import { useChain } from "react-moralis";
import { Button, Card, Modal } from "antd";
import Address from "../Address/Address";
import { SelectOutlined } from "@ant-design/icons";
import { getExplorer } from "helpers/networks";
import Text from "antd/lib/typography/Text";
import { connectors } from "./Account/config";

export const AVALANCHE_MAINNET_PARAMS = {
  chainId: "0xA86A",
  chainName: "Avalanche Mainnet C-Chain",
  nativeCurrency: {
    name: "Avalanche",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
  blockExplorerUrls: ["https://snowtrace.io/"],
};

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
};
const ProfileModal = (props) => {
  const { isModalVisible, setIsModalVisible, setIsAuthModalVisible } = props;
  const { authenticate, isAuthenticated, account, logout, user, provider } =
    useMoralis();
  const { chainId, switchNetwork } = useChain();
  return (
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
        {console.log("chainId: ", chainId)}
        {!isAuthenticated || !chainId || chainId != "0xa86a" ? (
          <div style={{ marginTop: "10px", padding: "0 10px" }}>
            <p style={{ fontSize: "16px", fontWeight: "500" }}>
              Wrong Network Detected
            </p>
            <Button
              onClick={() => {
                user.set("riderName", "alexlwn");
                console.log("CLICKED");

                if (chainId != "0xa86a") switchNetwork("0xA86A");
              }}
            >
              <SelectOutlined style={{ marginRight: "5px" }} />
              Change Network to Avalanche C-Chain
            </Button>
          </div>
        ) : (
          <>
            {!isAuthenticated ? (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                <p style={styles.text}>Connected</p>
                <p style={{ fontSize: "16px", fontWeight: "500" }}>
                  2. Sign On
                </p>
                {connectors.map(({ title, icon, connectorId }, key) => (
                  <div
                    style={styles.connector}
                    key={key}
                    onClick={async () => {
                      try {
                        console.log("PROVIDER", await provider);

                        //Step 1
                        await authenticate({
                          signingMessage: "Welcome to Snow Rider!",
                          provider: connectorId,
                        });
                        window.localStorage.setItem("connectorId", connectorId);
                        //Step 2
                        console.log("PROVIDER", await provider);
                        console.log("network", await chainId);
                        if (chainId != "0xa86a")
                          provider
                            .request({
                              method: "wallet_addEthereumChain",
                              params: [AVALANCHE_MAINNET_PARAMS],
                            })
                            .catch((error) => {
                              console.error(error);
                            });
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
            ) : (
              <>
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
              </>
            )}
          </>
        )}
      </Card>
    </Modal>
  );
};

export default ProfileModal;
