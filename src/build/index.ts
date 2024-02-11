import * as esbuild from "esbuild";
import path from "path";
import os from "os";
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
          build.onEnd((opts) => {
            const requireRes = require(outfile).default;
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
