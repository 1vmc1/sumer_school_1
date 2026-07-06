"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  ProjectOutlined,
  MailOutlined,
  BookOutlined,
} from "@ant-design/icons";

// Пункты меню: key совпадает с URL, label — ссылка для Next.js
const menuItems = [
  { key: "/", label: <Link href="/">Главная</Link>, icon: <HomeOutlined /> },
  {
    key: "/about",
    label: <Link href="/about">О проекте</Link>,
    icon: <InfoCircleOutlined />,
  },
  {
    key: "/projects",
    label: <Link href="/projects">Проекты</Link>,
    icon: <ProjectOutlined />,
  },
  {
    key: "/resources",
    label: <Link href="/resources">Ресурсы</Link>,
    icon: <BookOutlined />,
  },
  {
    key: "/contacts",
    label: <Link href="/contacts">Контакты</Link>,
    icon: <MailOutlined />,
  },
];

export default function NavBar() {
  // usePathname возвращает текущий путь (например, "/projects")
  const pathname = usePathname();

  return (
    <Menu
      mode="horizontal"
      selectedKeys={[pathname]}
      items={menuItems}
      style={{
        justifyContent: "center",
        borderBottom: "1px solid #e5e7eb",
      }}
    />
  );
}
