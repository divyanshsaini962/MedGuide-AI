import { fileURLToPath } from "url";
import path from "path";
import { buildIndex } from "./services/ragService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    const dataDir = path.join(__dirname, "data");
    await buildIndex(dataDir);
    console.log("✅ All done indexing!");
    process.exit(0);
  } catch (err) {
    console.error("Indexing failed:", err);
    process.exit(1);
  }
})();
