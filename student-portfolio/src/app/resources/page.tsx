"use client";

import { Typography } from "antd";
import ResourceCard from "@/components/ResourceCard";
import { resources } from "@/data/resources";

const { Title, Paragraph } = Typography;

export default function ResourcesPage() {
  return (
    <div>
      {/* Заголовок страницы */}
      <Title level={2}>Полезные ресурсы</Title>
      <Paragraph className="text-base mb-6">
        Ссылки, которые помогают учиться: документация, курсы, сообщества
        и инструменты. Со временем коллекция будет расти.
      </Paragraph>

      {/*
        Сетка через Tailwind CSS:
        - 1 колонка на телефоне (по умолчанию)
        - 2 колонки на планшете (sm)
        - 3 колонки на десктопе (lg)
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}
