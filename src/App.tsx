import { useEffect, useState } from "react";
import Home from "./pages/Home";
import RoundOne from "./pages/RoundOne";
import RoundTwo from "./pages/RoundTwo";
import type { AppRoute, CardDescriptor, QuizState } from "./types";

function App() {
  const loadState = (): QuizState => {
    const saved = localStorage.getItem("quizState");
    if (saved) {
      try {
        return JSON.parse(saved) as QuizState;
      } catch {
        // ignore malformed
      }
    }
    return {
      gameStarted: false,
      team1Name: "",
      team2Name: "",
      usedCategories: [],
      usedSongs: [],
      currentQuestion: null,
      selectedAnswer: null,
      showResult: false,
      team1Score: 0,
      team2Score: 0,
      currentTeam: 1,
    };
  };

  const [state, setState] = useState<QuizState>(loadState);

  useEffect(() => {
    localStorage.setItem("quizState", JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<QuizState>): void => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const getRouteFromHash = (): AppRoute => {
    const raw = window.location.hash.replace(/^#\/?/, "");
    if (raw === "round1" || raw === "round2" || raw === "home") return raw;
    return "home";
  };

  const [route, setRoute] = useState<AppRoute>(getRouteFromHash);

  useEffect(() => {
    const onHashChange = () => setRoute(getRouteFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const cards: CardDescriptor[] = [
    {
      id: "round1",
      title: "Раунд 1",
      description: "",
      accent: "purple",
    },
    {
      id: "round2",
      title: "Раунд 2",
      description: "",
      accent: "blue",
    },
  ];

  const navigate = (r: AppRoute) => {
    if (r === "home") window.location.hash = "/";
    else window.location.hash = `/${r}`;
  };

  if (route === "home") return <Home cards={cards} onSelect={navigate} />;
  if (route === "round1") {
    return (
      <RoundOne state={state} setState={setState} updateState={updateState} />
    );
  }
  if (route === "round2") {
    return (
      <RoundTwo state={state} setState={setState} updateState={updateState} />
    );
  }
  return <Home cards={cards} onSelect={navigate} />;
}

export default App;
