import { type CardDescriptor } from "../types";

type Props = {
  card: CardDescriptor;
  onClick: (id: CardDescriptor["id"]) => void;
};

const accentToGradient: Record<
  NonNullable<CardDescriptor["accent"]>,
  string
> = {
  blue: "from-blue-500 to-indigo-600",
  red: "from-rose-500 to-red-600",
  purple: "from-purple-600 to-pink-600",
  pink: "from-pink-500 to-fuchsia-600",
};

export default function Card({ card, onClick }: Props): JSX.Element {
  const gradient = card.accent
    ? accentToGradient[card.accent]
    : accentToGradient.purple;
  return (
    <button
      onClick={() => onClick(card.id)}
      className={`relative p-6 rounded-xl text-left text-white font-semibold transition-all duration-300 h-28 bg-gradient-to-br ${gradient} hover:scale-105 hover:shadow-2xl`}
    >
      <div className="text-2xl mb-1">{card.title}</div>
      {card.description && (
        <div className="text-white/90 text-sm font-normal">
          {card.description}
        </div>
      )}
    </button>
  );
}
