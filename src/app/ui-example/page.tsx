"use client";

// Импортируем новые UI-компоненты
import PageLayout from "@/components/ui/PageLayout";
import ContentCard from "@/components/ui/ContentCard";
import CopyButton from "@/components/ui/CopyButton";
import SectionTitle from "@/components/ui/SectionTitle";
import TagList from "@/components/ui/TagList";

// Импортируем Ant Design для дополнительных элементов
import { Typography, Space } from "antd";

const { Paragraph } = Typography;

// Пример: данные, которые можно передавать в компоненты
const technologies = ["Next.js", "TypeScript", "Ant Design", "Tailwind CSS", "React"];
const codeSnippet = 'console.log("Hello, world!");';

export default function UiExamplePage() {
  return (
    // 1. PageLayout — оборачивает страницу и показывает заголовок
    <PageLayout title="Примеры UI-компонентов">

      {/* 2. SectionTitle — заголовок секции */}
      <SectionTitle
        title="ContentCard"
        description="Карточка для текстового блока или раздела"
      />

      {/* 3. ContentCard — карточка с контентом */}
      <ContentCard title="Что такое Next.js?">
        <Paragraph>
          Next.js — это React-фреймворк для серверного рендеринга и
          генерации статических сайтов. Он даёт маршрутизацию,
          оптимизацию изображений и многое другое «из коробки».
        </Paragraph>
        <CopyButton text="Next.js — React-фреймворк" label="Копировать текст" />
      </ContentCard>

      <ContentCard title="Почему TypeScript?">
        <Paragraph>
          TypeScript добавляет статическую типизацию в JavaScript.
          Это помогает находить ошибки на этапе написания кода,
          а не во время выполнения.
        </Paragraph>
      </ContentCard>

      {/* Ещё один SectionTitle */}
      <SectionTitle
        title="TagList"
        description="Список технологий в виде цветных меток"
      />

      {/* 4. TagList — массив строк превращается в набор Tag */}
      <TagList tags={technologies} color="blue" />

      {/* Divider (отступ через Tailwind) */}
      <div className="my-8" />

      {/* Ещё секция */}
      <SectionTitle
        title="CopyButton"
        description="Кнопка, копирующая текст в буфер обмена"
      />

      {/* 5. CopyButton — кликаем и текст сохраняется в буфере */}
      <Space direction="vertical" size="middle">
        <div>
          <Paragraph copyable={{ text: codeSnippet }} className="font-mono bg-gray-100 p-3 rounded">
            {codeSnippet}
          </Paragraph>
        </div>
        <CopyButton text={codeSnippet} label="Копировать код" />
      </Space>

      <div className="my-8" />

      {/* Страница с произвольным комбинированным примером */}
      <SectionTitle
        title="Комбинированный пример"
        description="Все компоненты вместе"
      />

      <ContentCard title="Мой стек">
        <Paragraph>
          Вот технологии, которые я использую в этом проекте:
        </Paragraph>
        <TagList tags={technologies} color="green" />
        <div className="mt-4">
          <CopyButton text={technologies.join(", ")} label="Копировать список" />
        </div>
      </ContentCard>

    </PageLayout>
  );
}
