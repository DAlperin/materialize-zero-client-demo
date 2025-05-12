import { useQuery, useZero } from "@rocicorp/zero/react";
import { Schema } from "../schema";
import { useState } from "react";
import { PostThread } from "react-bluesky-embed";
import "./styles.css";

function App() {

  const z = useZero<Schema, undefined>();

  let messageQuery = z.query.top_posts.orderBy("count", "desc");

  const [messages] = useQuery(messageQuery);
  
  console.log(messages);

  return (
    <>
      <div className="messagesContainer">
        {messages.map((message) => (
          <span className="Potato">
            {message.count}
            <PostThread
              params={{
                did: message.did,
                rkey: message.rkey,
              }}
            />
          </span>
        ))}
      </div>
    </>
  );
}

export default App;
