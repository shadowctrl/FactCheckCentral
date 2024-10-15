import { Client } from "pg";

export const POST = async (req) => {
  const { category } = await req.json();
  const client = new Client({
    connectionString: process.env.POSTGRESQL_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();

    const selectQuery = `
      SELECT title, url, publishedAt, description, thumbnail_url 
      FROM news 
      WHERE category = $1;`;

    const res = await client.query(selectQuery, [category]);

    return new Response(JSON.stringify(res.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching data from PostgreSQL", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  } finally {
    await client.end();
  }
};
