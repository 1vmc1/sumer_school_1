export interface Resource {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
}

export const resources: Resource[] = [
  {
    id: 1,
    title: "Machine Learning Specialization",
    description:
      "Курс Эндрю Нга на Coursera. Лучший старт для новичков: теория, практика в Python, понятные объяснения.",
    url: "https://www.coursera.org/specializations/machine-learning-introduction",
    tags: ["Курс", "Python", "Scikit-learn"],
  },
  {
    id: 2,
    title: "Fast.ai Practical Deep Learning",
    description:
      "Бесплатный курс, который сразу учит работать с нейросетями. Подход сверху вниз: сначала результат, потом теория.",
    url: "https://course.fast.ai/",
    tags: ["Курс", "PyTorch", "Deep Learning"],
  },
  {
    id: 3,
    title: "Kaggle",
    description:
      "Платформа для соревнований по ML. Есть готовые датасеты, туториалы и community. Обязательна для практики.",
    url: "https://www.kaggle.com/",
    tags: ["Соревнования", "Датасеты", "Сообщество"],
  },
  {
    id: 4,
    title: "PyTorch Documentation",
    description:
      "Официальная документация PyTorch. Туториалы, примеры, API reference. Всё для работы с нейросетями.",
    url: "https://pytorch.org/docs/stable/",
    tags: ["Документация", "PyTorch", "Deep Learning"],
  },
  {
    id: 5,
    title: "Scikit-learn Documentation",
    description:
      "Документация главной библиотеки для классического ML. Деревья решений, регрессии, кластеризация — всё с примерами.",
    url: "https://scikit-learn.org/stable/",
    tags: ["Документация", "Scikit-learn", "Python"],
  },
  {
    id: 6,
    title: "3Blue1Brown — Neural Networks",
    description:
      "Лучшее визуальное объяснение нейросетей на YouTube. Анимации, которые делают математику понятной.",
    url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi",
    tags: ["YouTube", "Теория", "Deep Learning"],
  },
  {
    id: 7,
    title: "Papers With Code",
    description:
      "База научных статей по ML + код к ним. Удобно следить за последними достижениями и бенчмарками.",
    url: "https://paperswithcode.com/",
    tags: ["Статьи", "Бенчмарки", "Сообщество"],
  },
  {
    id: 8,
    title: "MLOps Course",
    description:
      "Курс про то, как разворачивать ML-модели в продакшен. Docker, CI/CD, мониторинг, A/B тесты.",
    url: "https://mlops-course.github.io/",
    tags: ["Курс", "MLOps", "Docker"],
  },
  {
    id: 9,
    title: "Hugging Face",
    description:
      "Библиотека с готовыми NLP-моделями. Можно использовать трансформеры в пару строк кода.",
    url: "https://huggingface.co/",
    tags: ["NLP", "Трансформеры", "Python"],
  },
];
