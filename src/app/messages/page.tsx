"use client";

import { useState } from "react";

export default function MessagesPage() {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (!message.trim()) return;

    alert("Message sent!");

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

          <div className="messages-page__conversation">
            <strong>Demo Buyer</strong>
            <span>Interested in your asset</span>
          </div>

          <div className="messages-page__conversation">
            <strong>Demo Seller</strong>
            <span>New acquisition opportunity</span>
          </div>
        </div>

        <div className="messages-page__chat">
          <div className="messages-page__chat-header">
            <strong>Demo Buyer</strong>
            <span>Active conversation</span>
          </div>

          <div className="messages-page__messages">
            <div className="message message--received">
              Hello, I am interested in this opportunity.
            </div>

            <div className="message message--sent">
              Thank you for your interest.
            </div>
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