import React, { useState, useRef } from "react";
import EmptyTile from "../tiles/EmptyTile";
import TilesRows from "../tiles/tilesRow/TilesRows";

export default function GameContainer() {
  const [word, setWord] = useState<string>("");
  const [wordArr, setWordArr] = useState<string[]>(["", "", "", "", ""]);
  const [curRow, setCurRow] = useState<number>(0);
  const [correctWord, setCorrectWord] = useState<string>("apple");
  // turn into correct word properties
  const inputRef = useRef<HTMLInputElement>(null);

  const hdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    const newArr = [...wordArr];
    newArr[curRow] = e.target.value;
    setWordArr(newArr);
  };

  const hdlKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      !(
        (e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) ||
        (e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90)
      )
    ) {
      e.preventDefault();
    }
    if (inputRef.current && e.key) {
      inputRef.current.focus();
    }
    if (e.key === "Enter") {
      hdlNext();
    }
  };

  const hdlNext = () => {
    if (curRow < 5 && word.length === 5) {
      setCurRow(curRow + 1);
      setWord("");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  };

  return (
    <div onKeyDown={hdlKeyDown} tabIndex={0} className="tiles-container">
      <input
        ref={inputRef}
        onChange={(e) => hdlChange(e)}
        type="text"
        maxLength={5}
        className="hidden"
      />
      <button onClick={hdlNext}>next</button>
      {[...Array(6)].map((_, i) => (
        <TilesRows correctWord={correctWord} word={word} wordArr={wordArr} key={i} rowId={i} />
      ))}
    </div>
  );
}
