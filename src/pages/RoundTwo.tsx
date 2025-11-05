import { FC } from "react";
import { Header } from "../components/Header";
import RoundTwoQuiz from "../components/RoundTwoQuiz";
import { QuizParams } from "../types";

const RoundTwo: FC<QuizParams> = ({ state, setState, updateState }) => {
  return (
    <>
      <Header state={state} setState={setState} updateState={updateState} />
      <RoundTwoQuiz
        state={state}
        setState={setState}
        updateState={updateState}
      />
    </>
  );
};

export default RoundTwo;
