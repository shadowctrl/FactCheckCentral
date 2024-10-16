import { Client } from "pg";

export const POST = async (req) => {
  const { title } = await req.json();

  const client = new Client({
    connectionString: process.env.POSTGRESQL_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();

  const selectQuery = `
      SELECT * 
      FROM news 
      WHERE title = $1;`;

  const res = await client.query(selectQuery, [title]);

  return new Response(JSON.stringify(res.rows), { status: 200 });
};
