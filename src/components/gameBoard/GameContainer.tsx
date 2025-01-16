import React, { useState, useRef, useEffect } from "react";
import EmptyTile from "../tiles/EmptyTile";
import TilesRows from "../tiles/tilesRow/TilesRows";
import fetchWordFromAPI from "../../APIs/wordAPI";
import triesDict from "../../storage/wordTries";
import "./GameContainer.css";
import CharacterList from "./CharacterList";

interface WordProperties {
  [key: string]: number;
}

export default function GameContainer() {
  const [word, setWord] = useState<string>("");
  const [wordArr, setWordArr] = useState<string[]>(["", "", "", "", "", ""]);
  const [curRow, setCurRow] = useState<number>(0);
  const [correctWord, setCorrectWord] = useState<string>("");
  const [wordProperties, setWordProperties] = useState({});
  const [letterCount, setLetterCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInvalid, setIsInvalid] = useState(false);
  const [letterSet, setLetterSet] = useState(new Set());
  const inputRef = useRef<HTMLInputElement>(null);

  const hdlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    const newArr = [...wordArr];
    newArr[curRow] = e.target.value.toLowerCase();
    setWordArr(newArr);
  };

  useEffect(() => {
    const fetchWord = async () => {
      setIsLoading(true);
      const correctWord = await fetchWordFromAPI();
      setCorrectWord(correctWord);

      for (const letter of correctWord.split("")) {
        setWordProperties((prev: WordProperties) => {
          return { ...prev, [letter]: (prev[letter] || 0) + 1 };
        });
        setLetterCount((prev: WordProperties) => {
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
      // Fix: Use proper state update pattern
      setLetterCount((prev: { [key: string]: number }) => ({
        ...prev,
        [e.key]: (prev[e.key] || 0) - 1,
      }));
    }
    if (inputRef.current && e.key) {
      inputRef.current.focus();
    }
    if (e.key === "Enter") {
      hdlNext();
    }
  };

  useEffect(() => {
    if (isInvalid) {
      const timer = setTimeout(() => {
        setIsInvalid(false);
      }, 500); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [isInvalid]);

  const hdlNext = () => {
    if (word.toLowerCase() === correctWord.toLowerCase()) {
      alert("Congratulations! You won!");
      return;
    }
    if (word.length === 5) {
      if (!triesDict.search(word.toLowerCase())) {
        return setIsInvalid(true);
      }
      if (curRow >= wordArr.length - 1) {
        setCurRow(curRow + 1);
        alert("Game Over! The word was: " + correctWord);
        return;
      }
      setLetterSet((prevSet) => new Set([...prevSet, ...word.split("")]));
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
          {/* correct : {correctWord}, properties : {JSON.stringify(wordProperties)} */}
          <input
            ref={inputRef}
            onChange={(e) => hdlChange(e)}
            type="text"
            maxLength={5}
            className="hidden"
          />
          {[...Array(6)].map((_, i) => (
            <TilesRows
              key={i}
              curRow={curRow}
              correctWord={correctWord}
              word={word}
              wordArr={wordArr}
              rowId={i}
              isInvalid={isInvalid}
            />
          ))}
          <CharacterList letterSet={letterSet} />
        </>
      )}
    </div>
  );
}
