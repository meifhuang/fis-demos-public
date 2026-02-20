// @vitest-environment node

import { vi, describe, it, expect, beforeEach, afterEach, Mock } from "vitest";
import { getLessonList } from "./getLessonList";
import { LessonRow, Lesson } from "../models/Lesson";
import { factory } from "@/test";

describe("getLessonList", () => {
  const mockRows: LessonRow[] = [
    factory.build("lesson", { id: crypto.randomUUID() }),
    factory.build("lesson", { id: crypto.randomUUID() }),
  ];

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches lesson and returns lesson instances", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRows,
    });

    const result = await getLessonList();
    expect(fetch).toHaveBeenCalledWith("/api/lessons");
    expect(result).toHaveLength(mockRows.length);
    result.forEach((item, index) => {
      expect(item).toBeInstanceOf(Lesson);
      expect(item.id).toBe(mockRows[index].id);
    });
  });

  it("throws an error when the fetch response is not ok", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: false,
    });
    await expect(getLessonList()).rejects.toThrow(
      "Failed to fetch lesson list",
    );
  });
});
