import { Typography } from "../atom/Typography";
import {useContext, useEffect} from "react";
import {MemoryContext, useMemory} from "../../context/MemoryProvider";
import {MemoryCard} from "./MemoryCard";
import {CARD_STATE} from "../../lib/memory";

export const MemoryBoard = () => {
  // Memory Game - Exercise

  const {cards, handleClick} = useMemory();

  if (!cards) {
    return (
      <Typography variant="body2">
        An error occurs, there is no board.
      </Typography>
    );
  }

  return (
    <div className="grid grid-cols-6 grid-rows-6 w-max gap-2">
      {cards.map((card) => {
        return(<MemoryCard key={card.id} card={card} onClick={() => {handleClick(card)}}>
          {card.emoji}
        </MemoryCard>)
      })}
    </div>
  );
};
