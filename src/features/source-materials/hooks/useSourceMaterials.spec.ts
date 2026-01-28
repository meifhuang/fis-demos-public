import * as services from "../services/getSourceMaterials";
import { QueryProvider } from "@/providers/QueryProvider";
import { SourceMaterial } from "@source-materials";
import { describe, it, expect, vi } from "vitest";
import { factory } from "@/test";
import { renderHook, waitFor } from "@testing-library/react";
import { useSourceMaterials } from "@source-materials";

describe("useSourceMaterials", () => {
  const rows = factory.buildList("sourceMaterial", 2);
  const sourceMaterials = rows.map((row) => new SourceMaterial(row));

  it("fetches source materials successfully", async () => {
    const spy = vi
      .spyOn(services, "getSourceMaterials")
      .mockResolvedValue(sourceMaterials);
    const { result } = renderHook(() => useSourceMaterials(), {
      wrapper: QueryProvider,
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(sourceMaterials);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });

  it("handles errors correctly", async () => {
    const error = new Error("Network error");
    const spy = vi
      .spyOn(services, "getSourceMaterials")
      .mockRejectedValue(error);

    const { result } = renderHook(() => useSourceMaterials({ retry: false }), {
      wrapper: QueryProvider,
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBe(error);
    expect(spy).toHaveBeenCalledOnce();

    spy.mockRestore();
  });
});
