export default async function handler(req, res) {
  try {
    const response = await fetch(
      `https://simpeg-be.vercel.app/api/v2/notes/${req.query.id}`,
      {
        method: "PATCH",
        body: req.body,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
