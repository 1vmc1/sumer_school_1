"use client";

import { Typography, Row, Col } from "antd";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

const { Title, Paragraph } = Typography;

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Заголовок страницы */}
      <Title level={2}>Примеры ML-проектов</Title>
      <Paragraph className="text-base mb-6" style={{ color: "var(--ink-soft)", maxWidth: 640 }}>
        Так выглядят задачи, с которых начинают: от классификации картинок до
        рекомендательных систем. Каждый проект — с кодом на GitHub, чтобы можно
        было разобрать и повторить.
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
