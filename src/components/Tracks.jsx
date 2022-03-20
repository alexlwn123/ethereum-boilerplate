// import { useMoralis } from "react-moralis";
import { Button, Skeleton, Table } from "antd";

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
        width: "65vw",
        padding: "15px",
        marginTop: "100px",
      }}
    >
      <h1>My Tracks</h1>
      <Skeleton loading={!tracks}>
        <Table dataSource={tracks} columns={columns} />
      </Skeleton>
    </div>
  );
};
export default Tracks;
