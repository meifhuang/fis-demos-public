import type { Tables } from "@/types";
import { SourceMaterial } from "@source-materials";

export async function getSourceMaterials() {
  const response = await fetch("/api/source-materials");
  if (!response.ok) throw new Error("Failed to fetch source materials");

  const rows: Tables<"source_materials">[] = await response.json();
  return rows.map((row) => new SourceMaterial(row));
}
