import type { CardDescriptor } from "../types";
import Card from "./Card";

type Props = {
  cards: CardDescriptor[];
  onSelect: (id: CardDescriptor["id"]) => void;
};

export default function CardGrid({ cards, onSelect }: Props): JSX.Element {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((c) => (
        <Card key={c.id} card={c} onClick={onSelect} />
      ))}
    </div>
  );
}
