export function normalizeCategory(category) {
  const c = category.toLowerCase();

  if (c.includes("hill")) return "Hill Station";
  if (c.includes("beach")) return "Beach";
  if (c.includes("backwater")) return "Backwater";

  if (c.includes("wildlife") || c.includes("forest")) return "Wildlife";

  if (c.includes("trek") || c.includes("adventure")) return "Trekking";

  if (
    c.includes("heritage") ||
    c.includes("cultural") ||
    c.includes("temple") ||
    c.includes("museum") ||
    c.includes("fort")
  ) return "Heritage & Culture";

  if (c.includes("waterfall")) return "Waterfall";

  if (c.includes("view") || c.includes("scenic")) return "Viewpoint";

  if (
    c.includes("lake") ||
    c.includes("dam") ||
    c.includes("garden")
  ) return "Lake & Dam";

  if (
    c.includes("nature") ||
    c.includes("island") ||
    c.includes("village") ||
    c.includes("shopping") ||
    c.includes("art")
  ) return "Nature";

  // fallback
  return "Other";
}
