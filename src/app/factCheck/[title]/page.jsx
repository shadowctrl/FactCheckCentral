import { factFetch } from "@/app/api/factService.js";
import "./factcheck.scss";

const Page = async ({ params }) => {
  const data = decodeURIComponent(params.title);
  const message = await factFetch(data);
  const formattedMessage = message
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\n/g, "<br />");
  return (
    <div className="factcheck-parent">
      <h1>Your Fact Check Result is Here!</h1>
      <p dangerouslySetInnerHTML={{ __html: formattedMessage }}></p>;
    </div>
  );
};

export default Page;
