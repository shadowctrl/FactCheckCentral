import Link from "next/link";
const FactcheckFormat = (message) => {
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
export default FactcheckFormat;
