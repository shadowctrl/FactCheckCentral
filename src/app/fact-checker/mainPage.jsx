"use client";
import { useState } from "react";
import "./factcheckuser.scss";
import Share from "@/components/share/share";
import FactcheckFormat from "@/helper/factcheckFormat";

const FactCheck = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const prompt = e.target.elements.inputField.value;
    setTitle(prompt);
    const res = await fetch("/api/searchFact", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const formattedMessage = FactcheckFormat(data);
    setMessage(formattedMessage);
    setIsLoading(false);
  };

  return (
    <div className="user-fact-check-parent">
      <div className="user-fact-check-container">
        <h1>Fact-Check Your Content Here</h1>
        <p>
          Enter any URL or topic, and let our advanced A.I. fact-check the
          content for you
        </p>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            name="inputField"
            placeholder="Enter URL or start typing..."
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
          <div className="fact-check-response">
            <div>
              <Share title={title.replaceAll(" ", "-")} message={message} />
              <div className={`fact-user-response-para`}> {message}</div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default FactCheck;
