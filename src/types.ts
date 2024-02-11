import { z } from "zod";

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

export const DevBeePluginSchema = z.object({
  name: z.string(),
  setup: z.function(z.tuple([])).optional(),
  bees: z.array(BeeSchema),
});
export type DevBeePlugin = {
  name: string;
  setup?: (ctx: any) => void;
  bees: Bee[];
};

export const DevBeeConfigSchema = z.object({
  plugins: z.array(DevBeePluginSchema).optional(),
  bees: z.array(BeeSchema).optional(),
});

export type DevBeeConfig = z.infer<typeof DevBeeConfigSchema>;
