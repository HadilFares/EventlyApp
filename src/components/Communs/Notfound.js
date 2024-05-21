import React from "react";
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <p>404 Not Found</p>;
      <Link to="/">Click here to go back to Evently Page...</Link>
    </div>
  );
};

export default Notfound;
