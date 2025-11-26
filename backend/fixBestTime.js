import mongoose from "mongoose";
import dotenv from "dotenv";
import Place from "./models/Place.js";

dotenv.config();

const mappings = {
  "Peak Season": ["Dec – Feb (Peak Season)", "Dec – Feb", "Winter"],
  "Good Season": ["Mar – May (Good Season)", "Summer"],
  "Monsoon Season": ["Monsoon (Jun – Aug)", "Jun – Aug (Monsoon)"],
  "Pleasant Season": ["Pleasant Again (Sep – Nov)", "Sep – Nov (Pleasant Season)"]
};

const normalizeBestTime = (text) => {
  for (const [standard, variants] of Object.entries(mappings)) {
    if (variants.some(v => text.includes(v.split(" ")[0]))) {
      // find month pattern
      const monthMatch = text.match(/[A-Za-z]+ – [A-Za-z]+/);
      const monthRange = monthMatch ? monthMatch[0] : "Unknown";
      return `${monthRange} | ${standard}`;
    }
  }
  return text;
};

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const allPlaces = await Place.find();

  for (const place of allPlaces) {
    place.bestTime = normalizeBestTime(place.bestTime);
    await place.save();
  }

  console.log("✅ All bestTime fields normalized.");
  await mongoose.disconnect();
}

run().catch(console.error);
