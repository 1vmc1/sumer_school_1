"use client";

import { ReactNode } from "react";
import { Typography } from "antd";

const { Title } = Typography;

/**
 * PageLayout — общая обёртка страницы.
 * Добавляет отступы, ограничивает ширину и опционально показывает заголовок.
 *
 * Props:
 * - children  — содержимое страницы
 * - title     — заголовок страницы (необязательно)
 * - className — дополнительные Tailwind-классы (необязательно)
 */
interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export default function PageLayout({ children, title, className = "" }: PageLayoutProps) {
  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 ${className}`}>
      {title && <Title level={2}>{title}</Title>}
      {children}
    </div>
  );
}
