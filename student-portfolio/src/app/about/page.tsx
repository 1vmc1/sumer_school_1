"use client";

import { Typography, Tag, Space, Button } from "antd";
import { GithubOutlined } from "@ant-design/icons";

const { Title, Paragraph } = Typography;

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <Title level={2}>О проекте</Title>

      <Paragraph>
        Это мой первый сайт, который я сделал сам. От идеи до работающей страницы.
      </Paragraph>
      <Paragraph>
        Раньше я верстал отдельные блоки в песочницах. Здесь всё по-настоящему:
        несколько страниц, навигация, адаптивная вёрстка.
      </Paragraph>

      <Title level={4}>Почему такие инструменты</Title>
      <ul style={{ marginBottom: 16, paddingLeft: 20 }}>
        <li>
          <strong>Next.js</strong> — чтобы страницы открывались быстро и их было
          удобно разрабатывать.
        </li>
        <li>
          <strong>Ant Design</strong> — готовые кнопки, карточки, меню. Не нужно
          рисовать каждую мелочь с нуля.
        </li>
        <li>
          <strong>Tailwind CSS</strong> — управлять отступами и размерами прямо
          в разметке. Быстро и наглядно.
        </li>
      </ul>

      <Paragraph>
        Сайт открыт в коде на GitHub — можно заглянуть под капот.
      </Paragraph>

      <Button
        type="primary"
        ghost
        icon={<GithubOutlined />}
        href="https://github.com/1vmc1/portfolio"
        target="_blank"
      >
        Исходный код на GitHub
      </Button>

      <div className="mt-8">
        <Title level={4}>Стек технологий</Title>
        <Space wrap>
          <Tag color="blue">Next.js 14</Tag>
          <Tag color="blue">TypeScript</Tag>
          <Tag color="blue">Ant Design</Tag>
          <Tag color="blue">Tailwind CSS</Tag>
        </Space>
      </div>
    </div>
  );
}
