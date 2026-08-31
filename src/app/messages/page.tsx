"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  messages as initialMessages,
  users,
} from "@/data/mock-data";
import type {
  Message,
  User,
} from "@/types/marketplace";
import { getCurrentUser } from "@/lib/auth";

export default function MessagesPage() {
  const searchParams = useSearchParams();

  const currentUser = getCurrentUser();

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") {
      return initialMessages;
    }

    try {
      const savedMessages =
        localStorage.getItem("n5deal-messages");

      return savedMessages
        ? (JSON.parse(savedMessages) as Message[])
        : initialMessages;
    } catch {
      return initialMessages;
    }
  });

  const [message, setMessage] = useState("");

  const selectedUserId =
    searchParams.get("user") ||
    users.find(
      (user) =>
        user.id !== currentUser.id &&
        user.role !== "manager"
    )?.id ||
    "";

  const selectedUser = users.find(
    (user) => user.id === selectedUserId
  );

  const conversations = users.filter(
    (user) =>
      user.id !== currentUser.id &&
      user.role !== "manager"
  );

  const currentConversationMessages =
    messages.filter(
      (item) =>
        (item.senderId === currentUser.id &&
          item.receiverId === selectedUserId) ||
        (item.senderId === selectedUserId &&
          item.receiverId === currentUser.id)
    );

  const handleSend = () => {
    const text = message.trim();

    if (!text || !selectedUser) {
      return;
    }

    const newMessage: Message = {
      id: `message-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedUser.id,
      content: text,
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [
      ...messages,
      newMessage,
    ];

    setMessages(updatedMessages);

    localStorage.setItem(
      "n5deal-messages",
      JSON.stringify(updatedMessages)
    );

    setMessage("");
  };

  return (
    <main className="messages-page">
      <section className="messages-page__header">
        <span>MESSAGES</span>

        <h1>Messages</h1>

        <p>
          Communicate with buyers and sellers directly.
        </p>
      </section>

      <section className="messages-page__content">
        <div className="messages-page__conversations">
          <h2>Conversations</h2>

          {conversations.map((user: User) => (
            <Link
              key={user.id}
              href={`/messages?user=${user.id}`}
              className="messages-page__conversation"
            >
              <strong>{user.name}</strong>

              <span>
                {user.role === "buyer"
                  ? "Buyer"
                  : "Seller"}
              </span>
            </Link>
          ))}
        </div>

        <div className="messages-page__chat">
          <div className="messages-page__chat-header">
            <strong>
              {selectedUser?.name || "Conversation"}
            </strong>

            <span>
              {selectedUser?.role === "buyer"
                ? "Buyer"
                : "Seller"}
            </span>
          </div>

          <div className="messages-page__messages">
            {currentConversationMessages.map((item) => (
              <div
                key={item.id}
                className={`message ${
                  item.senderId === currentUser.id
                    ? "message--sent"
                    : "message--received"
                }`}
              >
                <span>{item.content}</span>

                <small>
                  {new Date(
                    item.createdAt
                  ).toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </small>
              </div>
            ))}

            {currentConversationMessages.length === 0 && (
              <p>No messages yet.</p>
            )}
          </div>

          <div className="messages-page__form">
            <input
              value={message}
              onChange={(event) =>
                setMessage(event.target.value)
              }
              placeholder="Write a message..."
              maxLength={1000}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={
                !message.trim() || !selectedUser
              }
            >
              Send
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}