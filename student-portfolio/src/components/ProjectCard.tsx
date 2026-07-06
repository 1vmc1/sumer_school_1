"use client";

import { Card, Tag, Button, Typography, Space } from "antd";
import { GithubOutlined } from "@ant-design/icons";
import type { Project } from "@/data/projects";

const { Text } = Typography;

// Компонент карточки проекта — принимает объект Project
export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card
      title={project.title}
      /* Задаём фиксированную высоту карточке, чтобы они были ровными в сетке */
      style={{ height: "100%", display: "flex", flexDirection: "column" }}
      styles={{ body: { flex: 1, display: "flex", flexDirection: "column" } }}
    >
      {/* Описание проекта */}
      <Text style={{ flex: 1, marginBottom: 16 }}>{project.description}</Text>

      {/* Теги (технологии) — каждый тег — это Ant Design Tag */}
      <Space wrap style={{ marginBottom: 16 }}>
        {project.tags.map((tag) => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        ))}
      </Space>

      {/* Кнопка-ссылка на GitHub */}
      <Button
        type="primary"
        ghost
        icon={<GithubOutlined />}
        href={project.githubLink}
        target="_blank"
        block
      >
        GitHub
      </Button>
    </Card>
  );
}
