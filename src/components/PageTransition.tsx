"use client";

import { usePathname } from "next/navigation";

// Оборачивает контент страницы: при смене маршрута React пересоздаёт div
// (меняется key), и CSS-анимация pageIn проигрывается заново — плавный переход.
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-anim">
      {children}
    </div>
  );
}
