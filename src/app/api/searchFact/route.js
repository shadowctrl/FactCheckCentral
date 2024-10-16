import { OpenAI } from "openai";
const openai = new OpenAI({
  apiKey: `${process.env.perplexity_api_key}`,
  baseURL: "https://api.perplexity.ai",
});

export const POST = async (req) => {
  const { prompt } = await req.json();
  const content = `Can you factcheck this info: ${prompt}
by searching on the web, if there are other similar results on major news outlets?

Provide 3 answers scenario:

Scenario 1:
✅ Yes, the content seems to be true and authentic, as reported by several sources.
These, include
(and provide links here). Also, for each website source, provide a Trust score, based on the site's popularity.

Scenario 2:
❌ No, we couldn't find enough information regarding this on authoritative news outlets. However, here's what we found:
(and provide links that claim something different, or from minor outlets). Also, for each website source, provide a Trust score, based on the site's popularity.

Scenario 3:
❌ No, we couldn't find enough information regarding this on authoritative news outlets. Therefore, the given information may be partially - or fully - inaccurate.

Note: Only provide either scenario 1 or scenario 2, based on your web research. Do not include Scenario 1 heading in response.
Note 2: Only use scenario 3 if you find zero relevant news. If you find just 1 or 2 news, use scenario 2 and mention just 1 or 2 news.

Response example:

Yes, the content seems to be true and authentic, as reported by several sources.

These, include:
- URL 1 - (Trust Score 8/10)
- URL 2 - (Trust Score 7/10)
- URL 3 - (Trust Score 8/10)


- Quick summary of news one
- Quick summary of news two
- Quick summary of news three

IMPORTANT NOTE: I'm displaying this in a website so don't include clickable links in words just give the links directly and make sure x and check emojis are placed. and dont use ** or ##. 
`;

  const res = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "llama-3.1-sonar-large-128k-online",
  });
  return Response.json(res.choices[0].message.content);
};
