import { Form, Button, Input } from "antd";
import Text from "antd/lib/typography/Text";
import { useState, useEffect } from "react";
import NFTSelector from "./NFTSelector";
import { useMoralis } from "react-moralis";

const styles = {
  card: {
    alignItems: "center",
    width: "100%",
  },
  header: {
    textAlign: "center",
  },
  input: {
    width: "100%",
    outline: "none",
    fontSize: "16px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textverflow: "ellipsis",
    appearance: "textfield",
    color: "#041836",
    fontWeight: "700",
    border: "none",
    backgroundColor: "transparent",
  },
  select: {
    marginTop: "20px",
    display: "flex",
    alignItems: "center",
    alignContent: "center",
  },
  textWrapper: { maxWidth: "80px", width: "100%" },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexDirection: "row",
  },
};

function Transfer() {
  // Moralis.start()
  const [asset, setAsset] = useState("");
  // const [name, setName] = useState("");
  console.log(asset, setAsset);
  // const [name, setName] = useState("");
  // const [user, setUser] = useState("");
  const { user } = useMoralis();
  useEffect(() => {
    // setUser(Moralis.User.current());
    console.log(user);
    // console.log(user.get("riderName"));
  }, [user]);

  const onFinish = (values) => {
    console.log("finish", values);
    user.set("riderName", values.riderName);
    window.location.reload();
  };
  const onFinishFailed = (values) => {
    console.error("finish", values);
  };
  return (
    <div style={styles.card}>
      <div style={styles.tranfer}>
        <div style={styles.header}>
          <h3>Edit Profile</h3>
        </div>
        <Form
          name="Rider Profile"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div style={styles.select}>
            <div style={styles.textWrapper}>
              <Text strong>Rider Name</Text>
            </div>
            <Form.Item
              name="riderName"
              rules={[
                { required: true, message: "Please input your Rider Name!" },
              ]}
            >
              <Input size="large" />
            </Form.Item>
          </div>
          <div style={styles.select}>
            <div style={styles.textWrapper}>
              <Text strong>Asset:</Text>
            </div>
            <NFTSelector style={{ width: "100%" }} />
          </div>
          <div style={styles.select}>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Transfer;
