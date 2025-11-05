import { Play, RotateCcw, X } from "lucide-react";
import { FC } from "react";
import { quizData } from "./data/round1";
import { QuizParams, QuizState } from "./types";

const Quiz: FC<QuizParams> = ({ state, setState, updateState }) => {
  const handleStartGame = (): void => {
    if (state.team1Name.trim() && state.team2Name.trim()) {
      updateState({ gameStarted: true });
    }
  };

  const handleCategoryClick = (index: number): void => {
    if (state.usedCategories.includes(index)) return;

    updateState({
      currentQuestion: index,
      selectedAnswer: null,
      showResult: false,
    });
  };

  const handleAnswerClick = (answerIndex: number): void => {
    if (state.showResult || state.currentQuestion === null) return;

    const isCorrect = answerIndex === quizData[state.currentQuestion].correct;
    const updates: Partial<QuizState> = {
      selectedAnswer: answerIndex,
      showResult: true,
    };

    if (isCorrect) {
      if (state.currentTeam === 1) {
        updates.team1Score = state.team1Score + 2;
      } else {
        updates.team2Score = state.team2Score + 2;
      }
    }

    updateState(updates);
  };

  const handleBackToCategories = (): void => {
    if (state.currentQuestion === null) return;
    updateState({
      usedCategories: [...state.usedCategories, state.currentQuestion],
      currentQuestion: null,
      selectedAnswer: null,
      showResult: false,
      currentTeam: state.currentTeam === 1 ? 2 : 1,
    });
  };

  const handleContinueGame = (): void => {
    window.history.back();
  };

  const availableCategories = quizData.length - state.usedCategories.length;

  if (!state.gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/95 rounded-2xl p-8 max-w-md w-full backdrop-blur-sm">
          <h1 className="text-4xl font-bold text-center text-purple-900 mb-8">
            🎯 Вікторина
          </h1>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Назва команди 1:
              </label>
              <input
                type="text"
                value={state.team1Name}
                onChange={(e) => updateState({ team1Name: e.target.value })}
                placeholder="Введіть назву..."
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-300 focus:border-blue-500 focus:outline-none text-gray-800"
                maxLength={20}
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Назва команди 2:
              </label>
              <input
                type="text"
                value={state.team2Name}
                onChange={(e) => updateState({ team2Name: e.target.value })}
                placeholder="Введіть назву..."
                className="w-full px-4 py-3 rounded-xl border-2 border-red-300 focus:border-red-500 focus:outline-none text-gray-800"
                maxLength={20}
              />
            </div>

            <button
              onClick={handleStartGame}
              disabled={!state.team1Name.trim() || !state.team2Name.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 inline-flex items-center justify-center gap-2"
            >
              <Play size={24} />
              Почати гру
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh p-4">
      <div className="max-w-screen-3xl mx-auto">
        {state.currentQuestion === null ? (
          <>
            <div className="grid grid-cols-4 gap-8 place-items-center">
              {quizData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(index)}
                  disabled={state.usedCategories.includes(index)}
                  className={`
                    relative p-6 rounded-xl font-semibold  transition-all duration-300 h-40 2xl:h-60 w-80 2xl:w-100
                    ${
                      state.usedCategories.includes(index)
                        ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                        : "bg-[#05386B] text-white hover:scale-105 hover:shadow-2xl cursor-pointer"
                    }
                  `}
                >
                  {state.usedCategories.includes(index) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <X
                        size={160}
                        className="text-gray-400 opacity-50"
                        strokeWidth={3}
                      />
                    </div>
                  )}
                  <span
                    className={
                      state.usedCategories.includes(index)
                        ? "line-through opacity-30 text-2xl"
                        : "text-3xl 2xl:text-4xl"
                    }
                  >
                    {item.category}
                  </span>
                </button>
              ))}
            </div>

            {availableCategories === 0 && (
              <div className="text-center">
                <div className="bg-white/90 rounded-2xl p-8 inline-block backdrop-blur-sm">
                  <h2 className="text-3xl font-bold text-purple-900 mb-4">
                    🎉 Раунд 1 завершений!
                  </h2>
                  <div className="text-2xl text-gray-700 mb-6 space-y-2">
                    <p>
                      {state.team1Name}: {state.team1Score} балів
                    </p>
                    <p>
                      {state.team2Name}: {state.team2Score} балів
                    </p>
                  </div>
                  <button
                    onClick={handleContinueGame}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
                  >
                    <RotateCcw size={20} />
                    Грати далі
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/95 rounded-2xl p-8 backdrop-blur-sm mx-auto 2xl:w-7xl h-4xl">
            <div className="mb-6 2xl:mb-15">
              <span className="text-lg 2xl:text-3xl inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {quizData[state.currentQuestion].category}
              </span>
              <h2 className="text-2xl 2xl:text-5xl font-bold text-gray-800">
                {quizData[state.currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-5">
              {quizData[state.currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={state.showResult}
                  className={`
                    w-full p-4 rounded-xl text-left font-medium transition-all duration-300
                    ${
                      state.showResult
                        ? index === quizData[state.currentQuestion].correct
                          ? "bg-green-500 text-white"
                          : index === state.selectedAnswer
                            ? "bg-red-500 text-white"
                            : "bg-gray-200 text-gray-600"
                        : "hover:bg-purple-100 text-gray-800 hover:scale-102 cursor-pointer !bg-inherit"
                    }
                  `}
                >
                  <span className="font-bold mr-3 text-xl 2xl:text-4xl">
                    {String.fromCharCode(97 + index)})
                  </span>
                  <span className="text-xl 2xl:text-4xl font-normal">
                    {answer}
                  </span>
                </button>
              ))}
            </div>

            {state.showResult && (
              <div className="mt-12 space-y-4">
                <div className="text-center">
                  <p
                    className={`mb-12 text-3xl 2xl:text-6xl font-bold ${state.selectedAnswer === quizData[state.currentQuestion].correct ? "text-green-600" : "text-red-600"}`}
                  >
                    {state.selectedAnswer ===
                    quizData[state.currentQuestion].correct
                      ? "✅ Правильно!"
                      : "❌ Неправильно!"}
                  </p>
                </div>
                <button
                  onClick={handleBackToCategories}
                  className="!text-3xl 2xl:!text-4xl w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-102 transition-transform"
                >
                  Повернутися до категорій
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
