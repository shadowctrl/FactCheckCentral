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
    const res = await client.query("SELECT * FROM votings WHERE title = $1", [
      title,
    ]);

    if (res.rows.length > 0) {
      await client.query(
        "UPDATE votings SET vote = vote + 1 WHERE title = $1",
        [title]
      );
    } else {
      await client.query("INSERT INTO votings (title, vote) VALUES ($1, $2)", [
        title,
        1,
      ]);
    }

    return new Response("", { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    client.release();
  }
};
