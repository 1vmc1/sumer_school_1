// Тип одного ресурса
export interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
}

// Коллекция полезных ссылок для учёбы
export const resources: Resource[] = [
  {
    id: 1,
    title: "MDN Web Docs",
    description:
      "Самая полная документация по HTML, CSS, JavaScript и веб-API. Справочник, без которого не обходится ни один разработчик.",
    url: "https://developer.mozilla.org/ru/",
    tags: ["Документация", "HTML", "CSS", "JavaScript"],
  },
  {
    id: 2,
    title: "React Documentation",
    description:
      "Официальная документация React. Всё с нуля: компоненты, хуки, состояния. Есть интерактивные примеры.",
    url: "https://react.dev/",
    tags: ["Документация", "React", "JavaScript"],
  },
  {
    id: 3,
    title: "freeCodeCamp",
    description:
      "Бесплатная платформа с интерактивными курсами. Можно учиться прямо в браузере и получить сертификат.",
    url: "https://www.freecodecamp.org/",
    tags: ["Обучение", "Курсы", "JavaScript"],
  },
  {
    id: 4,
    title: "CSS-Tricks",
    description:
      "Блог с примерами, шпаргалками и целыми гайдами по CSS. Особенно полезен раздел про Flexbox и Grid.",
    url: "https://css-tricks.com/",
    tags: ["CSS", "Гайды", "Вёрстка"],
  },
  {
    id: 5,
    title: "GitHub",
    description:
      "Хостинг для кода. Здесь хранятся проекты, открытые репозитории, а ещё можно найти код для вдохновения.",
    url: "https://github.com/",
    tags: ["Инструменты", "Git", "Open Source"],
  },
  {
    id: 6,
    title: "Stack Overflow",
    description:
      "Крупнейшее сообщество разработчиков. Здесь задают вопросы и находят ответы на почти любую ошибку.",
    url: "https://stackoverflow.com/",
    tags: ["Сообщество", "Помощь", "Q&A"],
  },
  {
    id: 7,
    title: "TypeScript Handbook",
    description:
      "Официальное руководство по TypeScript. Базовые типы, дженерики, advanced-темы — всё с примерами.",
    url: "https://www.typescriptlang.org/docs/",
    tags: ["Документация", "TypeScript"],
  },
  {
    id: 8,
    title: "Node.js Документация",
    description:
      "Документация по Node.js — среде, в которой работает JavaScript на сервере. Пригодится, когда перейдёте к бэкенду.",
    url: "https://nodejs.org/docs/latest/api/",
    tags: ["Документация", "Node.js", "Backend"],
  },
  {
    id: 9,
    title: "Канал «Веб-стандарты»",
    description:
      "YouTube-канал про современный фронтенд. Новинки браузеров, обзоры технологий, доклады с конференций.",
    url: "https://www.youtube.com/@webstandards_ru",
    tags: ["YouTube", "Новости", "Сообщество"],
  },
];
