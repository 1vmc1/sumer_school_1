"use client";

import { useRouter } from "next/navigation";
import { Typography, Button, Space } from "antd";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const router = useRouter();

  return (
    /* Hero-секция — приветственный блок на всю ширину */
    <div className="text-center py-16 md:py-24">
      {/* Большой заголовок */}
      <Title>Привет! Я учусь делать сайты</Title>

      {/* Описание */}
      <Paragraph className="text-lg max-w-xl mx-auto mb-8">
        Здесь я собираю свои учебные проекты. Каждый из них — шаг от задачи
        к рабочему коду. Посмотрите, что уже получается, и напишите, если
        захотите обсудить.
      </Paragraph>

      {/* Кнопки для перехода к разделам */}
      <Space size="middle" wrap>
        <Button type="primary" size="large" onClick={() => router.push("/projects")}>
          Мои проекты
        </Button>
        <Button size="large" onClick={() => router.push("/contacts")}>
          Связаться
        </Button>
      </Space>
    </div>
  );
}
