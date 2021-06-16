import { connectToDatabase } from "../../utils/mongodb";
import { ObjectId } from "mongodb";

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
    } else if (req.method === "DELETE") {
      try {
        const itemId = req.body.itemId;
        const doc = {
          _id: ObjectId(itemId),
        };
        const p = await db.collection("items").removeOne(doc);
        if (p.deletedCount >= 1) {
          await res.json({ message: "Item " + itemId + " was deleted" });
          console.dir("Item was deleted");
        } else {
          await res.json({
            message: "Item with id " + itemId + " was not found",
          });
          console.dir("Item with that id was not found");
        }
      } catch (e) {
        res.json(e.message);
      }
    } else if (req.method === "PUT") {
      const itemId = req.body._id;
      const doc = {
        _id: ObjectId(itemId),
      };
      const r = await col.updateOne(doc, {
        $set: {
          name: req.body.name,
          quantity: req.body.quantity,
          location: req.body.location,
        },
      });
      if (r.modifiedCount >= 1) {
        res.json({ message: `Item ${itemId} was updated successfully!` });
      } else {
        res.json({ message: "There was an error while updating your record" });
      }
    }
  } catch {
    res.status(500).json({ message: "There was an error with the database" });
  }
};
