import CardGrid from "../components/CardGrid";
import type { CardDescriptor } from "../types";

type Props = {
  cards: CardDescriptor[];
  onSelect: (id: CardDescriptor["id"]) => void;
};

export default function Home({ cards, onSelect }: Props) {
  return (
    <div className="min-h-screen p-6 2xl:p-10">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto">
        <div className="text-center mb-10 pt-6">
          <h1 className="text-4xl md:text-5xl 2xl:text-6xl font-bold text-white">
            🎯 Вікторина — Оберіть раунд
          </h1>
          <p className="text-white/80 mt-2 2xl:text-2xl">
            Список карт формується з наданих компонентів
          </p>
        </div>
        <CardGrid cards={cards} onSelect={onSelect} />
      </div>
    </div>
  );
}
