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
    title: "Классификация изображений",
    description:
      "Свёрточная нейросеть (CNN) на PyTorch. Классифицирует картинки из датасета CIFAR-10: самолёты, машины, птицы и т. д.",
    tags: ["PyTorch", "CNN", "Python"],
    githubLink: "https://github.com/student/image-classifier",
  },
  {
    id: 2,
    title: "Прогнозирование цен",
    description:
      "Линейная регрессия на Scikit-learn. Предсказывает цены на жильё по параметрам: площадь, комнаты, расположение.",
    tags: ["Scikit-learn", "Pandas", "Python"],
    githubLink: "https://github.com/student/price-prediction",
  },
  {
    id: 3,
    title: "Чат-бот на NLP",
    description:
      "Простой чат-бот на базе TensorFlow и NLP. Понимает несколько команд и отвечает на вопросы по расписанию.",
    tags: ["TensorFlow", "NLP", "Python"],
    githubLink: "https://github.com/student/nlp-chatbot",
  },
  {
    id: 4,
    title: "Рекомендательная система",
    description:
      "Коллаборативная фильтрация на Surprise Library. Рекомендует фильмы на основе оценок пользователей (MovieLens).",
    tags: ["Python", "Collaborative Filtering", "Pandas"],
    githubLink: "https://github.com/student/recommender",
  },
  {
    id: 5,
    title: "Детекция объектов",
    description:
      "YOLOv5 для детекции объектов на фото и видео. Определяет людей, машины, животных в реальном времени.",
    tags: ["YOLO", "PyTorch", "Python"],
    githubLink: "https://github.com/student/object-detection",
  },
  {
    id: 6,
    title: "Анализ тональности",
    description:
      "Классификатор отзывов на положительные и отрицательные. Bag-of-words + Logistic Regression на Scikit-learn.",
    tags: ["Scikit-learn", "NLP", "Python"],
    githubLink: "https://github.com/student/sentiment-analysis",
  },
];
