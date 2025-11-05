import { FC } from "react";
import { Header } from "../components/Header";
import Quiz from "../Quiz";
import { QuizParams } from "../types";

const RoundOne: FC<QuizParams> = ({ state, setState, updateState }) => {
  return (
    <>
      <Header state={state} setState={setState} updateState={updateState} />
      <Quiz state={state} setState={setState} updateState={updateState} />
    </>
  );
};
export default RoundOne;
