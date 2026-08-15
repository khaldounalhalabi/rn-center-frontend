import { build, context } from "esbuild";
import { config } from "dotenv";
import { readdirSync } from "node:fs";
import { join, basename, extname } from "node:path";

// Mimic Next.js's env-file precedence
config({ path: ".env" });
config({ path: ".env.local", override: true });
if (process.env.NODE_ENV === "production") {
  config({ path: ".env.production", override: true });
  config({ path: ".env.production.local", override: true });
}

// IMPORTANT: only expose NEXT_PUBLIC_* vars here — this file is public and
// gets served straight to the browser, same rule as any client bundle.
const define = {};
for (const [key, value] of Object.entries(process.env)) {
  if (key.startsWith("NEXT_PUBLIC_")) {
    define[`process.env.${key}`] = JSON.stringify(value);
  }
}

const WORKERS_DIR = "src/workers";

// Grab every .ts file directly inside workers/ (not subfolders)
const entryPoints = readdirSync(WORKERS_DIR)
  .filter((file) => extname(file) === ".ts")
  .map((file) => join(WORKERS_DIR, file));

if (entryPoints.length === 0) {
  console.warn(`⚠️  No .ts files found in ${WORKERS_DIR}/`);
}

const isWatch = process.argv.includes("--watch");

const options = {
  entryPoints,
  outdir: "public",
  entryNames: "[name]", // strips the workers/ path, keeps filename, esbuild adds .js
  bundle: true,
  platform: "browser",
  target: "es2020",
  format: "iife",
  minify: process.env.NODE_ENV === "production",
  define,
  logLevel: "info",
};

if (isWatch) {
  const ctx = await context(options);
  await ctx.watch();
  console.log(`👀 watching ${WORKERS_DIR}/*.ts for changes...`);
} else {
  await build(options);
  console.log(`✅ compiled ${entryPoints.length} worker(s) to public/`);
  entryPoints.forEach((e) => console.log(`   ${e} → public/${basename(e, ".ts")}.js`));
}