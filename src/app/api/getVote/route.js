import { promises as fs } from "fs";
const filePath = "src/utils/votings.json";

export const POST = async (req) => {
  const title = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  const votings = JSON.parse(data);

  const vote = votings.find((vote) => vote.title === title);

  if (vote) {
    // If the title is found, return the vote count
    return new Response(JSON.stringify({ vote: vote.vote, title: title }), {
      status: 200,
    });
  } else {
    // If the title is not found, return a 404 Not Found status
    return new Response("Title not found", { status: 404 });
  }
};
