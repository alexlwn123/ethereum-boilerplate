import { Menu } from "antd";
import { Link } from "react-router-dom";

function MenuItems() {
  return (
    <Menu
      theme="light"
      mode="horizontal"
      style={{
        display: "flex",
        fontSize: "17px",
        fontWeight: "500",
        width: "100%",
        justifyContent: "center",
      }}
    >
      <Menu.Item key="/">
        <Link to="/">🚀 Quick Start</Link>
      </Menu.Item>
      <Menu.Item key="/erc20balance">
        <Link to="/erc20balance">💰 Balances</Link>
      </Menu.Item>
      <Menu.Item key="/nftBalance">
        <Link to="/nftBalance">🖼 NFTs</Link>
      </Menu.Item>
      <Menu.Item key="/profile">
        <Link to="/profile">🖼 Profile</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
