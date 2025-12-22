import { SourceMaterial } from "@source-materials";
import { deleteSourceMaterial } from "../services/deleteSourceMaterial";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook to delete source material.
 */
export function useDeleteSourceMaterial() {
  return useMutation<
    SourceMaterial, Error, SourceMaterial
  >({
    mutationFn: deleteSourceMaterial
  });
}
