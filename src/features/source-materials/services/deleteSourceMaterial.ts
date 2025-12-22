import { SourceMaterial } from "@source-materials";

export async function deleteSourceMaterial(sourceMaterial: SourceMaterial) {
  const response = await fetch(`/api/source-materials/${sourceMaterial.id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    const { error }: { error: string } = await response.json();
    throw new Error(`Failed to create source material: ${error}`);
  }

  return sourceMaterial;
};
