import pool from "@/lib/db";

export const POST = async (req) => {
  const { title } = await req.json();
  const client = await pool.connect();

  try {
    const selectQuery = `
      SELECT * 
      FROM news 
      WHERE title = $1;`;

    const res = await client.query(selectQuery, [title]);
    if (res.rows.length > 0) {
      return new Response(JSON.stringify(res.rows), { status: 200 });
    } else {
      return new Response("Title not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    client.release();
  }
};
