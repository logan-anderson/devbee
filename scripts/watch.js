import * as esbuild from "esbuild";

import { esbuildConfig } from "./esbuildConfig.js";

const ctx = await esbuild.context({
  ...esbuildConfig,
  format: "cjs",
  outExtension: {
    ".js": ".cjs",
  },
});

await ctx.watch();

console.log("Watching for changes...");
