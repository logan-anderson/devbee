import { DevBeeConfig } from "../src/types";

const config: DevBeeConfig = {
  bees: [
    {
      buzz: () => console.log("Buzzing on all paths"),
      paths: "./",
      name: "Buzz All",
    },
    {
      buzz: () => console.log("Buzzing on all ts files"),
      paths: "./**/*.ts",
      name: "Buzz on ts",
    },
  ],
};

export default config;
