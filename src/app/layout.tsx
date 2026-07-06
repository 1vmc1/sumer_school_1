import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import PageTransition from "@/components/PageTransition";
import "./globals.css";

// Мета-данные для SEO и вкладки браузера (по-русски, про профессию)
export const metadata: Metadata = {
  title: "ML-инженер — профессия будущего | Проект Летней школы ЭР-Телеком",
  description:
    "Кто такой ML-инженер простыми словами: чем занимается, какие навыки нужны, как прийти в профессию и зачем эта роль телеком-компании ЭР-Телеком Холдинг. Есть тест «Моё ли это?».",
};

// Корневой layout — оборачивает все страницы сайта
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        {/* Глобальная тема Ant Design — фирменный бирюзовый акцент ЭР-Телеком */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#003288",
              colorLink: "#197ae8",
              borderRadius: 10,
              fontFamily: "Arial, 'Helvetica Neue', system-ui, sans-serif",
            },
          }}
        >
          <div className="min-h-screen flex flex-col">
            <NavBar />

            {/* Основной контент — каждая страница сама задаёт свою ширину.
                PageTransition проигрывает анимацию при смене маршрута. */}
            <main className="flex-1 w-full">
              <PageTransition>{children}</PageTransition>
            </main>

            <footer style={{ borderTop: "1px solid var(--line)", background: "#fafcfc" }}>
              <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/logo/ertelecom-mark.png" alt="ЭР-Телеком" width={34} height={34} />
                    <strong style={{ color: "var(--ink)" }}>ЭР-Телеком Холдинг</strong>
                  </div>
                  <p style={{ color: "var(--ink-soft)", fontSize: 14, margin: 0 }}>
                    Проект Летней школы — сайт-проводник в&nbsp;профессию ML-инженера.
                  </p>
                </div>

                <div>
                  <div style={{ color: "var(--ink)", fontWeight: 600, marginBottom: 10 }}>
                    Разделы
                  </div>
                  <div className="flex flex-col gap-2" style={{ fontSize: 14 }}>
                    <Link href="/" style={{ color: "var(--ink-soft)" }}>Главная</Link>
                    <Link href="/projects" style={{ color: "var(--ink-soft)" }}>Проекты</Link>
                    <Link href="/rl-game" style={{ color: "var(--ink-soft)" }}>RL-игра</Link>
                    <Link href="/resources" style={{ color: "var(--ink-soft)" }}>Ресурсы</Link>
                  </div>
                </div>

                <div>
                  <div style={{ color: "var(--ink)", fontWeight: 600, marginBottom: 10 }}>
                    Команда
                  </div>
                  {/* впишите название команды */}
                  <p style={{ color: "var(--ink-soft)", fontSize: 14, margin: 0 }}>
                    Команда «___________»
                    <br />
                    Летняя школа ЭР-Телеком Холдинг, {new Date().getFullYear()}
                  </p>
                </div>
              </div>

              <div
                className="text-center py-4"
                style={{ borderTop: "1px solid var(--line)", color: "#94a3b8", fontSize: 13 }}
              >
                © {new Date().getFullYear()} · Учебный проект Летней школы · ЭР-Телеком Холдинг
              </div>
            </footer>
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
