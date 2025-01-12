import React, { useCallback, useEffect, useState } from "react";
import "./tiles.css";

type EmptyTileProps = {
  letter: string;
  correctLetter: string;
};
type TileState = 'correct' | 'almost' | 'idle';

export default function EmptyTile({ letter,correctLetter }: EmptyTileProps) {
  const [tileState, setTileState] = useState<TileState>('idle');

  const isCorrectLetter = useCallback(() => {
    setTileState(letter === correctLetter ? 'correct' : 'idle');
  }, [letter, correctLetter]);

  useEffect(() => {
    isCorrectLetter();
  }, [isCorrectLetter]);
  
  return (
    <div className={`empty-tile ${tileState}`} >
      <h1>{letter}</h1>
    </div>
  );
}
