import React, { useCallback, useEffect, useState } from "react";
import "./tiles.css";

type EmptyTileProps = {
  letter:string | null
}

export default function EmptyTile({letter}:EmptyTileProps) {
  return (
    <div className={`empty-tile `}>
      <h1>{letter?.toUpperCase()}</h1>
    </div>
  );
}
