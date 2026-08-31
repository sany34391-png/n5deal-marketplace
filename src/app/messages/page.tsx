
import { Suspense } from "react";
import MessagesContent from "./MessagesContent";

export default function MessagesPage() {
  return (
    <Suspense
      fallback={
        <main className="messages-page">
          <p>Loading messages...</p>
        </main>
      }
    >
      <MessagesContent />
    </Suspense>
  );
}

