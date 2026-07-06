"use client";

import { ReactNode } from "react";
import { Card } from "antd";

/**
 * ContentCard — карточка для текстового блока или раздела.
 * Использует Ant Design Card с предустановленными отступами.
 *
 * Props:
 * - title    — заголовок карточки
 * - children — содержимое внутри карточки
 * - className — дополнительные Tailwind-классы
 */
interface ContentCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ContentCard({ title, children, className = "" }: ContentCardProps) {
  return (
    <Card
      title={title}
      className={className}
      style={{
        marginBottom: 16,
        borderRadius: 8,
      }}
    >
      {children}
    </Card>
  );
}
