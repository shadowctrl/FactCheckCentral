import Image from "next/image";
import RenderNews from "@/components/renderNews/renderNews";

export default function Home() {
  const title = `How our tool analysing emotions on Twitter predicted Donald Trump win`;
  const desc = `As the world dissects the how and why of Donald Trump’s presidential victory, pollsters are already coming under severe criticism for getting it so wrong. But a tool we created that analysed emotions towards the two candidates on Twitter accurately predicted the result. Unlike other poll`;
  const date = "2016-11-09 17:46:24";

  return (
    <main>
      <RenderNews
        thumbnail={"/test.svg"}
        title={title}
        desc={desc}
        date={date}
        refLink={
          "http://theconversation.com/how-our-tool-analysing-emotions-on-twitter-predicted-donald-trump-win-68522"
        }
      />
    </main>
  );
}
