import pool from "@/lib/db";

export const POST = async (req) => {
  const { category, page = 1, count = 15 } = await req.json();
  const client = await pool.connect();

  try {
    const offset = (page - 1) * count;

    const selectQuery = `
      SELECT title, url, publishedAt, description, thumbnail_url 
      FROM fccnews 
      WHERE category = $1 
      ORDER BY publishedAt DESC
      LIMIT $2 OFFSET $3;`;

    const res = await client.query(selectQuery, [category, count, offset]);

    return new Response(JSON.stringify(res.rows), { status: 200 });
  } catch (error) {
    console.error("Error fetching data from PostgreSQL", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  } finally {
    client.release();
  }
};
