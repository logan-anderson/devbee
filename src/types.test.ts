import { it, expect, describe } from "vitest";
import {
  BeeSchema,
  DevBeeConfigSchema,
  DevBeePlugin,
  DevBeePluginSchema,
} from "./types";

describe("Bee schema", () => {
  it("parse a valid schema", () => {
    const validBee = {
      buzz: () => {
        console.log("Buzzing on ts");
      },
      paths: "./**/*.ts",
    };
    expect(BeeSchema.parse(validBee)).toMatchObject({
      buzz: expect.any(Function),
      paths: "./**/*.ts",
    });
  });
  it("parse an invalid schema", () => {
    const invalidBee = {
      buzz: "not a function",
      paths: "./**/*.ts",
    };
    expect(() => BeeSchema.parse(invalidBee)).toThrow();
  });
  it("Should throw on extra keys", () => {
    const invalidBee = {
      buzz: () => {
        console.log("Buzzing on ts");
      },
      paths: "./**/*.ts",
      extra: "key",
    };
    expect(() => BeeSchema.parse(invalidBee)).toThrow();
  });
});

describe("DevBeePlugin schema", () => {
  it("parse a valid schema", () => {
    const validPlugin: DevBeePlugin = {
      name: "Prisma Plugin",
      bees: [
        {
          buzz: () => {
            console.log("Buzzing on ts");
          },
          paths: "./**/*.ts",
        },
      ],
    };
    expect(DevBeePluginSchema.parse(validPlugin)).toMatchObject({
      name: "Prisma Plugin",
      bees: [
        {
          buzz: expect.any(Function),
          paths: "./**/*.ts",
        },
      ],
    });
  });
  it("parse an invalid schema", () => {
    const invalidPlugin = {
      name: "Prisma Plugin",
      bees: [
        {
          buzz: "not a function",
          paths: "./**/*.ts",
        },
      ],
    };
    expect(() => DevBeePluginSchema.parse(invalidPlugin)).toThrow();
  });
  it("Should throw on extra keys", () => {
    const invalidPlugin = {
      name: "Prisma Plugin",
      bees: [
        {
          buzz: () => {
            console.log("Buzzing on ts");
          },
          paths: "./**/*.ts",
          extra: "key",
        },
      ],
    };
    expect(() => DevBeePluginSchema.parse(invalidPlugin)).toThrow();
  });
});

describe("DevBeeConfig schema", () => {
  it("parse a valid schema", () => {
    const validConfig = {
      bees: [
        {
          buzz: () => {
            console.log("Buzzing on ts");
          },
          paths: "./**/*.ts",
        },
      ],
    };
    expect(DevBeeConfigSchema.parse(validConfig)).toMatchObject({
      bees: [
        {
          buzz: expect.any(Function),
          paths: "./**/*.ts",
        },
      ],
    });
  });
  it("parse an invalid schema", () => {
    const invalidConfig = {
      bees: [
        {
          buzz: "not a function",
          paths: "./**/*.ts",
        },
      ],
    };
    expect(() => DevBeeConfigSchema.parse(invalidConfig)).toThrow();
  });
  it("Should throw on extra keys", () => {
    const invalidConfig = {
      bees: [
        {
          buzz: () => {
            console.log("Buzzing on ts");
          },
          paths: "./**/*.ts",
          extra: "key",
        },
      ],
    };
    expect(() => DevBeeConfigSchema.parse(invalidConfig)).toThrow();
  });
});
