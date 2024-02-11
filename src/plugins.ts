import { DevBeePlugin } from "./types";
import { exec } from "child_process";

export const prismaPlugin = (opts?: { schemaPath: string }) => {
  const debBeePlugin: DevBeePlugin = {
    name: "Prisma Plugin",
    bees: [
      {
        buzz: async () => {
          console.log("Prisma Schema Change, running prisma generate");
          // use exec to run prisma generate
          exec("npx prisma generate");
        },
        paths: opts?.schemaPath || "./prisma/schema.prisma",
        name: "Prisma Schema Change",
      },
    ],
  };
  return debBeePlugin;
};
