import RenderNews from "@/components/renderNews/renderNews";
import Image from "next/image";
import { FormatDate } from "@/app/topic/[category]/[page]/page";

const Page = async ({ params }) => {
  const title = decodeURIComponent(params.title.replace(/-/g, " "));
  const res = await fetch(process.env.base_url + "/api/getSingleNews", {
    method: "POST",
    body: JSON.stringify({
      title,
    }),
  });
  const info = await res.json();
  const data = info[0];

  return (
    <div>
      {/* <div>
        <Image src={data.thumbnail_url} width={150} height={400} />
        <h1>{data.title}</h1>
      </div>
      <div>
        <p>{data.description}</p>
      </div> */}

      <RenderNews
        thumbnail={data.thumbnail_url ? data.thumbnail_url : "/test.svg"}
        title={data.title}
        desc={data.description}
        date={FormatDate(data.publishedat)}
        refLink={data.url}
        intLink={data.url}
      />
    </div>
  );
};

export default Page;
