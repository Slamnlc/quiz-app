import s1 from "../assets/sounds/round2/1.mp3";
import s10 from "../assets/sounds/round2/10.mp3";
import s11 from "../assets/sounds/round2/11.mp3";
import s12 from "../assets/sounds/round2/12.mp3";
import s2 from "../assets/sounds/round2/2.mp3";
import s3 from "../assets/sounds/round2/3.mp3";
import s4 from "../assets/sounds/round2/4.mp3";
import s5 from "../assets/sounds/round2/5.mp3";
import s6 from "../assets/sounds/round2/6.mp3";
import s7 from "../assets/sounds/round2/7.mp3";
import s8 from "../assets/sounds/round2/8.mp3";
import s9 from "../assets/sounds/round2/9.mp3";

export type RoundTwoItem = {
  id: number;
  puzzle: string[];
  hintLines: string[];
  answer: string;
  audioPath?: string;
};

export const roundTwoItems: RoundTwoItem[] = [
  {
    id: 1,
    puzzle: ["👊", "🚪", "👊", "❤️"],
    hintLines: ["👊🚪👊🚪👊🚪❤️👊🚪👊🚪👊🚪"],
    answer: "Верка Серючка - Тук, Тук, Тук",
    audioPath: s1,
  },
  {
    id: 2,
    puzzle: ["👮‍♂️", "🚫", "❌"],
    hintLines: ["👨🌃🗣❌👩"],
    answer: "Jerry Heil - ОХРАНА_ОТМЄНА",
    audioPath: s2,
  },
  {
    id: 3,
    puzzle: ["🔤", "❤️‍🔥", "💋"],
    hintLines: ["5️⃣0️⃣5️⃣"],
    answer: "Время и Стекло - 505",
    audioPath: s3,
  },
  {
    id: 4,
    puzzle: ["👁", "🐯", "🥊"],
    hintLines: ["A song about fight and victory"],
    answer: '"Eye Of The Tiger" (Survivor)',
    audioPath: s4,
  },
  {
    id: 5,
    puzzle: ["🔫", "👨🏿", "😇", "🌴"],
    hintLines: ["Два слова, 8 + 8 букв (англ)"],
    answer: "Coolio - Gangsta's Paradise",
    audioPath: s5,
  },
  {
    id: 6,
    puzzle: ["🌸", "💇‍♀️", "💐"],
    hintLines: ["👧💐🦱"],
    answer: "Бумбокс — Квіти в волоссі",
    audioPath: s6,
  },
  {
    id: 7,
    puzzle: ["🦸‍♂️", "💪", "❤️"],
    hintLines: ["... Till the end of the night"],
    answer: "Bonnie Tyler - Holding Out For A Hero",
    audioPath: s7,
  },
  {
    id: 8,
    puzzle: ["🐶", "🕺", "💅"],
    hintLines: [
      "Грайливий стиль, запальна музика і маленька собачка в ролі натхнення",
    ],
    answer: "Потап і Настя - Стиль собачки",
    audioPath: s8,
  },
  {
    id: 9,
    puzzle: ["🚌", "🐶", "🏠"],
    hintLines: ["Владімірський Централ! Владімірський Централ!"],
    answer: "Скрябін - Маршрутка",
    audioPath: s9,
  },
  {
    id: 10,
    puzzle: ["🪖", "💡", "🪖", "🕊"],
    hintLines: ["В 2022 році автор переспівав її українською"],
    answer: "Lyapis Trubetskoy - Воїни світла",
    audioPath: s10,
  },
  {
    id: 11,
    puzzle: ["😑"],
    hintLines: ["🃏😑"],
    answer: "Lady Gaga - Poker Face",
    audioPath: s11,
  },
  {
    id: 12,
    puzzle: ["👑", "🌙", "💃"],
    hintLines: ["Співачку цієї пісні не пускають на Євробачення"],
    answer: "Оля Полякова - Королева ночи",
    audioPath: s12,
  },
];
