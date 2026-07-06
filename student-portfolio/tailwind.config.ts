import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Отключаем preflight, чтобы не ломать стили Ant Design
  corePlugins: {
    preflight: false,
  },
};

export default config;
