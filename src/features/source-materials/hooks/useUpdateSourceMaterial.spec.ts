import * as services from "../services/updateSourceMaterial";
import { QueryProvider } from "@/providers/QueryProvider";
import { SourceMaterial } from "@source-materials";
import { describe, it, expect, vi } from "vitest";
import { factory } from "@/test";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useUpdateSourceMaterial } from "@source-materials";

describe("useUpdateSourceMaterial", () => {
  const sourceMaterialBefore = new SourceMaterial(
    factory.build("sourceMaterial"),
  );
  const sourceMaterialAfter = sourceMaterialBefore.with("title", "Updated");

  it("creates source materials successfully", async () => {
    const spy = vi
      .spyOn(services, "updateSourceMaterial")
      .mockResolvedValue(sourceMaterialAfter);

    const { result } = renderHook(() => useUpdateSourceMaterial(), {
      wrapper: QueryProvider,
    });

    act(() => {
      result.current.mutate(sourceMaterialBefore);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(sourceMaterialAfter);
    expect(spy.mock.calls[0][0]).toEqual(sourceMaterialBefore);

    spy.mockRestore();
  });

  it("handles errors correctly", async () => {
    const error = new Error("Network error");
    const spy = vi
      .spyOn(services, "updateSourceMaterial")
      .mockRejectedValue(error);

    const { result } = renderHook(() => useUpdateSourceMaterial(), {
      wrapper: QueryProvider,
    });

    act(() => {
      result.current.mutate(sourceMaterialBefore);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(error);

    spy.mockRestore();
  });
});
