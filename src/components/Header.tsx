import { RotateCcw, StepBack } from "lucide-react";
import { FC } from "react";
import { QuizParams } from "../types";

export const Header: FC<QuizParams> = ({ state, setState, updateState }) => {
  const goBack = () => {
    window.history.back();
  };
  const handleNewGame = (): void => {
    if (window.confirm("Ви впевнені? Весь прогрес буде втрачено.")) {
      localStorage.removeItem("quizState");
      setState({
        gameStarted: false,
        team1Name: "",
        team2Name: "",
        usedCategories: [],
        currentQuestion: null,
        selectedAnswer: null,
        showResult: false,
        team1Score: 0,
        team2Score: 0,
        currentTeam: 1,
        usedSongs: [],
      });
    }
  };
  return (
    <div className="text-center mb-4 pt-6 bg-inherit">
      <div className="flex justify-between items-start ml-4 mr-4">
        <button
          onClick={goBack}
          className="text-white px-4 py-2 rounded-lg font-semibold inline-flex items-center gap-2 hover:scale-[1.02] transition-transform"
        >
          <StepBack size={18} /> Назад
        </button>
        <button
          onClick={handleNewGame}
          className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Нова гра
        </button>
      </div>

      <div className="flex justify-center gap-8 text-white text-lg 2xl:text-4xl flex-wrap items-center">
        <div
          className={`w-auto px-6 py-2 rounded-full backdrop-blur-sm ${state.currentTeam === 1 ? "bg-blue-500/80 ring-4 ring-white" : "bg-white/20"}`}
        >
          <span className="font-bold">{state.team1Name}:</span>{" "}
          {state.team1Score}
        </div>
        <div
          className={`w-auto px-6 py-2 rounded-full backdrop-blur-sm ${state.currentTeam === 2 ? "bg-red-500/80 ring-4 ring-white" : "bg-white/20"}`}
        >
          <span className="font-bold">{state.team2Name}:</span>{" "}
          {state.team2Score}
        </div>

        {state.currentQuestion === null && (
          <div className="text-center w-auto">
            <div
              className={`inline-block px-8 py-3 rounded-full font-bold ${state.currentTeam === 1 ? "bg-blue-500" : "bg-red-500"}`}
            >
              Ходить:{" "}
              {state.currentTeam === 1 ? state.team1Name : state.team2Name}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
