"use client";

import { Button } from "antd";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";

/**
 * CopyButton — кнопка, которая копирует переданный текст в буфер обмена.
 * После копирования показывает всплывающее уведомление "Скопировано".
 *
 * Props:
 * - text  — строка, которую нужно скопировать
 * - label — текст на кнопке (по умолчанию "Копировать")
 */
interface CopyButtonProps {
  text: string;
  label?: string;
}

export default function CopyButton({ text, label = "Копировать" }: CopyButtonProps) {
  // Функция, которая вызывается при клике на кнопку
  const handleCopy = async () => {
    try {
      // Записываем текст в буфер обмена
      await navigator.clipboard.writeText(text);
      // Показываем уведомление об успехе
      message.success("Скопировано!");
    } catch {
      // Если браузер не разрешил доступ к буферу — показываем ошибку
      message.error("Не удалось скопировать");
    }
  };

  return (
    <Button type="default" icon={<CopyOutlined />} onClick={handleCopy}>
      {label}
    </Button>
  );
}
