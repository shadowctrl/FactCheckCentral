import RenderNews from "@/components/renderNews/renderNews";
import { fetchNews } from "@/app/api/newsService";
import Pagination from "@/components/pagination/pagination";

const FormatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleString();
};
const page = async ({ params }) => {
  const data = await fetchNews(params.category, params.page);

  return (
    <div>
      {data.map((val, index) => (
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
      ))}
      <Pagination maxPage={3} category={params.category} />
    </div>
  );
};

export default page;
