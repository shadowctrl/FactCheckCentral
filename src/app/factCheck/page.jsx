"use client";
import { useState } from "react";
import "./factcheckuser.scss";
import "./[title]/factcheck.scss";
import Link from "next/link"; // Assuming you're using Next.js, import Link
import Share from "@/components/share/share";

const parseMessage = (message) => {
  const lines = message.split("\n");
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return lines.map((line, index) => (
    <div key={index}>
      <p
        style={
          index === 0
            ? {
                color: "rgb(0, 0, 0,1)",
                fontWeight: 700,
                fontSize: "20px",
                marginTop: "-4vh",
                paddingBottom: "2vh",
              }
            : { color: "rgb(0, 0, 0,0.7)", fontWeight: 600 }
        }
      >
        {line.split(urlRegex).map((part, i) =>
          urlRegex.test(part) ? (
            <Link
              key={i}
              href={part}
              target="_blank"
              rel="noopener nofollow noreferrer"
            >
              {part}
            </Link>
          ) : (
            part
          )
        )}
      </p>
    </div>
  ));
};

const FactCheck = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading animation
    const prompt = e.target.elements.inputField.value;
    setTitle(prompt);
    const res = await fetch("/api/searchFact", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });
    const data = await res.json();
    const formattedMessage = parseMessage(data);
    setMessage(formattedMessage);
    setIsLoading(false); // Stop loading animation
  };

  return (
    <div className="user-fact-check-parent">
      <div className="user-fact-check-container">
        <h1>Check Your Fact Score Here</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="inputField"
            placeholder="Check your fact score now!"
            required
          />
          <button type="submit" disabled={isLoading}>
            Submit
          </button>
        </form>
      </div>
      {isLoading ? (
        <div className="loader"></div>
      ) : (
        message && (
          <div className="fact-response">
            <Share title={title} message={message} />
            <div className={`fact-response-para`}> {message}</div>
          </div>
        )
      )}
    </div>
  );
};

export default FactCheck;
