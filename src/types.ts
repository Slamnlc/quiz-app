export type AppRoute = "home" | "round1" | "round2";

export type CardDescriptor = {
  id: AppRoute;
  title: string;
  description?: string;
  accent?: "blue" | "red" | "purple" | "pink";
};

export type QuizState = {
  gameStarted: boolean;
  team1Name: string;
  team2Name: string;
  usedCategories: number[];
  usedSongs: number[];
  currentQuestion: number | null;
  selectedAnswer: number | null;
  showResult: boolean;
  team1Score: number;
  team2Score: number;
  currentTeam: 1 | 2;
};

export interface QuizParams {
  state: QuizState;
  setState: React.Dispatch<React.SetStateAction<QuizState>>;
  updateState: (updates: Partial<QuizState>) => void;
}
