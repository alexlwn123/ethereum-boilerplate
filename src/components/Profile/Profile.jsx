import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
// import { getEllipsisTxt } from "helpers/formatters";
import AuthModal from "./AuthModal";
import ProfileModal from "./ProfileModal";
import { Image } from "antd";
import Pic from "../../assets/Button-1.png";
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
  const [riderName, setRiderName] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      const rider = user.get("riderName");
      console.log("ridername", rider);
      if (rider) {
        console.log("setting rider to ", rider);
        setRiderName(rider);
      } else {
        console.log("setting rider to ", user.id);
        user.set("riderName", user.id);
      }
    }
  }, [account, isAuthenticated, setRiderName, user]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);

  if (!isAuthenticated || !account || !chainId || chainId != "0xa86a") {
    return (
      <>
        <div
          onClick={() => {
            setIsAuthModalVisible(true);
          }}
          style={{ alignItems: "center" }}
        >
          {/* <p style={styles.text}>Authenticate</p> */}
          <Image
            style={{ width: "200px", marginTop: "30px" }}
            preview={false}
            src={Pic}
          />
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
        <p style={{ marginRight: "5px", ...styles.text }}>{riderName}</p>
      </div>
      <ProfileModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        riderName={riderName}
      />
    </>
  );
}
export default Profile;
