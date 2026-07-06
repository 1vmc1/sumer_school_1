"use client";

import { Typography, Row, Col } from "antd";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const { Title, Paragraph } = Typography;

export default function ProjectsPage() {
  return (
    <div>
      {/* Заголовок страницы */}
      <Title level={2}>Учебные проекты</Title>
      <Paragraph className="text-base mb-6">
        Шесть работ, которые я сделал во время учёбы. Под каждой — ссылка на GitHub.
      </Paragraph>

      {/*
        Row и Col из Ant Design — адаптивная сетка.
        На больших экранах 3 колонки, на средних 2, на мобилке 1.
      */}
      <Row gutter={[16, 16]}>
        {projects.map((project) => (
          <Col key={project.id} xs={24} sm={12} lg={8}>
            {/*
              Для каждой карточки передаём объект project через пропс.
            */}
            <ProjectCard project={project} />
          </Col>
        ))}
      </Row>
    </div>
  );
}
