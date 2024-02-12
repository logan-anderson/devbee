import { describe, it, expect, vi, beforeEach } from "vitest";
import { FileWatcher } from "./fileWatcher";
import { DevBeeConfig } from ".";

const mockOnFunction = vi.fn();
const mockCloseFunction = vi.fn();

vi.mock("chokidar", () => {
  const defaultMock = {
    watch: () => {
      return {
        on: mockOnFunction,
        close: mockCloseFunction,
      };
    },
  };
  return {
    default: defaultMock,
  };
});

const baseConfig: DevBeeConfig = {
  bees: [
    {
      buzz: () => {
        console.log("Buzzing on ts");
      },
      paths: "./**/*.ts",
    },
    {
      buzz: () => {
        console.log("Buzzing on ts");
      },
      paths: "./**/*.ts",
    },
    {
      buzz: () => {
        console.log("Buzzing on ts");
      },
      paths: "./**/*.ts",
    },
  ],
};

describe("FileWatcher", () => {
  beforeEach(() => {
    mockOnFunction.mockClear();
    mockCloseFunction.mockClear();
  });
  describe("reset", () => {
    it("should be able to reset the config", () => {
      const watcher = new FileWatcher({});
      watcher.reset(baseConfig);
      expect(watcher.config).toMatchObject(baseConfig);
      expect(mockCloseFunction).toHaveBeenCalledTimes(0);
      watcher.reset({ bees: [] });
      expect(watcher.config).toMatchObject({ bees: [] });
      expect(mockCloseFunction).toHaveBeenCalledTimes(3);
      expect(watcher.config).toMatchObject({ bees: [] });
    });
    it("should be able to reset and watch", () => {
      const watcher = new FileWatcher(baseConfig);
      watcher.reset({ bees: [] });
      expect(watcher.config).toMatchObject({ bees: [] });
    });
  });
  describe("watch", () => {
    it("should be able to reset the config", () => {
      const watcher = new FileWatcher(baseConfig);
      watcher.reset({ bees: [] });
      expect(watcher.config).toMatchObject({ bees: [] });
    });
    it("should be able to watch", () => {
      const watcher = new FileWatcher(baseConfig);
      watcher.watch();
      expect(mockOnFunction).toHaveBeenCalledTimes(
        baseConfig?.bees?.length || 0
      );
    });
    it("should be able to reset and watch", () => {
      const watcher = new FileWatcher(baseConfig);
      watcher.reset({ bees: [] });
      expect(watcher.config).toMatchObject({ bees: [] });
      watcher.watch();
      expect(mockOnFunction).toHaveBeenCalledTimes(0);
    });
    it("should be able to reset and watch with new config", () => {
      const watcher = new FileWatcher({});
      watcher.reset({ bees: [] });
      expect(watcher.config).toMatchObject({ bees: [] });
      expect(mockCloseFunction).toHaveBeenCalledTimes(0);
      watcher.reset(baseConfig);
      expect(watcher.config).toMatchObject(baseConfig);
      expect(mockOnFunction).toHaveBeenCalledTimes(
        baseConfig?.bees?.length || 0
      );
    });
  });
});
