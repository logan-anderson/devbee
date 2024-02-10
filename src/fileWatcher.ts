import chokidar from "chokidar";
import type { FSWatcher } from "chokidar";
import { DevBeeConfig } from "./types";

export class FileWatcher {
  opts: DevBeeConfig;
  constructor(opts: DevBeeConfig) {
    this.opts = opts;
  }
  public watch() {
    const watchers: FSWatcher[] = [];
    this.opts.bees?.forEach((bee) => {
      const watcher = chokidar.watch(bee.paths);
      watcher.on("change", () => {
        console.log(`Buzz ${bee?.name || ""}...`);
        bee.buzz();
      });
      watchers.push(watcher);
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
