import { useGetLesson } from "./useGetLesson";
import * as services from "../services/getLesson";
import { Lesson, LessonRow } from "../models/Lesson";
import { describe, it, expect, vi } from "vitest";
import { factory } from "@/test";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryProvider } from "@/providers/QueryProvider";

describe("useLesson", () => {
  const mockId = crypto.randomUUID();
  const lessonRow: LessonRow = factory.build("lesson", { id: mockId });
  const lesson = new Lesson(lessonRow);

  it("fetches a lesson successfully", async () => {
    const spy = vi.spyOn(services, "getLesson").mockResolvedValue(lesson);

    const { result } = renderHook(() => useGetLesson(mockId, {}), {
      wrapper: QueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(lesson);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });

  it("handles errors correctly", async () => {
    const error = new Error("Network error");
    const spy = vi.spyOn(services, "getLesson").mockRejectedValue(error);

    const { result } = renderHook(
      () => useGetLesson(mockId, { retry: false }),
      {
        wrapper: QueryProvider,
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(error);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });
});
