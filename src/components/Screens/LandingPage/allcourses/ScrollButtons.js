import React from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
const ScrollButtons = ({ onScroll }) => {
  return (
    <div
      className="d-flex align-items-center mt-5"
      style={{ cursor: "pointer" }}
    >
      <ChevronLeftIcon fontSize={20} onClick={() => onScroll(-50)} />
      <ChevronRightIcon fontSize={20} onClick={() => onScroll(50)} />
    </div>
  );
};

export default ScrollButtons;
