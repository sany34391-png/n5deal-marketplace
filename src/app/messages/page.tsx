"use client";

import { useState } from "react";
import { messages as initialMessages, users } from "@/data/mock-data";
import type { Message } from "@/types/marketplace";

const CURRENT_USER_ID = "user-1";

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === "undefined") {
      return initialMessages;
    }

    const savedMessages = localStorage.getItem("n5deal-messages");

    return savedMessages
      ? JSON.parse(savedMessages)
      : initialMessages;
  });

  const [message, setMessage] = useState("");

  const conversations = users.filter(
    (user) =>
      user.id !== CURRENT_USER_ID &&
      user.role !== "manager"
  );

  const currentConversationMessages = messages.filter(
    (item) =>
      item.senderId === CURRENT_USER_ID ||
      item.receiverId === CURRENT_USER_ID
  );

  const handleSend = () => {
    const text = message.trim();

    if (!text) return;

    const newMessage: Message = {
      id: `message-${Date.now()}`,
      senderId: CURRENT_USER_ID,
      receiverId: "user-3",
      content: text,
      createdAt: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];

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

          {conversations.map((user) => (
            <div
              key={user.id}
              className="messages-page__conversation"
            >
              <strong>{user.name}</strong>

              <span>
                {user.role === "buyer"
                  ? "Buyer"
                  : "Seller"}
              </span>
            </div>
          ))}
        </div>

        <div className="messages-page__chat">
          <div className="messages-page__chat-header">
            <strong>Conversation</strong>

            <span>
              Messages with marketplace participants
            </span>
          </div>

          <div className="messages-page__messages">
            {currentConversationMessages.map((item) => (
              <div
                key={item.id}
                className={`message ${
                  item.senderId === CURRENT_USER_ID
                    ? "message--sent"
                    : "message--received"
                }`}
              >
                {item.content}
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
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSend();
                }
              }}
            />

            <button onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
