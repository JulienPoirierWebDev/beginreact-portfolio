import { Button } from '../atom/Button';
import { SectionWrapper } from '../atom/SectionWrapper';
import { MemoryBoard } from './MemoryBoard';
import { MemoryContextProvider } from './MemoryProvider';
import {useContext} from "react";
import {MemoryContext, useMemory} from "../../context/MemoryProvider";
import {Typography} from "../atom/Typography";

export const MemorySection = () => {
  const {resetGame, tryCount} = useMemory();


  return (
    <SectionWrapper title="You're boring ? Let's play a game !">
      <MemoryContextProvider>
        <div className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-2">
            <ScoreText/>
            <MemoryBoard />
            <Button onClick={resetGame}>Reset go here</Button>
          </div>
        </div>
      </MemoryContextProvider>
    </SectionWrapper>
  );
};

const ScoreText = () => {
  const {tryCount, isWin} = useMemory()
  let scoreSentence = isWin
      ? `You win ${tryCount} times`
      :tryCount > 1 ?`You try ${tryCount} times`:`You try ${tryCount} time`;

  return(
      <Typography>
        {scoreSentence}
      </Typography>
  )
}
