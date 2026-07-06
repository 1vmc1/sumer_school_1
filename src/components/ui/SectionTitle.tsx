"use client";

import { Typography, Space } from "antd";

const { Title, Text } = Typography;

/**
 * SectionTitle — заголовок секции с опциональным описанием под ним.
 *
 * Props:
 * - title       — текст заголовка
 * - description — поясняющий текст под заголовком (необязательно)
 * - level       — уровень заголовка от 1 до 5 (по умолчанию 3)
 */
interface SectionTitleProps {
  title: string;
  description?: string;
  level?: 1 | 2 | 3 | 4 | 5;
}

export default function SectionTitle({ title, description, level = 3 }: SectionTitleProps) {
  return (
    <Space direction="vertical" size={4} style={{ marginBottom: 16 }}>
      <Title level={level} style={{ margin: 0 }}>
        {title}
      </Title>
      {description && (
        <Text type="secondary" style={{ fontSize: 16 }}>
          {description}
        </Text>
      )}
    </Space>
  );
}
