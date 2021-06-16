import { connectToDatabase } from "../../../utils/mongodb";
import { ObjectId } from "mongodb";

const handler = async (req, res) => {
  const { db } = await connectToDatabase();
  const col = db.collection("items");
  const { item_id } = req.query;

  try {
    if (req.method === "GET") {
      try {
        const doc = {
          _id: ObjectId(item_id),
        };
        const item = await col.findOne(doc);
        await res.json(item);
      } catch (e) {
        console.dir(e);
      }
    }
  } catch (e) {
    res.status(500).json({ message: "There was an error with the database" });
  }
};

export default handler;
