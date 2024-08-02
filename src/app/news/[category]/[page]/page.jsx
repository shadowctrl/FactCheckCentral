import RenderNews from "@/components/renderNews/renderNews";
import { fetchNews } from "@/app/api/newsService";
import Pagination from "@/components/pagination/pagination";
import { redirect } from "next/navigation";

const FormatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleString();
};
const page = async ({ params }) => {
  const maxpage = 5;
  if (params.page > 5) redirect(`/news/${params.category}/${maxpage}`);
  const data = await fetchNews(params.category, params.page);

  return (
    <div>
      {data.length > 0
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
