import type { Tables, TablesInsert } from "@/types";
import { SourceMaterial } from "@source-materials";

export async function createSourceMaterial(
  payload: TablesInsert<"source_materials">,
) {
  const response = await fetch("/api/source-materials", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const { error }: { error: string } = await response.json();
    throw new Error(`Failed to create source material: ${error}`);
  }

  const row: Tables<"source_materials"> = await response.json();
  return new SourceMaterial(row);
}
