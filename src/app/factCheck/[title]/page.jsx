import "./factcheck.scss";
import Link from "next/link";

const parseMessage = (message) => {
  let parsedMessage = message.replace(/\*\*(.*?)\*\*/g, "$1");
  const lines = parsedMessage.split(/\n/g);
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return lines.map((line, index) => (
    <div key={index}>
      <p
        style={
          index === 0
            ? { color: "rgb(0, 0, 0,1)", fontWeight: 700, fontSize: "20px" }
            : { color: "rgb(0, 0, 0,0.7)", fontWeight: 600 }
        }
      >
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

const Page = async ({ params }) => {
  const prompt = decodeURIComponent(params.title);
  const res = await fetch("http://localhost:3000/api/searchFact", {
    method: "POST",
    body: JSON.stringify({ prompt: `${prompt}` }),
    headers: { "Content-Type": "application/json" },
  });
  const message = await res.json();
  return (
    <div className="factcheck-parent">
      <h1>Your Fact Check Result is Here!</h1>
      <div className="fact-response">{parseMessage(message)}</div>
    </div>
  );
};

export default Page;
