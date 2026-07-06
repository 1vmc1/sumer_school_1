import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import NavBar from "@/components/NavBar";
import "./globals.css";

// Мета-данные для SEO — отображаются в заголовке вкладки браузера
export const metadata: Metadata = {
  title: "ML-инженер",
  description:
    "Сайт о профессии ML-инженера: проекты, ресурсы для обучения и полезные материалы",
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
        {/*
          ConfigProvider — глобальная тема Ant Design.
          Здесь мы задаём синий акцентный цвет (#1677ff).
        */}
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#1677ff",
              borderRadius: 8,
            },
          }}
        >
          {/* Минимальная структура: шапка + контент + подвал */}
          <div className="min-h-screen flex flex-col">
            <header>
              <NavBar />
            </header>

            {/* Основной контент — каждая страница рендерится сюда */}
            <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
              {children}
            </main>

            {/* Подвал */}
            <footer className="text-center py-6 text-gray-400 text-sm border-t border-gray-200">
              &copy; {new Date().getFullYear()} Учебный проект. Сделано своими руками.
            </footer>
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
