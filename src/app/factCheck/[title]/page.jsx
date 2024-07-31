import { factFetch } from "@/app/api/factService.js";
import "./factcheck.scss";
import { Suspense } from "react";
import Loading from "@/app/loading";
import Link from "next/link";

// Utility function to parse and convert URLs into clickable Link components
const parseMessage = (message) => {
  // Replace **content** with content (remove asterisks)
  let parsedMessage = message.replace(/\*\*(.*?)\*\*/g, "$1");

  // Split by newline characters to handle line breaks
  const lines = parsedMessage.split(/\n/g);

  // Regular expression to match URLs
  const urlRegex = /(https?:\/\/[^\s]+)/g;

  return lines.map((line, index) => (
    <div key={index}>
      <p>
        {line.split(urlRegex).map((part, i) =>
          urlRegex.test(part) ? (
            // Use Link component for clickable URLs
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
        {/* Parse and display the message */}
        <div className="fact-response">{parseMessage(message)}</div>
      </div>
    </Suspense>
  );
};

export default Page;
