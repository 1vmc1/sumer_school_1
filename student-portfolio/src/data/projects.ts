export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  githubLink: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Todo List App",
    description:
      "Приложение для списка задач. Можно добавить дело, отметить готовое или удалить. Основа — React.",
    tags: ["React", "CSS", "JavaScript"],
    githubLink: "https://github.com/1vmc1/todo-app",
  },
  {
    id: 2,
    title: "Калькулятор",
    description:
      "Калькулятор на HTML, CSS и JS. Считает: +, −, ×, ÷.",
    tags: ["HTML", "CSS", "JavaScript"],
    githubLink: "https://github.com/1vmc1/calculator",
  },
  {
    id: 3,
    title: "Виджет погоды",
    description:
      "Показывает погоду через открытое API. Первый опыт работы с асинхронными запросами.",
    tags: ["API", "JavaScript", "CSS"],
    githubLink: "https://github.com/1vmc1/weather-widget",
  },
  {
    id: 4,
    title: "Личное портфолио",
    description:
      "Предыдущая версия этого портфолио — одна страница со списком проектов и контактами.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    githubLink: "https://github.com/1vmc1/portfolio",
  },
  {
    id: 5,
    title: "Макет блога",
    description:
      "Страница блога с сеткой статей, навигацией и адаптивным дизайном. Чистая вёрстка.",
    tags: ["HTML", "CSS", "Flexbox", "Grid"],
    githubLink: "https://github.com/1vmc1/blog-layout",
  },
  {
    id: 6,
    title: "Telegram-бот",
    description:
      "Telegram-бот на Python. Отвечает на команды и присылает случайные факты.",
    tags: ["Python", "API"],
    githubLink: "https://github.com/1vmc1/tg-bot",
  },
];
