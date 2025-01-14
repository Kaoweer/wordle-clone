import React from "react";

type CheckedTileProps = {
  letter: string;
  tileState: "correct" | "almost" | "idle";
};

export default function CheckedTile({
  letter,
  tileState,
}: CheckedTileProps) {
  return (
    <div className={`empty-tile ${tileState}`}>
      <h1>{letter}</h1>
    </div>
  );
}
