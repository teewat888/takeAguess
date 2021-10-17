import React from "react";
import { useLocation } from "react-router";
import ImageBox from "./ImageBox";

const NoMatch = () => {
  let location = useLocation();
  return (
    <div>
      <ImageBox />
      <div style={{ textAlign: "center" }}>
        <h3>Sorry the page {location.pathname} is not existed.</h3>
      </div>
    </div>
  );
};

export default NoMatch;
