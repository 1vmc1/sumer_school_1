"use client";

import { Card, Tag, Button, Typography, Space } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import type { Resource } from "@/data/resources";

const { Text } = Typography;

// Карточка ресурса — принимает объект Resource
export default function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <Card
      title={resource.title}
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      styles={{ body: { flex: 1, display: "flex", flexDirection: "column" } }}
    >
      {/* Описание */}
      <Text style={{ flex: 1, marginBottom: 16 }}>{resource.description}</Text>

      {/* Метки-теги */}
      <Space wrap style={{ marginBottom: 16 }}>
        {resource.tags.map((tag) => (
          <Tag key={tag} color="cyan">
            {tag}
          </Tag>
        ))}
      </Space>

      {/* Кнопка «Открыть» — ведёт на внешний сайт */}
      <Button
        type="primary"
        ghost
        icon={<LinkOutlined />}
        href={resource.url}
        target="_blank"
        block
      >
        Открыть
      </Button>
    </Card>
  );
}
