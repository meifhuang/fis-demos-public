import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { getLesson } from "./getLesson";
import { LessonRow, Lesson } from "../models/Lesson";
import { factory } from "@/test";

describe("getLesson", () => {
  const mockId = crypto.randomUUID();
  const mockRow: LessonRow = factory.build("lesson", {
    id: mockId,
  });

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches lesson and returns a Lesson instance", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRow,
    });

    const result = await getLesson(mockId);

    expect(fetch).toHaveBeenCalledWith(`/api/lessons/${mockId}`);
    expect(result).toBeInstanceOf(Lesson);
    expect(result.id).toBe(mockId);
  });

  it("throws an error when the fetch response is not ok", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getLesson(mockId)).rejects.toThrow(
      `Failed to fetch lesson '${mockId}'`,
    );
  });
});
