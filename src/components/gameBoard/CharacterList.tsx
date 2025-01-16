import React from "react";
import "./GameContainer";

type ChracterListProps = {
  letterSet: Set<string>;
};

export default function CharacterList({ letterSet }: ChracterListProps) {
  const firstLine = "QWERTYUIOP".split("");
  const secondLine = "ASDFGHJKL".split("");
  const thirdLine = "ZXCVBNM".split("");

  return (
    <div className="char-container">
      <div className="char-row">
        {firstLine.map((char) => (
          <span
            className={`char-button ${
              letterSet.has(char.toLowerCase()) ? "used" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="char-row">
        {secondLine.map((char) => (
          <span
            className={`char-button ${
              letterSet.has(char.toLowerCase()) ? "used" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </div>
      <div className="char-row">
        {thirdLine.map((char) => (
          <span
            className={`char-button ${
              letterSet.has(char.toLowerCase()) ? "used" : ""
            }`}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
