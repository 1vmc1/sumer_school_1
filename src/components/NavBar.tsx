"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Drawer, Button, Grid } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const { useBreakpoint } = Grid;

// Пункты навигации: href — маршрут, label — подпись
const links = [
  { href: "/", label: "Главная" },
  { href: "/projects", label: "Проекты" },
  { href: "/rl-game", label: "RL-игра" },
  { href: "/resources", label: "Ресурсы" },
  { href: "/contacts", label: "Контакты" },
];

// Логотип-заглушка. {/* пример — можно заменить: положите SVG ЭР-Телеком в public/logo/ */}
function BrandMark() {
  return (
    <Link href="/" className="flex items-center gap-3 no-underline">
      <span
        className="grid place-items-center rounded-lg font-bold text-white"
        style={{
          width: 40,
          height: 40,
          background: "linear-gradient(135deg, var(--brand-deep), var(--brand-bright))",
          fontSize: 15,
          letterSpacing: "-0.02em",
        }}
      >
        ЭР
      </span>
      <span className="leading-tight">
        <span className="block font-semibold" style={{ color: "var(--ink)", fontSize: 15 }}>
          ЭР-Телеком Холдинг
        </span>
        <span className="block" style={{ color: "var(--ink-soft)", fontSize: 12 }}>
          Проект Летней школы
        </span>
      </span>
    </Link>
  );
}

export default function NavBar() {
  const pathname = usePathname();
  const screens = useBreakpoint();
  const [open, setOpen] = useState(false);
  const isDesktop = screens.md;

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href;
    return (
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className="no-underline transition-colors"
        style={{
          color: active ? "var(--brand-deep)" : "var(--ink-soft)",
          fontWeight: active ? 600 : 500,
          padding: isDesktop ? "6px 2px" : "10px 0",
          fontSize: isDesktop ? 15 : 17,
          borderBottom: isDesktop
            ? `2px solid ${active ? "var(--brand)" : "transparent"}`
            : "none",
          display: "block",
        }}
      >
        {label}
      </Link>
    );
  };

  return (
    <div
      className="sticky top-0 z-50"
      style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between" style={{ height: 68 }}>
        <BrandMark />

        {isDesktop ? (
          <nav className="flex items-center gap-7">
            {links.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </nav>
        ) : (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 20 }} />}
            onClick={() => setOpen(true)}
            aria-label="Открыть меню"
          />
        )}
      </div>

      <Drawer
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        width={260}
        title="Меню"
      >
        <nav className="flex flex-col">
          {links.map((l) => (
            <NavLink key={l.href} {...l} />
          ))}
        </nav>
      </Drawer>
    </div>
  );
}
