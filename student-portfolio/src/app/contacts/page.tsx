"use client";

import { Typography, Button, Space } from "antd";
import {
  GithubOutlined,
  MailOutlined,
  SendOutlined,
} from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function ContactsPage() {
  return (
    <div className="max-w-xl mx-auto text-center">
      {/* Заголовок */}
      <Title level={2}>Контакты</Title>

      <Paragraph className="text-base mb-8">
        Нашли баг? Есть идея для совместного проекта? Или просто хотите
        сказать «привет»? Напишите — я открыт к общению.
      </Paragraph>

      {/* Кнопки для связи — каждая ведёт на внешний ресурс */}
      <Space direction="vertical" size="middle" style={{ width: "100%", maxWidth: 320 }}>
        <Button
          type="primary"
          size="large"
          icon={<SendOutlined />}
          href="https://t.me/xccord"
          target="_blank"
          block
        >
          Telegram
        </Button>

        <Button
          size="large"
          icon={<GithubOutlined />}
          href="https://github.com/1vmc1"
          target="_blank"
          block
        >
          GitHub
        </Button>

        <Button
          size="large"
          icon={<MailOutlined />}
          href="mailto:student@example.com"
          block
        >
          student@example.com
        </Button>
      </Space>
    </div>
  );
}
