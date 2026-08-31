
"use client";

import {
  FormEvent,
  useMemo,
  useState,
} from "react";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { getCurrentUser } from "@/lib/auth";
import { users } from "@/data/mock-data";

import {
  addMessage,
  getMessages,
} from "@/lib/messages-store";

import type { Message } from "@/types/marketplace";

export default function MessagesContent() {
  const currentUser = getCurrentUser();
  const searchParams = useSearchParams();

  const initialUserId =
    searchParams.get("user") ?? "";

  const [messages, setMessages] = useState<Message[]>(
    () => getMessages()
  );

  const [selectedUserId, setSelectedUserId] =
    useState(initialUserId);

  const [content, setContent] = useState("");

  const conversations = useMemo(() => {
    if (!currentUser) {
      return [];
    }

    const userIds = new Set<string>();

    messages.forEach((message) => {
      if (message.senderId === currentUser.id) {
        userIds.add(message.receiverId);
      }

      if (message.receiverId === currentUser.id) {
        userIds.add(message.senderId);
      }
    });

    return users.filter((item) =>
      userIds.has(item.id)
    );
  }, [currentUser, messages]);

  if (!currentUser) {
    return (
      <main className="messages-page">
        <h1>Messages</h1>

        <p>
          Please login to view your messages.
        </p>

        <Link href="/login">
          Login
        </Link>
      </main>
    );
  }

  const selectedUser = users.find(
    (item) => item.id === selectedUserId
  );

  const conversationMessages =
    messages.filter(
      (message) =>
        (message.senderId === currentUser.id &&
          message.receiverId ===
            selectedUserId) ||
        (message.senderId === selectedUserId &&
          message.receiverId === currentUser.id)
    );

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !selectedUserId ||
      !content.trim()
    ) {
      return;
    }

    const newMessage: Message = {
      id: `message-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedUserId,
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    addMessage(newMessage);

    setMessages((current) => [
      ...current,
      newMessage,
    ]);

    setContent("");
  };

  return (
    <main className="messages-page">
      <section className="messages-page__header">
        <span>MESSAGES</span>

        <h1>Your conversations</h1>

        <p>
          Contact buyers and sellers directly.
        </p>
      </section>

      <section className="messages-page__layout">
        <aside className="messages-page__sidebar">
          <h2>Conversations</h2>

          {conversations.length === 0 ? (
            <p>No conversations yet.</p>
          ) : (
            conversations.map(
              (conversationUser) => (
                <button
                  key={conversationUser.id}
                  type="button"
                  onClick={() =>
                    setSelectedUserId(
                      conversationUser.id
                    )
                  }
                  className={
                    selectedUserId ===
                    conversationUser.id
                      ? "messages-page__user messages-page__user--active"
                      : "messages-page__user"
                  }
                >
                  <strong>
                    {conversationUser.name}
                  </strong>

                  <span>
                    {conversationUser.role}
                  </span>
                </button>
              )
            )
          )}
        </aside>

        <section className="messages-page__conversation">
          {!selectedUser ? (
            <div className="messages-page__empty">
              <h2>
                Select a conversation
              </h2>

              <p>
                Choose a buyer or seller to
                start messaging.
              </p>
            </div>
          ) : (
            <>
              <header className="messages-page__conversation-header">
                <div>
                  <span>
                    {selectedUser.role.toUpperCase()}
                  </span>

                  <h2>
                    {selectedUser.name}
                  </h2>
                </div>
              </header>

              <div className="messages-page__messages">
                {conversationMessages.length ===
                0 ? (
                  <p>
                    No messages yet. Start the
                    conversation.
                  </p>
                ) : (
                  conversationMessages.map(
                    (message) => {
                      const ownMessage =
                        message.senderId ===
                        currentUser.id;

                      return (
                        <div
                          key={message.id}
                          className={
                            ownMessage
                              ? "message message--own"
                              : "message"
                          }
                        >
                          <p>
                            {message.content}
                          </p>

                          <span>
                            {new Date(
                              message.createdAt
                            ).toLocaleString()}
                          </span>
                        </div>
                      );
                    }
                  )
                )}
              </div>

              <form
                className="messages-page__form"
                onSubmit={handleSubmit}
              >
                <input
                  type="text"
                  value={content}
                  onChange={(event) =>
                    setContent(event.target.value)
                  }
                  placeholder="Write a message..."
                />

                <button type="submit">
                  Send
                </button>
              </form>
            </>
          )}
        </section>
      </section>
    </main>
  );
}
