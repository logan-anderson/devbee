// import type { BuildOptions } from "esbuild";

import { BuildOptions } from "esbuild";

/**
 * @type {import('esbuild').BuildOptions}
 */
export const esbuildConfig: BuildOptions = {
  entryPoints: ["src/cli.ts", "src/index.ts", "src/plugins.ts"],
  bundle: true,
  outdir: "dist",
  sourcemap: true,
  minify: true,
  format: "esm",
  platform: "node",
  packages: "external",
  banner: {
    // js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);",
  },
  // external: ["esbuild", "./.devbee/devbee.js"],
};
