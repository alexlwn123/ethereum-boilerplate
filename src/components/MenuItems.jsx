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
        <Link to="/">🚀 Game</Link>
      </Menu.Item>
      <Menu.Item key="/tracks">
        <Link to="/tracks">🖼 Tracks</Link>
      </Menu.Item>
      <Menu.Item key="/community">
        <Link to="/community">Community</Link>
      </Menu.Item>
      <Menu.Item key="/nfts">
        <Link to="/nfts">🖼 NFTs</Link>
      </Menu.Item>
    </Menu>
  );
}

export default MenuItems;
