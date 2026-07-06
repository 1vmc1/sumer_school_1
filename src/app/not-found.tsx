"use client";

import { useRouter } from "next/navigation";
import { Typography, Button } from "antd";

const { Title, Paragraph } = Typography;

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="text-center py-24">
      {/* Крупная цифра 404 для наглядности */}
      <Title style={{ fontSize: "5rem", marginBottom: 0 }}>404</Title>
      <Title level={2}>Страница не найдена</Title>
      <Paragraph>
        Кажется, здесь ничего нет. Проверьте адрес или вернитесь на главную.
      </Paragraph>
      <Button type="primary" size="large" onClick={() => router.push("/")}>
        На главную
      </Button>
    </div>
  );
}
