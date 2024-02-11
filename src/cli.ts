import { Command, Cli } from "clipanion";
import p from "../package.json";
import { buildAndWatchDevBee } from "./build";
import { FileWatcher } from "./fileWatcher";

class HelloCommand extends Command {
  static paths = [["watch"]];
  static usage = {
    description: "Watch for changes and rebuild devbee.config.ts changes.",
  };

  private watcher: FileWatcher;

  async execute() {
    this.watcher = new FileWatcher({});
    await buildAndWatchDevBee(this.watcher);
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
