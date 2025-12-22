import * as services from "../services/createSourceMaterial";
import { QueryProvider } from "@/providers/QueryProvider";
import { SourceMaterial } from "@source-materials";
import { describe, it, expect, vi } from "vitest";
import { factory } from "@/test";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useCreateSourceMaterial } from "@source-materials";

describe("useCreateSourceMaterial", () => {
  const { markdown, title } = factory.build("sourceMaterial");

  it("creates source materials successfully", async () => {
    const row = factory.build("sourceMaterial", { markdown, title });
    const sourceMaterial = new SourceMaterial(row);

    const spy = vi.spyOn(services, "createSourceMaterial").mockResolvedValue(sourceMaterial);

    const { result } = renderHook(() => useCreateSourceMaterial(), {
      wrapper: QueryProvider,
    });

    act(() => {
      result.current.mutate({ markdown, title });
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(sourceMaterial);
    expect(spy.mock.calls[0][0]).toEqual({ markdown, title })

    spy.mockRestore();
  });

  it("handles errors correctly", async () => {
    const error = new Error("Network error");
    const spy = vi.spyOn(services, "createSourceMaterial").mockRejectedValue(error);

    const { result } = renderHook(() => useCreateSourceMaterial(), {
      wrapper: QueryProvider,
    });

    act(() => {
      result.current.mutate({ markdown, title });
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(error);

    spy.mockRestore();
  });
});
