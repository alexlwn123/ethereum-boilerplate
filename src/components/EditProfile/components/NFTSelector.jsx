// import { useERC20Balance } from "hooks/useERC20Balance";
import { useMoralis, useNFTBalances } from "react-moralis";
import { Image, Select } from "antd";
// import { useMemo } from "react";

export default function NFTSelector({ setAsset, style }) {
  console.log(setAsset);
  const { getNFTBalances } = useNFTBalances();
  console.log(getNFTBalances);

  const { Moralis } = useMoralis();

  // const fullBalance = useMemo(() => {
  //   if (!data) return null;
  //   return [
  //     ...data,
  //     {
  //       balance: 0,
  //       decimals: 1,
  //       name: "temp",
  //       symbol: "test",
  //       token_address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  //     },
  //   ];
  // }, [data]);

  const fullBalance = false;

  function handleChange(value) {
    console.log(value);
    const token = fullBalance.find((token) => token.token_address === value);
    setAsset(token);
  }

  return (
    <Select onChange={handleChange} size="large" style={style}>
      <div />
      {1 == 2 &&
        fullBalance &&
        fullBalance.map((item) => {
          console.log(item);
          return (
            <Select.Option
              value={item["token_address"]}
              key={item["token_address"]}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: "8px",
                }}
              >
                <Image
                  src={
                    item.logo ||
                    "https://etherscan.io/images/main/empty-token.png"
                  }
                  alt="nologo"
                  width="24px"
                  height="24px"
                  preview={false}
                  style={{ borderRadius: "15px" }}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "90%",
                  }}
                >
                  <p>{item.symbol}</p>
                  <p style={{ alignSelf: "right" }}>
                    (
                    {parseFloat(
                      Moralis?.Units?.FromWei(item.balance, item.decimals),
                    )?.toFixed(6)}
                    )
                  </p>
                </div>
              </div>
            </Select.Option>
          );
        })}
    </Select>
  );
}
