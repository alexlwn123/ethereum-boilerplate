// import { useMoralis } from "react-moralis";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useIndexedDB } from "react-indexed-db";
import { Tabs, Button, Skeleton, Table } from "antd";
const { TabPane } = Tabs;

const Tracks = () => {
  // const { data: assets } = useERC20Balances(props);
  // const { Moralis } = await useMoralis();
  const { getAll } = useIndexedDB("tracks");
  // const autosaveTable = useIndexedDB("autosave");

  const loadTrack = (trackId) => {
    //TODO: Write load track code
    console.log("loading track:", trackId);
  };

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getAll().then((res) => {
      setTracks(res);
    });
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "",
      dataIndex: "id",
      key: "trackId",
      render: (trackId) => (
        <Link to={"/game/" + parseInt(trackId)}>
          <Button onClick={() => loadTrack(trackId)}>Play!</Button>
        </Link>
      ),
    },
    {
      title: "Track Name",
      dataIndex: "trackName",
      key: "trackName",
      render: (trackName) => trackName,
    },
    {
      title: "Author",
      dataIndex: "creator",
      key: "author",
      render: (author) => author,
    },
    {
      title: "Snow Leopard",
      dataIndex: "snowLeopard",
      key: "snowLeopard",
      render: (snowLeopard) => snowLeopard,
    },
    {
      title: "Plays",
      dataIndex: "plays",
      key: "plays",
      render: (snowLeopard) => snowLeopard,
    },
  ];

  return (
    <div
      style={{
        backgroundColor: `rgba(255,255,255,0.9)`,
        minWidth: "65vw",
        padding: "15px",
        marginTop: "100px",
      }}
    >
      <Tabs>
        <TabPane tab="My Tracks" key="1">
          <Skeleton loading={!tracks}>
            <Table scroll={{ x: 600 }} dataSource={tracks} columns={columns} />
          </Skeleton>
        </TabPane>
        <TabPane tab="Community Tracks" key="2">
          <Skeleton loading={!tracks}>
            <Table scroll={{ x: 600 }} dataSource={tracks} columns={columns} />
          </Skeleton>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Tracks;
