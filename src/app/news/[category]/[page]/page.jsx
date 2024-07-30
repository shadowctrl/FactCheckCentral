import RenderNews from "@/components/renderNews/renderNews";
import { fetchNews } from "@/app/api/newsService";
import Pagination from "@/components/pagination/pagination";

const page = async ({ params }) => {
  const data = await fetchNews(params.category, params.page);
  return (
    <div>
      {data.map((val, index) => (
        <RenderNews
          key={index}
          thumbnail={"/test.svg"}
          title={val.domain}
          desc={val.description}
          date={val.date}
          refLink={val.link}
        />
      ))}
      <Pagination maxPage={3} category={params.category} />
    </div>
  );
};

export default page;
