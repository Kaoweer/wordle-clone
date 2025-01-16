import React, { useEffect, useState } from "react";
import "../tiles.css";
import EmptyTile from "../EmptyTile";
import CheckedTile from "../CheckedTile";

interface TilesRowsProps {
  word: string;
  wordArr: string[];
  rowId: number;
  correctWord: string;
  curRow: number;
  isInvalid?: boolean;
}

type TileState = "correct" | "almost" | "idle";
export default React.memo(
  function TilesRows({
    rowId,
    wordArr,
    correctWord,
    curRow,
    word,
    isInvalid,
  }: TilesRowsProps) {
    const [wordStatus, setWordStatus] = useState<TileState[]>([]);
    useEffect(() => {
      if (rowId === curRow) {
        const letterCount = correctWord
          .split("")
          .reduce<Record<string, number>>((acc, cur) => {
            acc[cur] = (acc[cur] || 0) + 1;
            return acc;
          }, {});

        const letterStatus = new Array(5).fill("idle");

        word.split("").forEach((letter, index) => {
          if (correctWord[index] === letter) {
            letterCount[letter] = (letterCount[letter] || 0) - 1;
            letterStatus[index] = "correct";
          }
        });

        word.split("").forEach((letter, index) => {
          if (letterCount[letter] > 0 && letterStatus[index] === "idle") {
            letterCount[letter] -= 1;
            letterStatus[index] = "almost";
          }
        });

        setWordStatus(letterStatus);
      }
    }, [curRow, rowId, word, correctWord]);

    return (
      <div
        className={`tiles-row ${
          isInvalid && rowId === curRow ? "invalid-word" : ""
        }`}
      >
        {[...Array(5)].map((_, i) => {
          const currentLetter = wordArr[rowId] ? wordArr[rowId][i] : "";
          if (rowId >= curRow) {
            return <EmptyTile key={i} letter={currentLetter} />;
          }
          return (
            <CheckedTile
              key={i}
              letter={currentLetter}
              tileState={wordStatus[i] || "idle"}
            />
          );
        })}
      </div>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.rowId !== nextProps.curRow && 
           prevProps.rowId !== (nextProps.curRow - 1);
  }
);
