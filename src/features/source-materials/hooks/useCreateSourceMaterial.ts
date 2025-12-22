import type { TablesInsert } from "@/types";
import { SourceMaterial } from "@source-materials";
import { createSourceMaterial } from "../services/createSourceMaterial";
import { useMutation } from "@tanstack/react-query";

/**
 * Hook to create source material.
 */
export function useCreateSourceMaterial() {
  return useMutation<
    SourceMaterial, Error, TablesInsert<"source_materials">
  >({
    mutationFn: createSourceMaterial
  });
}
