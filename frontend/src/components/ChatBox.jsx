import { useState } from "react";

import api from "../api";


function ChatBox({ fileId }) {

  const [question, setQuestion] =
    useState("");

  const [messages, setMessages] =
    useState([]);


  const askQuestion = async () => {

    if (!question.trim()) return;

    // Add user message
    const updatedMessages = [

      ...messages,

      {
        type: "user",
        text: question
      }

    ];

    setMessages(updatedMessages);

    const currentQuestion = question;

    setQuestion("");


    try {

      const res = await api.post(
        "/chat",
        {
          file_id: fileId,
          question: currentQuestion
        }
      );

      setMessages([
        ...updatedMessages,
        {
          type: "ai",
          text: res.data.answer
        }
      ]);

    } catch (err) {

      setMessages([
        ...updatedMessages,
        {
          type: "ai",
          text: "Error getting response."
        }
      ]);
    }
  };


  return (

    <div className="mt-8">

      {/* Chat History */}

      <div className="space-y-4 mb-6">

        {
          messages.map((msg, index) => (

            <div
              key={index}
              className={`p-4 rounded-lg max-w-[80%]
              ${
                msg.type === "user"
                ?
                "bg-blue-600 ml-auto"
                :
                "bg-gray-700"
              }`}
            >

              <p className="font-semibold mb-1">

                {
                  msg.type === "user"
                  ?
                  "You"
                  :
                  "AI"
                }

              </p>

              <p>{msg.text}</p>

            </div>

          ))
        }

      </div>


      {/* Input Section */}

      <div className="flex gap-4">

        <input
          type="text"
          placeholder="Ask anything about the document..."
          value={question}
          onChange={(e) =>
            setQuestion(e.target.value)
          }
          className="flex-1 p-3 rounded-lg bg-gray-700"
        />

        <button
          onClick={askQuestion}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg"
        >
          Ask
        </button>

      </div>

    </div>
  );
}

export default ChatBox;