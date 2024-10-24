import Image from "next/image";
import { FormatDate } from "@/app/topic/[category]/[page]/page";
import FactcheckFormat from "@/helper/factcheckFormat";
import Link from "next/link";
import "./news.scss";
import Share from "@/components/share/share";
import { MdVerified, MdWarning } from "react-icons/md";

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

const latestNews = async (category) => {
  const res = await fetch(process.env.base_url + "/api/getNews", {
    method: "POST",
    body: JSON.stringify({
      category,
    }),
  });
  const info = await res.json();
  return info;
};

const getUniqueLatestNews = (latestData, currentUrl, count = 6) => {
  const uniqueLatestData = latestData.filter((news) => news.url !== currentUrl);
  return uniqueLatestData.slice(0, count);
};

const checkFactVerify = async (fact) => {
  return fact.toLowerCase().startsWith("yes") ? true : false;
};

const Page = async ({ params }) => {
  const title = decodeURIComponent(params.title);
  const data = await fetchSingleNews(title);
  const latestData = await latestNews(data.category);
  const uniqueLatestData = getUniqueLatestNews(latestData, data.url);
  const newsVerified = await checkFactVerify(data.factcheck);

  return (
    <div className="news-parent">
      <div className="news-head">
        <Image
          src={data.thumbnail_url ? data.thumbnail_url : "/test.svg"}
          width={200}
          height={400}
        />
        <div>
          <h1>
            <Link
              href={data.url}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              {data.title.replaceAll("-", " ")}
            </Link>
          </h1>

          <div className="news-head-para">
            {newsVerified ? (
              <div className="news-verified-check">
                <MdVerified
                  className="text-blue-600 text-[22px]"
                  title="Verified Fact"
                />
                <p>This news has been fact-checked</p>
              </div>
            ) : (
              <div className="news-verified-check">
                <MdWarning
                  title="News Could not be Verfied"
                  className=" text-orange-500"
                />
                <p>
                  Warning: The authenticity of this news could not be verified.
                </p>
              </div>
            )}

            <div className="flex gap-2">
              <span>{FormatDate(data.publishedat)}</span>
              <Link
                href={process.env.base_url + "/topic/" + data.category + "/1"}
              >
                <span>{data.category}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="news-description">
        <p dangerouslySetInnerHTML={{ __html: data.description }} />
      </div>
      <div className="news-read-more">
        <Link
          href={data.url}
          rel="noopener noreferrer nofollow"
          target="_blank"
        >
          Read More
        </Link>
      </div>
      <div className="news-border" />
      <div className="news-fact-check">
        <div className="news-fact-check-head">
          <h2>Your fact-checking result is here!!</h2>
          <p>
            Our advanced AI algorithms browsed the web to verify the
            authenticity of "<span>{data.title.replaceAll("-", " ")}</span>".
            elow is an accurate report.
          </p>
        </div>
        <div className="fact-check-response">
          <div>
            <Share title={data.title} message={data.factcheck} />
            {FactcheckFormat(data.factcheck)}
          </div>
        </div>
      </div>
      <div className="news-border" />
      <div className="news-latest">
        <h2>
          More{" "}
          <Link href={process.env.base_url + "/topic/" + data.category + "/1"}>
            {data.category}
          </Link>{" "}
          Fact-Checked News
        </h2>
        <div className="news-latest-container-parent">
          {uniqueLatestData.map((value, index) => (
            <div key={index} className="news-latest-container">
              <Image
                src={value.thumbnail_url ? value.thumbnail_url : "/test.svg"}
                width={125}
                height={250}
              />

              <div className="news-latest-right-container">
                <Link
                  href={
                    process.env.base_url +
                    "/news/" +
                    encodeURIComponent(value.title.replace(/\s+/g, "-"))
                  }
                >
                  {" "}
                  <h3>{value.title.replaceAll("-", " ")}</h3>
                </Link>{" "}
                <p>{value.description}</p>
                <div className="news-read-more">
                  <Link
                    href={
                      process.env.base_url +
                      "/news/" +
                      encodeURIComponent(value.title.replace(/\s+/g, "-"))
                    }
                  >
                    Continue Reading
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
