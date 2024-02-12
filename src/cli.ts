import { Command, Cli } from "clipanion";
import p from "../package.json";
import { buildAndWatchDevBee } from "./build";
import { FileWatcher } from "./fileWatcher";

/**
 * The main command for the CLI. ei what happens when the users runs `devbee`
 */
class IndexCommand extends Command {
  static usage = {
    description: "Watch for changes and rebuild devbee.config.ts changes.",
  };

  private watcher: FileWatcher = new FileWatcher({});

  async execute() {
    await buildAndWatchDevBee(this.watcher);
  }
}

const [node, app, ...args] = process.argv;

const cli = new Cli({
  binaryLabel: `DevBee CLI`,
  binaryName: `${node} ${app}`,
  binaryVersion: p.version,
});

cli.register(IndexCommand);
cli.runExit(args);
