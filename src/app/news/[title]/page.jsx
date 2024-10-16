import RenderNews from "@/components/renderNews/renderNews";
import Image from "next/image";
import { FormatDate } from "@/app/topic/[category]/[page]/page";
import Link from "next/link";
import "./news.scss";

const fetchSingleNews = async (title) => {
  const res = await fetch(process.env.base_url + "/api/getSingleNews", {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
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
const Page = async ({ params }) => {
  const title = decodeURIComponent(params.title.replace(/-/g, " "));
  const data = await fetchSingleNews(title);
  const latestData = await latestNews(data.category);

  return (
    <div className="news-parent">
      <div className="news-head">
        <Image src={data.thumbnail_url} width={200} height={400} />
        <div>
          <h1>
            <Link
              href={data.url}
              rel="noopener noreferrer nofollow"
              target="_blank"
            >
              {data.title}
            </Link>
          </h1>

          <p className="news-head-para">
            <span>{FormatDate(data.publishedat)}</span>
            <Link
              href={process.env.base_url + "/topic/" + data.category + "/1"}
            >
              <span>{data.category}</span>
            </Link>
          </p>
        </div>
      </div>
      <div className="news-description">
        <p>{data.description}</p>
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
      <div className="news-latest">
        <h2>More Latest News in {data.category}</h2>
        <div className="news-latest-container-parent">
          {latestData.slice(2, 5).map((value, index) => (
            <div key={index} className="news-latest-container">
              <Image
                src={value.thumbnail_url ? value.thumbnail_url : "/test.svg"}
                width={125}
                height={250}
              />

              <div className="news-latest-right-container">
                <h3>{value.title} </h3>
                <p>{value.description}</p>
                <Link
                  href={
                    process.env.base_url +
                    "/news/" +
                    value.title.replace(/\s+/g, "-")
                  }
                >
                  Continue Reading
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
