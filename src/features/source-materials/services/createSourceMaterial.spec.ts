import { describe, it, expect, vi, beforeEach, afterEach, Mock } from "vitest";
import { createSourceMaterial } from "./createSourceMaterial";
import { SourceMaterial } from "@source-materials";
import { factory } from "@/test";

describe("createSourceMaterial", () => {
  const row = factory.build("sourceMaterial");
  const payload = { markdown: row.markdown, title: row.title };

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("makes a post request with the correct payload", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => row,
    });

    await createSourceMaterial(payload);

    expect(fetch).toHaveBeenCalledWith(`/api/source-materials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  });

  it("returns a new instance from the response data", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ ...row }),
    });

    const result = await createSourceMaterial(payload);

    expect(result).toBeInstanceOf(SourceMaterial);
    expect(result.id).toBe(row.id);
  });

  it("throws an error when the response is not ok", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ error: "bad request" }),
    });

    await expect(createSourceMaterial(payload)).rejects.toThrow(
      `Failed to create source material: bad request`,
    );
  });
});
