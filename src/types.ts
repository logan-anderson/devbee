import { z } from "zod";

export const BeeSchema = z
  .object({
    ignored: z.array(z.string()).optional(),
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
  })
  .strict();

export type Bee = z.infer<typeof BeeSchema>;

export const DevBeePluginSchema = z
  .object({
    name: z.string(),
    setup: z.function(z.tuple([])).optional(),
    bees: z.array(BeeSchema),
  })
  .strict();

export type DevBeePlugin = z.infer<typeof DevBeePluginSchema>;

export const DevBeeConfigSchema = z
  .object({
    plugins: z.array(DevBeePluginSchema).optional(),
    bees: z.array(BeeSchema).optional(),
    ignored: z.array(z.string()).optional(),
  })
  .strict();

export type DevBeeConfig = z.infer<typeof DevBeeConfigSchema>;
