import { useChain, useMoralis } from "react-moralis";
import { connectors } from "./Account/config";
import { Modal } from "antd";
import Text from "antd/lib/typography/Text";

const styles = {
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

const AuthModal = (props) => {
  const { isAuthModalVisible, setIsAuthModalVisible } = props;
  const { authenticate, isAuthenticated } = useMoralis();
  const { switchNetwork, chainId } = useChain();
  return (
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
                //Step 1
                if (isAuthenticated && chainId != "0xa86a") {
                  console.log("switching chain");
                  await switchNetwork("0xA86A");
                  window.location.reload();
                }
                //Step 2
                if (!isAuthenticated) {
                  console.log("authenticating");
                  await authenticate({
                    signingMessage: "Welcome to Snow Rider!",
                    provider: connectorId,
                  });
                  await switchNetwork("0xA86A");
                  window.location.reload();
                }
                window.localStorage.setItem("connectorId", connectorId);
                //Step 3
                // console.log(user);
                // const name = user.get("riderName");
                // console.log("username", name);
                // if (!name) {
                //   user.set("riderName", account);
                // }
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
  );
};

export default AuthModal;
