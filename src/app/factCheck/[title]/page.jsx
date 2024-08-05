import Share from "@/components/share/share";
import "./factcheck.scss";
import Link from "next/link";

const parseMessage = (message) => {
  const lines = message.split("\n");
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

const Page = async ({ params }) => {
  const prompt = decodeURIComponent(params.title);
  const res = await fetch(`${process.env.base_url}/api/searchFact`, {
    method: "POST",
    body: JSON.stringify({ prompt: `${prompt}` }),
    headers: { "Content-Type": "application/json" },
  });
  const message = await res.json();
  return (
    <div className="factcheck-parent">
      <h1>Your fact-checking result is here!!</h1>
      <div className="fact-response">
        <Share title={prompt} message={message} />
        <div className="fact-response-para">{parseMessage(message)}</div>
      </div>
    </div>
  );
};

export default Page;
