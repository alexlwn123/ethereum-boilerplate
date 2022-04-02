// import { useMoralis } from "react-moralis";
import { useEffect } from "react";
import { useIndexedDB } from "react-indexed-db";
import { Tabs, Button, Skeleton, Table } from "antd";
const { TabPane } = Tabs;

// const styles = {
//   title: {
//     textAlign: "center",
//   },
// };
const loadTrack = (trackId) => {
  //TODO: Write load track code
  console.log("loading track:", trackId);
};
const getTracks = () => {
  return [
    {
      key: 0,
      trackName: "Track 1",
      author: "Xian",
      snowLeopard: 913,
      trackId: 0,
      plays: 12312,
    },
  ];
};

const Tracks = () => {
  // const { data: assets } = useERC20Balances(props);
  // const { Moralis } = await useMoralis();
  const tracksTable = useIndexedDB("tracks");
  // const autosaveTable = useIndexedDB("autosave");
  useEffect(() => {
    // add({
    //   trackName: "",
    //   creator: "",
    //   plays: "",
    //   published: false,
    //   lines: [{ x1: 0, x2: 1, y1: 0, y2: 1 }],
    // });
    tracksTable.getAll().then((res) => {
      console.log(res);
    });
    tracksTable.getByID(1).then((res) => {
      console.log("line", res);
    });
    // eslint-disable-next-line
  }, []);
  const tracks = getTracks();

  const columns = [
    {
      title: "",
      dataIndex: "trackId",
      key: "trackId",
      render: (trackId) => (
        <Button onClick={() => loadTrack(trackId)}>Play!</Button>
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
      dataIndex: "author",
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
        <TabPane tab="Community Tracks" key="1">
          <Skeleton loading={!tracks}>
            <Table scroll={{ x: 600 }} dataSource={tracks} columns={columns} />
          </Skeleton>
        </TabPane>
        <TabPane tab="My Tracks" key="2">
          <Skeleton loading={!tracks}>
            <Table scroll={{ x: 600 }} dataSource={tracks} columns={columns} />
          </Skeleton>
        </TabPane>
      </Tabs>
    </div>
  );
};
export default Tracks;
