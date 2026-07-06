"use client";

import { Typography, Tag, Space } from "antd";

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Title level={2}>Кто такой ML-инженер</Title>

      <Paragraph>
        ML-инженер (Machine Learning Engineer) строит модели машинного обучения.
        Он берёт данные, очищает их, подбирает алгоритм, обучает модель и
        встраивает её в готовый продукт — приложение, сайт или сервис.
      </Paragraph>

      <Paragraph>
        В отличие от data scientist, ML-инженер больше пишет код и
        занимается продакшеном. В отличие от backend-разработчика — глубже
        понимает математику и алгоритмы.
      </Paragraph>

      <Title level={4}>Что делает ML-инженер</Title>
      <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
        <li>Собирает и размечает данные</li>
        <li>Проектирует признаки (feature engineering)</li>
        <li>Выбирает и обучает модели</li>
        <li>Оценивает качество модели (метрики)</li>
        <li>Разворачивает модель в продакшен (MLOps)</li>
      </ul>

      <Title level={4}>Ключевые технологии</Title>
      <Space wrap style={{ marginBottom: 24 }}>
        <Tag color="blue">Python</Tag>
        <Tag color="blue">NumPy / Pandas</Tag>
        <Tag color="blue">Scikit-learn</Tag>
        <Tag color="blue">PyTorch</Tag>
        <Tag color="blue">TensorFlow</Tag>
        <Tag color="blue">Jupyter</Tag>
        <Tag color="blue">Docker</Tag>
        <Tag color="blue">SQL</Tag>
      </Space>

      <Title level={4}>Начальный путь</Title>
      <Paragraph>
        Хорошо знать Python и основы математики (линейная алгебра, статистика).
        Дальше — пройти курсы (Coursera, Fast.ai), решать задачи на Kaggle,
        делать свои проекты. Английский обязателен.
      </Paragraph>
    </div>
  );
}
