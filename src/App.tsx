import { useQuery, useZero } from "@rocicorp/zero/react";
import { Schema } from "../schema";
import { useState } from "react";

function App() {
  const [filter, setFilter] = useState<undefined | string>();
  const z = useZero<Schema, undefined>();

  let messageQuery = z.query.messages;

  if (filter) {
    messageQuery = messageQuery.where("author", "=", filter);
  }

  const pastMessagesQuery = z.query.expired_message_count.one();
  const currentMessagesQuery = z.query.current_messages;

  const [messages] = useQuery(messageQuery);
  const [expiredCount] = useQuery(pastMessagesQuery);
  const [currentMessages] = useQuery(currentMessagesQuery);

  return (
    <>
      <div>
        <h1>all messages</h1>
        <p>Filter author</p>
        <input
          type="text"
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p>from: {message.author}</p>
              <p>channel: {message.channel}</p>
              <p>time: {message.time}</p>
              <p>message: {message.message}</p>
            </li>
          ))}
        </ul>
        <h1>expired_message_count</h1>
        <p>{expiredCount?.count}</p>
        <h1>live messages</h1>
        <ul>
          {currentMessages.map((message) => (
            <li key={message.id}>
              <p>from: {message.author}</p>
              <p>channel: {message.channel}</p>
              <p>time: {message.time}</p>
              <p>message: {message.message}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
