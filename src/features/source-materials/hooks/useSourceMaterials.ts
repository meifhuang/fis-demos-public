import { getSourceMaterials } from "../services/getSourceMaterials";
import { SourceMaterial } from "@source-materials";
import { useQuery } from "@tanstack/react-query";

/**
 * Hook to fetch source materials.
 */
export function useSourceMaterials(
  { retry = true }: { retry?: boolean } = {}
) {
  return useQuery<SourceMaterial[], Error>({
    retry,
    queryFn: getSourceMaterials,
    queryKey: ["sourceMaterials"],
  });
}
