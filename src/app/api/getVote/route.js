import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.postgresql_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export const POST = async (req) => {
  const client = await pool.connect();
  try {
    const { title } = await req.json();

    const res = await client.query(
      "SELECT vote FROM votings WHERE title = $1",
      [title]
    );

    if (res.rows.length > 0) {
      return new Response(
        JSON.stringify({ vote: res.rows[0].vote, title: title }),
        {
          status: 200,
        }
      );
    } else {
      return new Response("Title not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching vote:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    client.release();
  }
};
