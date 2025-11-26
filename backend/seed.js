// seed.js
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Place from "./models/Place.js";

dotenv.config();

// ------------- File Path Setup -------------
const DATA_PATH = path.join(process.cwd(), "data", "places.json");

// ------------- CLI Arguments -------------
// Example usage:
//   node seed.js --mode=clear --confirm
// Modes: clear | append | upsert
const argv = process.argv.slice(2);
const arg = (name, def) => {
  const pair = argv.find((a) => a.startsWith(`${name}=`));
  return pair ? pair.split("=")[1] : def;
};
const mode = arg("--mode", "clear");
const confirm = argv.includes("--confirm");

// ------------- Load JSON Data -------------
if (!fs.existsSync(DATA_PATH)) {
  console.error("❌ ERROR: data/places.json not found. Create it first.");
  process.exit(1);
}

const raw = fs.readFileSync(DATA_PATH, "utf-8");
let data;
try {
  data = JSON.parse(raw);
  if (!Array.isArray(data)) throw new Error("places.json must be an array of objects");
} catch (err) {
  console.error("❌ ERROR parsing places.json:", err.message);
  process.exit(1);
}

console.log(`✅ Loaded ${data.length} records from data/places.json`);
console.log(`🧭 Mode: ${mode}`);
console.log(`⚠️  To actually write to DB, add --confirm`);
if (!confirm) {
  console.log("💡 Dry run only (no DB changes). Add --confirm to execute.");
  process.exit(0);
}

// ------------- Connect to MongoDB -------------
if (!process.env.MONGO_URI) {
  console.error("❌ MONGO_URI not set in .env");
  process.exit(1);
}

async function run() {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("✅ Connected to MongoDB.");

  try {
    if (mode === "clear") {
      console.log("🧹 Clearing existing documents in 'places' collection...");
      await Place.deleteMany({});
      console.log("📥 Inserting new data...");
      const inserted = await Place.insertMany(data);
      console.log(`✅ Inserted ${inserted.length} documents (clear mode).`);

    } else if (mode === "append") {
      console.log("📥 Appending new data...");
      const inserted = await Place.insertMany(data, { ordered: false });
      console.log(`✅ Inserted ${inserted.length} documents (append mode).`);

    } else if (mode === "upsert") {
      console.log("🔁 Upserting by place name...");
      const ops = data.map((item) => ({
        updateOne: {
          filter: { name: item.name },
          update: { $set: item },
          upsert: true,
        },
      }));
      const res = await Place.bulkWrite(ops);
      console.log("✅ Upsert summary:", res.result ? res.result : res);

    } else {
      console.error("❌ Unknown mode. Use one of: clear | append | upsert");
    }
  } catch (err) {
    console.error("💥 Error during seeding:", err);
  } finally {
    await mongoose.connection.close();
    console.log("🔌 Disconnected from MongoDB. Done.");
    process.exit(0);
  }
}

run();
