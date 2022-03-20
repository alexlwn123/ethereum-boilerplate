// import { useMoralis } from "react-moralis";
import { Skeleton, Table } from "antd";

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

const Community = () => {
  // const { data: assets } = useERC20Balances(props);
  // const { Moralis } = await useMoralis();
  const tracks = getTracks();
  console.log(tracks);

  const columns = [
    // {
    //   title: "",
    //   dataIndex: "logo",
    //   key: "logo",
    //   render: (logo) => (
    //     <img
    //       src={logo || "https://etherscan.io/images/main/empty-token.png"}
    //       alt="nologo"
    //       width="28px"
    //       height="28px"
    //     />
    //   ),
    // },
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

  console.log(Table, tracks, columns);
  return (
    <div
      style={{
        backgroundColor: `rgba(255,255,255,0.9)`,
        width: "65vw",
        padding: "15px",
        marginTop: "100px",
      }}
    >
      <h1>Community Tracks</h1>
      <Skeleton loading={!tracks}>
        <Table dataSource={tracks} columns={columns} />
      </Skeleton>
    </div>
  );
};
export default Community;
