"use client";

import { Tag, Space } from "antd";

/**
 * TagList — список меток Ant Design Tag.
 * Удобно показывать технологии, категории или ключевые слова.
 *
 * Props:
 * - tags  — массив строк (названия меток)
 * - color — цвет всех меток (по умолчанию "blue")
 */
interface TagListProps {
  tags: string[];
  color?: string;
}

export default function TagList({ tags, color = "blue" }: TagListProps) {
  // Если массив пустой — ничего не рендерим
  if (tags.length === 0) return null;

  return (
    <Space wrap size={[6, 6]}>
      {tags.map((tag) => (
        <Tag key={tag} color={color}>
          {tag}
        </Tag>
      ))}
    </Space>
  );
}
