import Link from "next/link";

const FactcheckFormat = (message) => {
  const lines = message.split("\n");
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parenthesesRegex = /\(([^)]+)\)/g;

  // Array of words/phrases to emphasize
  const emphasizeWords = ["quick summary"];

  // Determine the emoji based on the first line
  const emoji = lines[0].toLowerCase().startsWith("yes") ? "✅" : "❌";
  const modifiedFirstLine = `${emoji} ${lines[0]}`;

  const formatLine = (line) => {
    // Replace specified words with strong tags
    let formattedLine = line;
    emphasizeWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi"); // Create a regex for case-insensitive matching
      formattedLine = formattedLine.replace(regex, "<strong>$1</strong>");
    });

    return formattedLine.split(urlRegex).flatMap((part, i) => {
      // Replace text inside parentheses with strong tags
      const formattedPart = part.replace(parenthesesRegex, (match, p1) => {
        return `(<strong>${p1}</strong>)`;
      });

      // Check if the part matches the URL regex
      if (urlRegex.test(part)) {
        return (
          <Link
            key={i}
            href={part}
            target="_blank"
            rel="noopener nofollow noreferrer"
          >
            {formattedPart}
          </Link>
        );
      } else {
        // Return a span with dangerouslySetInnerHTML for strong tags
        return (
          <span key={i} dangerouslySetInnerHTML={{ __html: formattedPart }} />
        );
      }
    });
  };

  return lines.map((line, index) => (
    <div key={index}>
      <p
        style={
          index === 0
            ? { color: "rgb(0, 0, 0,1)", fontWeight: 700, fontSize: "20px" }
            : { color: "rgb(0, 0, 0,0.7)", fontWeight: 600 }
        }
      >
        {index === 0 ? formatLine(modifiedFirstLine) : formatLine(line)}
      </p>
    </div>
  ));
};

export default FactcheckFormat;
