import RenderNews from "@/components/renderNews/renderNews";
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
  const res = await fetch(process.env.base_url + "/api/getNews", {
    method: "POST",
    body: JSON.stringify({
      category: params.category,
      count: 8,
      page: params.page,
    }),
  });
  const data = await res.json();
  return (
    <div>
      {data
        ? data.map((val, index) => (
            <RenderNews
              key={index}
              thumbnail={val.thumbnail_url ? val.thumbnail_url : "/test.svg"}
              title={val.title}
              desc={val.description}
              date={FormatDate(val.publishedat)}
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
