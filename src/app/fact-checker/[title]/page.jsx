import Share from "@/components/share/share";
import "./factcheck.scss";
import Link from "next/link";
import FactcheckFormat from "@/helper/factcheckFormat";

export async function generateMetadata({ params }) {
  const prompt = decodeURIComponent(params.title);
  return { title: `Fact-Checked: ${prompt} - Fact Check Central` };
}

const fetchSingleNews = async (title) => {
  const res = await fetch(process.env.base_url + "/api/getSingleNews", {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
    cache: "no-store",
  });
  const info = await res.json();
  const data = info[0];
  return data;
};

const Page = async ({ params }) => {
  const title = decodeURIComponent(params.title);
  const data = await fetchSingleNews(title);

  return (
    <div className="factcheck-parent">
      <h1>Your fact-checking result is here!!</h1>
      <div className="fact-check-response">
        <Share title={encodeURIComponent(title)} message={data.factcheck} />
        {FactcheckFormat(data.factcheck)}
      </div>
    </div>
  );
};

export default Page;
