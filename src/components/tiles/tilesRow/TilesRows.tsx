import React from "react";
import "../tiles.css";
import EmptyTile from "../EmptyTile";

interface TilesRowsProps {
  word: string;
  wordArr: string[];
  rowId: number;
  correctWord: string;
}


export default function TilesRows({ rowId, wordArr,correctWord,word }: TilesRowsProps) {
  return (
    <div className="tiles-row">
      {[...Array(5)].map((_, i) => {
        return (
          <>
            <EmptyTile correctLetter={correctWord[i]} key={i} letter={wordArr[rowId] ? wordArr[rowId][i] : ''}/>
          </>
        );
      })}
    </div>
  );
}
