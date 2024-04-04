import React from "react";

export default function Content({ children }) {
  return (
    <div className="border">
      <div className="content">{children}</div>
    </div>
  );
}
