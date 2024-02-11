import { z } from "zod";

export type DevBeePlugin = {};

export const BeeSchema = z.object({
  buzz: z.function(
    z.tuple([
      z.object({
        path: z.string(),
        contents: z.string(),
      }),
    ])
  ),
  paths: z.union([z.string(), z.array(z.string())]),
  name: z.string().optional(),
});

export type Bee = z.infer<typeof BeeSchema>;

export const DevBeeConfigSchema = z.object({
  plugins: z.array(z.object({})).optional(),
  bees: z.array(BeeSchema).optional(),
});

export type DevBeeConfig = z.infer<typeof DevBeeConfigSchema>;
