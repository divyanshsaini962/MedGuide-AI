// services/pineconeService.js
import "dotenv/config";
import { Pinecone } from "@pinecone-database/pinecone";

const REQUIRED = ["PINECONE_API_KEY"];
for (const k of REQUIRED) {
  if (!process.env[k]) throw new Error(`Missing ${k}`);
}

const pc = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });

const INDEX_NAME = process.env.PINECONE_INDEX || "medical-bot";
const CLOUD = process.env.PINECONE_CLOUD || "aws"; // "aws" | "gcp"
const REGION = process.env.PINECONE_REGION || "us-east-1";
const DIMENSION = Number(process.env.PINECONE_DIM || "768"); // 768 for text-embedding-004

export async function getIndex() {
  // listIndexes() -> { indexes: IndexModel[] }
  const { indexes = [] } = await pc.listIndexes();
  const existing = indexes.find((ix) => ix.name === INDEX_NAME);

  if (!existing) {
    await pc.createIndex({
      name: INDEX_NAME,
      dimension: DIMENSION,
      metric: "cosine",
      spec: { serverless: { cloud: CLOUD, region: REGION } },
      waitUntilReady: true,
      suppressConflicts: true,
    }); // Create + wait. :contentReference[oaicite:3]{index=3}
  } else {
    // sanity check: dimension matches what you're about to upsert
    if (existing.dimension && Number(existing.dimension) !== DIMENSION) {
      console.warn(
        `[pinecone] WARNING: Existing index "${INDEX_NAME}" has dimension ${existing.dimension}, but PINECONE_DIM is ${DIMENSION}.`
      );
    }
    // If not ready yet, poll until ready. :contentReference[oaicite:4]{index=4}
    if (!existing?.status?.ready) {
      let tries = 0;
      while (tries++ < 60) {
        const desc = await pc.describeIndex(INDEX_NAME);
        if (desc?.status?.ready) break;
        await new Promise((r) => setTimeout(r, 2000));
      }
    }
  }
  return pc.index(INDEX_NAME);
}
