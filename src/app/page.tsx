"use client";

import { useRouter } from "next/navigation";
import { Typography, Button, Space } from "antd";

const { Title, Paragraph } = Typography;

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="text-center py-16 md:py-24">
      <Title>ML-инженер</Title>

      <Paragraph className="text-lg max-w-xl mx-auto mb-8">
        ML-инженер учит компьютер находить закономерности в данных:
        предсказывать цены, распознавать лица, рекомендовать фильмы.
        Это одна из самых востребованных и высокооплачиваемых IT-профессий.
      </Paragraph>

      <Space size="middle" wrap>
        <Button type="primary" size="large" onClick={() => router.push("/about")}>
          О профессии
        </Button>
        <Button size="large" onClick={() => router.push("/projects")}>
          Проекты
        </Button>
      </Space>
    </div>
  );
}
