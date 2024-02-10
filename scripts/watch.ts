import * as esbuild from "esbuild";

import { esbuildConfig } from "./esbuildConfig.js";

const ctx = await esbuild.context({
  ...esbuildConfig,
  // CLI STUFF
  format: "cjs",
  platform: "node",
  outExtension: {
    ".js": ".cjs",
  },
});

await ctx.watch();

console.log("Watching for changes...");
