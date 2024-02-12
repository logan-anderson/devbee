import * as esbuild from "esbuild";
import path from "path";
import os from "os";
import fs from "fs";
import { FileWatcher } from "../fileWatcher";
import { DevBeeConfigSchema } from "../types";

export const buildAndWatchDevBee = async (watcher: FileWatcher) => {
  // Create a temporary directory to store the build output
  const tmpdir = path.join(os.tmpdir(), Date.now().toString());
  const outfile = path.join(tmpdir, "devbee.build.js");
  const ctx = await esbuild.context({
    entryPoints: ["devbee.config.ts"],
    bundle: true,
    platform: "node",
    outfile: outfile,
    plugins: [
      {
        name: "esbuild-plugin-rebuild",
        setup(build) {
          build.onEnd(async (opts) => {
            const requireRes = require(outfile).default;
            // see https://stackoverflow.com/questions/9210542/node-js-require-cache-possible-to-invalidate
            delete require.cache[require.resolve(outfile)];
            const maybeConfig =
              typeof requireRes === "function" ? requireRes() : requireRes;
            const config = DevBeeConfigSchema.strict().parse(maybeConfig);
            watcher.reset(config);
            const bees = config.bees?.length || 0;
            console.log(`🐝 Devbee setup with ${bees} busy bees 🐝`);
          });
        },
      },
    ],
  });
  await ctx.watch();
  console.log("Watching for changes in devbee.config.ts...");
};
