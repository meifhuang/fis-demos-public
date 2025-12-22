import type { Tables, TablesUpdate } from "@/types";
import { SourceMaterial } from "@source-materials";

export async function updateSourceMaterial(sourceMaterial: SourceMaterial) {
  const response = await fetch(`/api/source-materials/${sourceMaterial.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(
      {
        markdown: sourceMaterial.markdown,
        title: sourceMaterial.title,
      } as TablesUpdate<"source_materials">
    ),
  });

  if (!response.ok) {
    const { error }: { error: string } = await response.json();
    throw new Error(`Failed to create source material: ${error}`);
  }

  const row: Tables<"source_materials"> = await response.json();
  return new SourceMaterial(row);
};
