import React, { useContext } from "react";
import { AppContext } from "../App";

const ImageBox = () => {
  const { banner } = useContext(AppContext);
  return (
    <>
      <img src={banner} width="735" height="200" />
    </>
  );
};

export default ImageBox;
