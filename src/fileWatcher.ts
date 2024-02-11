import chokidar from "chokidar";
import type { FSWatcher } from "chokidar";
import { DevBeeConfig } from "./types";
import fs from "fs/promises";

export class FileWatcher {
  private _config: DevBeeConfig;
  watchers: FSWatcher[] = [];
  constructor(config: DevBeeConfig) {
    this.config = config;
  }
  set config(config: DevBeeConfig) {
    this._config = config;
  }
  get config() {
    return this._config;
  }
  public reset(newConfig: DevBeeConfig) {
    this.config = newConfig;
    this.watchers.forEach((watcher) => watcher.close());
    this.watchers = [];
    this.watch();
  }
  public watch() {
    this.config.bees?.forEach((bee) => {
      const watcher = chokidar.watch(bee.paths, {
        ignored: "devbee.config.{js,ts,tsx}",
      });
      watcher.on("change", async (path) => {
        console.log(`🐝 ${bee?.name || ""} 🐝`);
        const contents = await fs.readFile(path, "utf-8");
        bee.buzz({
          contents,
          path,
        });
      });
      this.watchers.push(watcher);
    });

    // for (const key in this.opts) {
    //   const { func, paths, label } = this.opts[key];
    //   const watcher = chokidar.watch(paths);
    //   watcher.on("change", () => {
    //     console.log(`Running ${label || key}...`);
    //     func();
    //   });
    //   watchers.push(watcher);
    // }
  }
}
