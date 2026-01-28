import { SourceMaterial } from "@source-materials";
import { updateSourceMaterial } from "../services/updateSourceMaterial";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook to update source material.
 */
export function useUpdateSourceMaterial() {
  return useMutation<SourceMaterial, Error, SourceMaterial>({
    mutationFn: updateSourceMaterial,
  });
}
