import { promises as fs } from "fs";
const filePath = "src/utils/votings.json";

export const POST = async (req) => {
  const title = await req.json();
  const data = await fs.readFile(filePath, "utf-8");
  const votings = JSON.parse(data);

  let isFound = false;

  // Process the votings
  const updatedVotings = votings.map((vote) => {
    if (vote.title === title) {
      vote.vote += 1;
      isFound = true;
    }
    return vote;
  });

  if (!isFound) {
    // Title not found, create a new entry
    updatedVotings.push({ title, vote: 1 });
  }

  // Write the updated JSON back to the file
  await fs.writeFile(filePath, JSON.stringify(updatedVotings, null, 2));
  return new Response("", { status: 200 });
};
