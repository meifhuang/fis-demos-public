import { vi, describe, it, expect, beforeEach, afterEach, Mock } from "vitest";
import { getSourceMaterials } from "./getSourceMaterials";
import { SourceMaterial } from "@source-materials";
import { factory } from "@/test";

describe("getSourceMaterials", () => {
  const mockRows = factory.buildList("sourceMaterial", 2);

  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("fetches all records and returns SourceMaterial instances", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRows,
    });

    const result = await getSourceMaterials();

    expect(fetch).toHaveBeenCalledWith("/api/source-materials");
    expect(result).toHaveLength(mockRows.length);
    result.forEach((item, index) => {
      expect(item).toBeInstanceOf(SourceMaterial);
      expect(item.id).toBe(mockRows[index].id);
    });
  });

  it("throws an error when the fetch response is not ok", async () => {
    (fetch as unknown as Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(getSourceMaterials()).rejects.toThrow(
      "Failed to fetch source materials",
    );
  });
});
