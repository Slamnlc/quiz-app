import { X } from "lucide-react";
import { FC, useState } from "react";
import RoundTwoDetail from "../components/RoundTwoDetail";
import { roundTwoItems, type RoundTwoItem } from "../data/round2";
import { QuizParams } from "../types";

const RoundTwoQuiz: FC<QuizParams> = ({ state, setState, updateState }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (selectedId !== null) {
    const item = roundTwoItems.find((i) => i.id === selectedId) as RoundTwoItem;
    return (
      <div className="min-h-screen p-6 2xl:p-14">
        <div className="max-w-screen-2xl mx-auto">
          <RoundTwoDetail
            item={item}
            onBack={() => setSelectedId(null)}
            state={state}
            updateState={updateState}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen p-6">
        <div className="max-w-screen-3xl mx-auto">
          <div className="grid grid-cols-4 gap-8 place-items-center">
            {roundTwoItems.map((i) => (
              <button
                key={i.id}
                disabled={state.usedSongs.includes(i.id)}
                onClick={() => setSelectedId(i.id)}
                className={`relative p-8 rounded-2xl text-white font-bold transition-all duration-300 h-40 2xl:h-60 w-80 2xl:w-100 hover:scale-[1.03] hover:shadow-2xl !text-6xl 2xl:!text-8xl
                    ${
                      state.usedSongs.includes(i.id)
                        ? "bg-gray-700/50 text-gray-500 cursor-not-allowed"
                        : "bg-[#05386B] text-white hover:scale-105 hover:shadow-2xl cursor-pointer"
                    }`}
              >
                {state.usedSongs.includes(i.id) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <X
                      size={160}
                      className="text-gray-400 opacity-50"
                      strokeWidth={3}
                    />
                  </div>
                )}
                {i.id}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RoundTwoQuiz;
