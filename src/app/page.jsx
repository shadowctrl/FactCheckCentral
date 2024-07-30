import Image from "next/image";
import RenderNews from "@/components/renderNews/renderNews";
import { fetchNews } from "./api/newsService";

export default async function Home() {
  const data = await fetchNews("all", 1);

  return (
    <main>
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
    </main>
  );
}
