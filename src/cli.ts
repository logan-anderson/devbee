import { Command, Cli } from "clipanion";
import p from "../package.json";
import * as esbuild from "esbuild";
import path from "path";
import os from "os";
import { FileWatcher } from "./fileWatcher";
import { DevBeeConfig, DevBeeConfigSchema } from "./types";

class HelloCommand extends Command {
  static paths = [["watch"]];

  async execute() {
    const tmpdir = path.join(os.tmpdir(), Date.now().toString());
    const outfile = path.join(tmpdir, "devbee.build.js");
    await esbuild.build({
      entryPoints: ["devbee.config.ts"],
      bundle: true,
      platform: "node",
      outfile: outfile,
      //   loader: loaders,
    });
    // await esbuild.build({
    //   entryPoints: ["devbee.config.ts"],
    //   bundle: true,
    //   target: ["es2020"],
    //   platform: "browser",
    //   format: "esm",
    //   logLevel: "silent",
    //   packages: "external",
    //   ignoreAnnotations: true,
    //   //   outfile: prebuild,
    //   //   loader: loaders,
    //   metafile: true,
    //   outfile,
    // });
    // const tmpdir = path.join(os.tmpdir(), Date.now().toString());
    console.log({ outfile });
    const requireRes = require(outfile).default;
    const maybeConfig =
      typeof requireRes === "function" ? requireRes() : requireRes;
    console.log({ maybeConfig });
    const config = DevBeeConfigSchema.strict().parse(maybeConfig);
    console.log({ config });
    const watcher = new FileWatcher(config);
    console.log("Watching...");
    watcher.watch();
  }
}

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: `DevBee CLI`,
  binaryName: `${node} ${app}`,
  binaryVersion: p.version,
});

cli.register(HelloCommand);
cli.runExit(args);
