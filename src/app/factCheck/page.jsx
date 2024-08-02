"use client";

import "./factcheckuser.scss";
const parseMessage = (message) => {
  let parsedMessage = message.replace(/\*\*(.*?)\*\*/g, "$1");
  const lines = parsedMessage.split(/\n/g);
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return lines.map((line, index) => (
    <div key={index}>
      <p>
        {line.split(urlRegex).map((part, i) =>
          urlRegex.test(part) ? (
            <Link key={i} href={part} target="_blank" rel="noopener noreferrer">
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
const factCheck = ({}) => {
  return (
    <div className="user-fact-check-parent">
      <h1>Check Your Fact Score Here</h1>
      <input type="text" placeholder="Check your fact score now!" />
    </div>
  );
};

export default factCheck;
