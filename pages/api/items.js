import { connectToDatabase } from "../../utils/mongodb";

export default async (req, res) => {
  const { db } = await connectToDatabase();
  const col = db.collection("items");

  try {
    if (req.method === "POST") {
      let data = req.body;
      const p = await col.insertOne(data);
      res.json({ message: "ok" });
    } else if (req.method === "GET") {
      const items = await db
        .collection("items")
        .find({})
        .sort({})
        .limit(20)
        .toArray();
      res.json(items);
    }
  } catch {
    res.status(500).json({ message: "There was an error with the database" });
  }
};
