import React from "react";

type CheckedTileProps = {
  letter: string | null;
  tileState: "correct" | "almost" | "idle";
};

export default function CheckedTile({
  letter,
  tileState,
}: CheckedTileProps) {
  return (
    <div className={`empty-tile ${tileState}`}>
      <h1>{letter?.toUpperCase()}</h1>
    </div>
  );
}
