import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { updateSourceMaterial } from "./updateSourceMaterial";
import { SourceMaterial } from "@source-materials";
import { factory } from "@/test";

describe("updateSourceMaterial", () => {
  const row = factory.build("sourceMaterial");
  const sourceMaterial = new SourceMaterial(row);

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("makes a put request with the correct payload", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => row,
    });

    await updateSourceMaterial(sourceMaterial);

    expect(fetch).toHaveBeenCalledWith(
      `/api/source-materials/${sourceMaterial.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          markdown: sourceMaterial.markdown,
          title: sourceMaterial.title,
        }),
      },
    );
  });

  it("returns a new instance from the response data", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...row, title: "Updated Title" }),
    });

    const result = await updateSourceMaterial(sourceMaterial);

    expect(result).toBeInstanceOf(SourceMaterial);
    expect(result).not.toBe(sourceMaterial);
    expect(result.id).toBe(row.id);
    expect(result.title).toBe("Updated Title");
  });

  it("throws an error when the response is not ok", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "bad request" }),
    });

    await expect(updateSourceMaterial(sourceMaterial)).rejects.toThrow(
      `Failed to create source material: bad request`,
    );
  });
});
