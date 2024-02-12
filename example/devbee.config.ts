import { DevBeeConfig } from "../src/types";
import fs from "fs/promises";

const config: DevBeeConfig = {
  bees: [
    {
      ignored: ["foo.tsx", "src/types.ts"],
      buzz: ({ contents, path }) => {
        console.log(`Buzzing on ${path}`);
        if (
          contents.includes("useState") &&
          !contents.includes('"use client"')
        ) {
          console.log(`Found useState in ${path}`);
          fs.writeFile(path, `"use client"\n${contents}`, "utf-8");
        }
      },
      paths: "./**/*.tsx",
      name: "Add use client if client code is used",
    },
    // {
    //   buzz: () => console.log("Buzzing on all paths"),
    //   paths: "./",
    //   name: "Buzz All",
    // },
    // {
    //   buzz: () => {
    //     console.log("Buzzing on ts");
    //     // maybe do a JS build
    //   },
    //   paths: "./**/*.ts",
    //   name: "Buzz on ts",
    // },
    // {
    //   name: "Zod Bee",
    //   paths: "./**/*.zod.ts",
    //   buzz: ({ contents, path }) => {
    //     console.log(`Buzzing on ${path}`);
    //     console.log(contents);
    //   },
    // },
  ],
};

export default config;
