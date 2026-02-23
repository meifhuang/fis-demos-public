import { useLessonList } from "./useLessonList";
import * as services from "../services/getLessonList";
import { Lesson } from "../models/Lesson";
import { describe, it, expect, vi } from "vitest";
import { factory } from "@/test";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryProvider } from "@/providers/QueryProvider";

describe("useLessonList", () => {
  const rows = factory.buildList("lesson", 2);
  const lessons = rows.map((row) => new Lesson(row));

  it("fetches lessons successfully", async () => {
    const spy = vi.spyOn(services, "getLessonList").mockResolvedValue(lessons);

    const { result } = renderHook(() => useLessonList(), {
      wrapper: QueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(lessons);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });

  it("handles errors correctly", async () => {
    const error = new Error("Network error");
    const spy = vi.spyOn(services, "getLessonList").mockRejectedValue(error);

    const { result } = renderHook(() => useLessonList({ retry: false }), {
      wrapper: QueryProvider,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(error);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });
});
