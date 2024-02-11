import { DevBeeConfig } from "../src/types";

const config: DevBeeConfig = {
  bees: [
    {
      buzz: () => console.log("Buzzing on all paths"),
      paths: "./",
      name: "Buzz All",
    },
    {
      buzz: () => {
        console.log("Buzzing on ts");
        // maybe do a JS build
      },
      paths: "./**/*.ts",
      name: "Buzz on ts",
    },
    {
      name: "Zod Bee",
      paths: "./**/*.zod.ts",
      buzz: ({ contents, path }) => {
        console.log(`Buzzing on ${path}`);
        console.log(contents);
      },
    },
  ],
};

export default config;
