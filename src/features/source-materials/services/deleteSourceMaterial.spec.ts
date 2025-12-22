import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { deleteSourceMaterial } from "./deleteSourceMaterial";
import { SourceMaterial } from "@source-materials";
import { factory } from "@/test"

describe("deleteSourceMaterial", () => {
  const row = factory.build("sourceMaterial");
  const sourceMaterial = new SourceMaterial(row);

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("makes a put request with the correct payload", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({ ok: true });

    await deleteSourceMaterial(sourceMaterial);

    expect(fetch).toHaveBeenCalledWith(
      `/api/source-materials/${sourceMaterial.id}`,
      { method: "DELETE" }
    );
  });

  it("returns the deleted instance", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({ ok: true });

    const result = await deleteSourceMaterial(sourceMaterial);

    expect(result).toBe(sourceMaterial);
  });

  it("throws an error when the response is not ok", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "bad request" }),
    });

    await expect(deleteSourceMaterial(sourceMaterial)).rejects.toThrow(
      `Failed to create source material: bad request`
    );
  });
});
