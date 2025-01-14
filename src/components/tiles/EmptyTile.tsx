import React, { useCallback, useEffect, useState } from "react";
import "./tiles.css";

type EmptyTileProps = {
  letter:string
}

export default function EmptyTile({letter}:EmptyTileProps) {
  return (
    <div className={`empty-tile`}>
      <h1>{letter}</h1>
    </div>
  );
}
