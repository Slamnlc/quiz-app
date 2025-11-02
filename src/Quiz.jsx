import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Play } from 'lucide-react';

const Quiz = () => {
  const quizData = [
    {
      category: "Вчились на помідорах",
      question: "Від якої дії приматів еволюціонував поцілунок, згідно з новою гіпотезою британських вчених?",
      answers: [
        "годування дитинчат пережованою їжею",
        "облизування ран на тілі партнера",
        "висмоктування паразитів з шерсті партнера"
      ],
      correct: 1
    },
    {
      category: "Давньогрецька полунична",
      question: "Як у стародавній Греції називали оральний секс?",
      answers: [
        "дресувати змію",
        "грати на флейті",
        "пити з глечика"
      ],
      correct: 1
    },
    {
      category: "Фрілансер",
      question: "Як заробляв свої перші гроші юний Т.Г. Шевченко?",
      answers: [
        "працюючи офіціантом у таверні",
        "відспівуючи небіжчиків",
        "допомагаючи щуроловам"
      ],
      correct: 1
    },
    {
      category: "Щастя - здоров'я!",
      question: "В китайській провінції Цзянсу є традиція: щоб подружнє життя було щасливим, наречений має...",
      answers: [
        "зробити мейкап нареченій",
        "спробувати пристрелити наречену",
        "звабити подружку нареченої"
      ],
      correct: 1
    },
    {
      category: "Не пирскай!",
      question: "Огірок-пирскач - це...",
      answers: [
        "морський житель, який має отруєну слину",
        "птаха, що виділяє неприємний запах при загрозі",
        "рослина, яка може «еякулювати»"
      ],
      correct: 2
    },
    {
      category: "Дайте шуму!",
      question: "Звуки якої тварини можна відтворити за допомогою пластикового стаканчика, бавовняної нитки, цвяха та мокрого паперового рушника?",
      answers: [
        "кудкудакання курки",
        "мукання корови",
        "нявкання кота"
      ],
      correct: 0
    },
    {
      category: "Наші руки не для скуки",
      question: "Що відбувається у світі 9 мільйонів разів кожні 60 секунд?",
      answers: [
        "запит у Гуглі",
        "чоловічий оргазм",
        "розбивається куряче яйце"
      ],
      correct: 0
    },
    {
      category: "Постіль здаємо!",
      question: "Згідно з правилами перевезення «Укрзалізниці» індик у поїзді повинен...",
      answers: [
        "мовчати",
        "мати перевізні документи",
        "їхати в купе тільки за умови 4 викуплених місць"
      ],
      correct: 1
    },
    {
      category: "SMM 19 століття",
      question: "Цей термін набув популярності з розквітом автопромисловості наприкінці 19 ст. Тоді ж директори цирків почали писати на афішах...",
      answers: [
        "людина-магніт",
        "людина-тягач",
        "людина-каучук"
      ],
      correct: 2
    },
    {
      category: "Помаранчевий - хіт сезону",
      question: "Як дізнатися скільки дольок має апельсин?",
      answers: [
        "порахувати білі цятки під «хвостиком»",
        "визначити за кількістю «зморшок на дупці»",
        "апельсини завжди мають 12 дольок"
      ],
      correct: 0
    },
    {
      category: "Та сама Джозефіна",
      question: "Коли українська порноакторка Джозефіна Джексон поскаржилась на бруківку у Чернівцях, місцева мерія запропонувала їй...",
      answers: [
        "пересісти на коня",
        "вакансію спеціаліста з ремонту",
        "стати обличчям підприємства «Чернівецький облавтодор»"
      ],
      correct: 1
    },
    {
      category: "Скарги і пропозиції",
      question: "З якою скаргою звернулася Барбара Страйсенд до компанії Apple?",
      answers: [
        "щоб з Apple Music вилучили пісню Duck Sauce «Барбара Страйсенд»",
        "щоб Siri навчилась правильно вимовляти її прізвище",
        "щоб фронтальна камера iPhone не псувала її зовнішність"
      ],
      correct: 1
    }
  ];

  // Load state from localStorage or use defaults
  const loadState = () => {
    const saved = localStorage.getItem('quizState');
    if (saved) {
      return JSON.parse(saved);
    }
    return {
      gameStarted: false,
      team1Name: '',
      team2Name: '',
      usedCategories: [],
      currentQuestion: null,
      selectedAnswer: null,
      showResult: false,
      team1Score: 0,
      team2Score: 0,
      currentTeam: 1
    };
  };

  const [state, setState] = useState(loadState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('quizState', JSON.stringify(state));
  }, [state]);

  const updateState = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const handleStartGame = () => {
    if (state.team1Name.trim() && state.team2Name.trim()) {
      updateState({ gameStarted: true });
    }
  };

  const handleCategoryClick = (index) => {
    if (state.usedCategories.includes(index)) return;
    
    updateState({
      currentQuestion: index,
      selectedAnswer: null,
      showResult: false
    });
  };

  const handleAnswerClick = (answerIndex) => {
    if (state.showResult) return;
    
    const isCorrect = answerIndex === quizData[state.currentQuestion].correct;
    const updates = {
      selectedAnswer: answerIndex,
      showResult: true
    };

    if (isCorrect) {
      if (state.currentTeam === 1) {
        updates.team1Score = state.team1Score + 1;
      } else {
        updates.team2Score = state.team2Score + 1;
      }
    }

    updateState(updates);
  };

  const handleBackToCategories = () => {
    updateState({
      usedCategories: [...state.usedCategories, state.currentQuestion],
      currentQuestion: null,
      selectedAnswer: null,
      showResult: false,
      currentTeam: state.currentTeam === 1 ? 2 : 1
    });
  };

  const handleNewGame = () => {
    if (window.confirm('Ви впевнені? Весь прогрес буде втрачено.')) {
      localStorage.removeItem('quizState');
      setState({
        gameStarted: false,
        team1Name: '',
        team2Name: '',
        usedCategories: [],
        currentQuestion: null,
        selectedAnswer: null,
        showResult: false,
        team1Score: 0,
        team2Score: 0,
        currentTeam: 1
      });
    }
  };

  const handleContinueGame = () => {
    updateState({
      usedCategories: [],
      currentQuestion: null,
      selectedAnswer: null,
      showResult: false,
      team1Score: 0,
      team2Score: 0,
      currentTeam: 1
    });
  };

  const availableCategories = quizData.length - state.usedCategories.length;

  // Team Setup Screen
  if (!state.gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 pt-6">
          <div className="flex justify-between items-start mb-4">
            <button
              onClick={handleNewGame}
              className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Нова гра
            </button>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              🎯 Вікторина
            </h1>
            <div className="w-24"></div>
          </div>
          
          <div className="flex justify-center gap-8 text-white text-lg flex-wrap">
            <div className={`px-6 py-2 rounded-full backdrop-blur-sm ${state.currentTeam === 1 ? 'bg-blue-500/80 ring-4 ring-white' : 'bg-white/20'}`}>
              <span className="font-bold">{state.team1Name}:</span> {state.team1Score}
            </div>
            <div className={`px-6 py-2 rounded-full backdrop-blur-sm ${state.currentTeam === 2 ? 'bg-red-500/80 ring-4 ring-white' : 'bg-white/20'}`}>
              <span className="font-bold">{state.team2Name}:</span> {state.team2Score}
            </div>
            <div className="bg-white/20 px-6 py-2 rounded-full backdrop-blur-sm">
              Залишилось: {availableCategories}
            </div>
          </div>
          {state.currentQuestion === null && (
            <div className="text-center mt-4">
              <div className={`inline-block px-8 py-3 rounded-full font-bold text-xl ${state.currentTeam === 1 ? 'bg-blue-500' : 'bg-red-500'}`}>
                Ходить: {state.currentTeam === 1 ? state.team1Name : state.team2Name}
              </div>
            </div>
          )}
        </div>

        {/* Categories Grid or Question */}
        {state.currentQuestion === null ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {quizData.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryClick(index)}
                  disabled={state.usedCategories.includes(index)}
                  className={`
                    relative p-6 rounded-xl font-semibold  transition-all duration-300 h-20
                    ${state.usedCategories.includes(index)
                      ? 'bg-gray-700/50 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-br from-pink-500 to-purple-600 text-white hover:scale-105 hover:shadow-2xl cursor-pointer'
                    }
                  `}
                >
                  {state.usedCategories.includes(index) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <X size={80} className="text-gray-400 opacity-50" strokeWidth={3} />
                    </div>
                  )}
                  <span className={state.usedCategories.includes(index) ? 'line-through opacity-30 text-2xl' : 'text-2xl'}>
                    {item.category}
                  </span>
                </button>
              ))}
            </div>

            {availableCategories === 0 && (
              <div className="text-center">
                <div className="bg-white/90 rounded-2xl p-8 inline-block backdrop-blur-sm">
                  <h2 className="text-3xl font-bold text-purple-900 mb-4">
                    🎉 Вікторина завершена!
                  </h2>
                  <div className="text-2xl text-gray-700 mb-6 space-y-2">
                    <p>{state.team1Name}: {state.team1Score} балів</p>
                    <p>{state.team2Name}: {state.team2Score} балів</p>
                    <p className="text-3xl font-bold mt-4 text-purple-700">
                      {state.team1Score > state.team2Score ? `🏆 Переможець: ${state.team1Name}!` : 
                       state.team2Score > state.team1Score ? `🏆 Переможець: ${state.team2Name}!` : 
                       '🤝 Нічия!'}
                    </p>
                  </div>
                  <button
                    onClick={handleContinueGame}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-full font-semibold hover:scale-105 transition-transform inline-flex items-center gap-2"
                  >
                    <RotateCcw size={20} />
                    Грати ще раз
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="bg-white/95 rounded-2xl p-8 backdrop-blur-sm max-w-3xl mx-auto">
            <div className="mb-6">
              <span className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                {quizData[state.currentQuestion].category}
              </span>
              <h2 className="text-2xl font-bold text-gray-800">
                {quizData[state.currentQuestion].question}
              </h2>
            </div>

            <div className="space-y-3">
              {quizData[state.currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={state.showResult}
                  className={`
                    w-full p-4 rounded-xl text-left font-medium transition-all duration-300
                    ${state.showResult
                      ? index === quizData[state.currentQuestion].correct
                        ? 'bg-green-500 text-white'
                        : index === state.selectedAnswer
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                      : 'hover:bg-purple-100 text-gray-800 hover:scale-102 cursor-pointer !bg-inherit'
                    }
                  `}
                >
                  <span className="font-bold mr-3">
                    {String.fromCharCode(97 + index)})
                  </span>
                  {answer}
                </button>
              ))}
            </div>

            {state.showResult && (
              <div className="mt-6 space-y-4">
                <div className="text-center">
                  <p className={`text-xl font-bold ${state.selectedAnswer === quizData[state.currentQuestion].correct ? 'text-green-600' : 'text-red-600'}`}>
                    {state.selectedAnswer === quizData[state.currentQuestion].correct ? '✅ Правильно!' : '❌ Неправильно!'}
                  </p>
                </div>
                <button
                  onClick={handleBackToCategories}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:scale-102 transition-transform"
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