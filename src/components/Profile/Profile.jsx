import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
// import { getEllipsisTxt } from "helpers/formatters";
import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";
const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
};
function Profile() {
  const { isAuthenticated, account, user, chainId } = useMoralis();

  useEffect(() => {}, [isAuthenticated, chainId, user]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !account || !chainId || chainId != "0xa86a") {
    return (
      <>
        <div
          onClick={() => {
            console.log("auth", isAuthenticated, user, account, chainId);
            setIsAuthModalVisible(true);
          }}
        >
          <p style={styles.text}>Authenticate</p>
        </div>
        <AuthModal
          isAuthModalVisible={isAuthModalVisible}
          setIsAuthModalVisible={setIsAuthModalVisible}
        />
      </>
    );
  }
  return (
    <>
      <div style={styles.account} onClick={() => setIsModalVisible(true)}>
        <p style={{ marginRight: "5px", ...styles.text }}>
          {user.get("riderName") ? user.get("riderName") : "Ridername"}
        </p>
      </div>
      <ProfileModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
      />
    </>
  );
}
export default Profile;
