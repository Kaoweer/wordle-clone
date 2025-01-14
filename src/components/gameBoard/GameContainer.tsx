import React, { useState, useRef, useEffect } from "react";
import EmptyTile from "../tiles/EmptyTile";
import TilesRows from "../tiles/tilesRow/TilesRows";

export default function GameContainer() {
  const [word, setWord] = useState<string>("");
  const [wordArr, setWordArr] = useState<string[]>(["", "", "", "", ""]);
  const [curRow, setCurRow] = useState<number>(0);
  const [correctWord, setCorrectWord] = useState<string>("");
  const [wordProperties, setWordProperties] = useState({});
  const [letterCount, setLetterCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const hdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    const newArr = [...wordArr];
    newArr[curRow] = e.target.value;
    setWordArr(newArr);
  };

  useEffect(() => {
    const fetchWord = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://random-word-api.herokuapp.com/word?length=5&number=1"
      );
      const data = await response.json();
      const correctWord = data[0];
      setCorrectWord(correctWord);

      for (const letter of correctWord.split("")) {
        setWordProperties((prev: any) => {
          return { ...prev, [letter]: (prev[letter] || 0) + 1 };
        });
        setLetterCount((prev: any) => {
          return { ...prev, [letter]: (prev[letter] || 0) + 1 };
        });
      }
      setIsLoading(false);
    };
    fetchWord();
  }, []);

  const hdlKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (
      !(
        (e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) ||
        (e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90)
      )
    ) {
      e.preventDefault();
      setLetterCount((prev: any) => {
        prev[e.key] -= 1;
      });
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
      {isLoading ? (
        <div>Loading word...</div>
      ) : (
        <>
          correct : {correctWord}, properties : {JSON.stringify(wordProperties)}
          <input
            ref={inputRef}
            onChange={(e) => hdlChange(e)}
            type="text"
            maxLength={5}
            className="hidden"
          />
          {[...Array(6)].map((_, i) => (
            <TilesRows
              curRow={curRow}
              correctWord={correctWord}
              word={word}
              wordArr={wordArr}
              key={i}
              rowId={i}
              letterCount={letterCount}
            />
          ))}
        </>
      )}
    </div>
  );
}
