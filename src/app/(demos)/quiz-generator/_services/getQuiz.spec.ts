import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { getQuiz } from "./";
import { factory } from "@/test"
import { QuizRow } from "@/types";
import { Quiz } from "../_models";

describe("getQuiz", () => {
  const mockId = crypto.randomUUID();
  const mockRow: QuizRow = factory.build("quiz", { id: mockId });

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches course outline and returns a Quiz instance", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRow,
    });

    const result = await getQuiz(mockId);

    expect(fetch).toHaveBeenCalledWith(`/api/quizzes/${mockId}`);
    expect(result).toBeInstanceOf(Quiz);
    expect(result.id).toBe(mockId);
  });

  it("throws an error when the fetch response is not ok", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getQuiz(mockId)).rejects.toThrow(
      `Failed to fetch quiz '${mockId}'`
    );
  });
});
