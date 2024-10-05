import RenderNews from "@/components/renderNews/renderNews";
import { fetchNews } from "@/app/api/newsService";
import Pagination from "@/components/pagination/pagination";
import { redirect } from "next/navigation";

const FormatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleString();
};

export async function generateMetadata({ params }) {
  const capitalizeFirstLetter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);
  const category = capitalizeFirstLetter(params.category);

  return {
    title: `Latest Fact-Checked ${category} News - Fact Check Central`,
  };
}
const page = async ({ params }) => {
  const maxpage = 6;
  if (params.page > maxpage) redirect(`/news/${params.category}/${maxpage}`);
  const data = await fetchNews(params.category, params.page);
  return (
    <div>
      {data
        ? data.map((val, index) => (
            <RenderNews
              key={index}
              thumbnail={
                val.image?.thumbnail?.contentUrl
                  ? val.image.thumbnail.contentUrl
                  : "/test.svg"
              }
              title={val.name}
              desc={val.description}
              date={FormatDate(val.datePublished)}
              refLink={val.url}
            />
          ))
        : ""}
      <Pagination
        maxPage={maxpage}
        category={params.category}
        page={params.page}
      />
    </div>
  );
};

export default page;
