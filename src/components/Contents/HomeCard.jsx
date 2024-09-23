import React from "react";
import { Card } from "antd";

const HomeCard = ({ imgSrc, bgClr, textTitle }) => {
  return (
    <>
      <Card
        hoverable
        style={{
          width: 200,
          height: 280,
        }}
        cover={<img src={imgSrc} className="p-3" />}
        className={bgClr}
      >
        <h1 className="font-semibold text-white text-lg">{textTitle}</h1>
      </Card>
    </>
  );
};

export default HomeCard;
