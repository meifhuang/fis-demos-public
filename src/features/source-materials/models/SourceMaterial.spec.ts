import { describe, it, expect } from "vitest";
import { SourceMaterial } from "@source-materials";
import { factory } from "@/test"

describe("SourceMaterial", () => {
  const data = factory.build("sourceMaterial");
  const sourceMaterial = new SourceMaterial(data);

  it("returns the correct id", () => {
    expect(sourceMaterial.id).toBe(data.id);
  });

  it("returns the title", () => {
    expect(sourceMaterial.title).toBe(data.title);
  });

  it("returns the markdown", () => {
    expect(sourceMaterial.markdown).toBe(data.markdown);
  });
});
