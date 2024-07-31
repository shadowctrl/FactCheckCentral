import { factFetch } from "@/app/api/factService.js";
import "./factcheck.scss";
import { Suspense } from "react";
import Loading from "@/app/loading";
import Link from "next/link";

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

const Page = async ({ params }) => {
  const data = decodeURIComponent(params.title);
  const message = await factFetch(data);

  return (
    <Suspense fallback={<Loading />}>
      <div className="factcheck-parent">
        <h1>Your Fact Check Result is Here!</h1>
        <div className="fact-response">{parseMessage(message)}</div>
      </div>
    </Suspense>
  );
};

export default Page;
