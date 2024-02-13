import * as esbuild from "esbuild";
import { esbuildConfig } from "./esbuildConfig.js";

await esbuild.build({
  ...esbuildConfig,
  format: "esm",
  outExtension: {
    ".js": ".mjs",
  },
});
await esbuild.build({
  ...esbuildConfig,
  format: "cjs",
  outExtension: {
    ".js": ".cjs",
  },
});
