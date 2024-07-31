import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: `${process.env.openai_api_key}`,
});

export const factFetch = async (prompt) => {
  const content = `Can you factcheck this info: ${prompt}



by searching on the web, if there are other similar results on major news outlets?



Provide 2 answers scenario.



Scenario 1:



Yes, the content seems to be true and authentic, as reported by several sources.
These, include
(and provide links here)



Scenario 2:



No, we couldn't find enough information regarding this on authoritative news outlets. However, here's what we found:



(provide links that say opposite or from minor outlets)



Also, for each website source, provide a Trust score, based on the site's popularity.



Note: Only provide either scenario 1 or scenario 2, based on your web research. Do not include Scenario 1 heading in response.



Response example:



Yes, the content seems to be true and authentic, as reported by several sources.



These, include:
- URL 1 - (Trust Score 8/10)
- URL 2 - (Trust Score 7/10)
- URL 3 - (Trust Score 8/10)



- Quick summary of news one
- Quick summary of news two
- Quick summary of news three`;

  const res = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-4o",
  });

  return res.choices[0].message.content;
};
