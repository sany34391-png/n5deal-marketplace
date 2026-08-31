import type { Message } from "@/types/marketplace";

const STORAGE_KEY = "n5deal-messages";

export function getMessages(): Message[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed as Message[];
  } catch {
    return [];
  }
}

export function saveMessages(
  messages: Message[]
): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(messages)
  );
}

export function addMessage(
  message: Message
): void {
  const messages = getMessages();

  saveMessages([
    ...messages,
    message,
  ]);
}