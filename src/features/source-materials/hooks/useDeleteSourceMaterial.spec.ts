import * as services from "../services/deleteSourceMaterial";
import { QueryProvider } from "@/providers/QueryProvider";
import { SourceMaterial } from "@source-materials";
import { describe, it, expect, vi } from "vitest";
import { factory } from "@/test";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useDeleteSourceMaterial } from "@source-materials";

describe("useDeleteSourceMaterial", () => {
  const sourceMaterial = new SourceMaterial(factory.build("sourceMaterial"));

  it("creates source materials successfully", async () => {
    const spy = vi.spyOn(services, "deleteSourceMaterial").mockResolvedValue(sourceMaterial);

    const { result } = renderHook(() => useDeleteSourceMaterial(), {
      wrapper: QueryProvider,
    });

    act(() => {
      result.current.mutate(sourceMaterial);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(sourceMaterial);
    expect(spy.mock.calls[0][0]).toEqual(sourceMaterial)

    spy.mockRestore();
  });

  it("handles errors correctly", async () => {
    const error = new Error("Network error");
    const spy = vi.spyOn(services, "deleteSourceMaterial").mockRejectedValue(error);

    const { result } = renderHook(() => useDeleteSourceMaterial(), {
      wrapper: QueryProvider,
    });

    act(() => {
      result.current.mutate(sourceMaterial);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(error);

    spy.mockRestore();
  });
});
