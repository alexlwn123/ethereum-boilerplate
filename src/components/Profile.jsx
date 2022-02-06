// import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
// import { getEllipsisTxt } from "helpers/formatters";
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
function Profile() {
  const { isAuthenticated, chainId, account, user } = useMoralis();

  // useEffect(() => {}, [riderName, avatar]);

  if (!isAuthenticated || !account || !chainId) {
    return <div />;
  }
  return (
    <>
      <div style={styles.account}>
        <p style={{ marginRight: "5px", ...styles.text }}>
          {user.get("riderName")}
        </p>
      </div>
    </>
  );
}
export default Profile;
