# :honeybee: DevBee ::honeybee:

> Simplify generated code and automated tasks.

## What is DevBee?

DevBee is a powerful devtool designed to streamline your development workflow. Imagine having a team of worker bees that handle repetitive tasks for you! With DevBee, you can run custom functions whenever a file changes, automating processes like adding copyright headers, autogenerating types, and more. The possibilities are endless. Plus, DevBee supports [plugins](./PLUGIN.md), allowing you to share your bees with fellow developers

## Getting Started

### Installation

Install DevBee using your preferred package manager:

```bash
npm install devbee      # npm
yarn add devbee         # yarn
bun add devbee          # bun
pnpm add devbee         # pnpm
```

### Configuration

Create a `devbee.config.ts` file in your project’s root directory. Add the following content:

```ts
import type { DevBeeConfig } from "devbee";

import fs from "fs/promises";

const COPYRIGHT_HEADER = `/**
* Copyright (c) Test
*/`;

const config: DevBeeConfig = {
  plugins: [
    // Add your plugins here
  ],
  bees: [
    // Define your bees (tasks to run on file change)
    {
      paths: "./**/*.ts",
      name: "Add Copyright Header",
      // Function that runs on each file change
      buzz: async ({ contents, path }) => {
        if (contents.startsWith(`/**`)) return;
        await fs.writeFile(path, `${COPYRIGHT_HEADER}\n${contents}`, "utf-8");
      },
    },
  ],
};

export default config;
```

### Thats it!

:tada: You’re all set! DevBee empowers you to automate mundane tasks, leaving you more time to focus on what matters—building great software.

## :honey_pot: DevBee API :honey_pot:

```ts
type DevBeeConfig = {
  // Explore Plugin Docs for more info
  plugins: DevBeePlugin[];
  // An array of bees (tasks to run on file change)
  bees: Bee[];
};
// Think of a bee as something you create once; it performs the same task repeatedly whenever a file changes.

type Bee = {
  // Paths to watch for changes (can be a glob pattern)
  paths: string | string[];
  // Name of the plugin
  name: string;
  // Async function that runs on each file change
  buzz: (params: { contents: string; path: string }) => Promise<void>;
};
```

- `paths` (string or array of strings). Paths to files, dirs to be watched recursively, or glob patterns.
  - globs must not contain windows separators (\\). You'll need to replace them with forward slashes (/).
  - for additional glob documentation, check out picomatch's [documentation](https://github.com/micromatch/picomatch).

#### `buzz` Arguments

`contents`: The contents of the file that was changed.
`path`: The path of the file that was changed.
