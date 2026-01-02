import { BaseListRecord } from "../list";

export interface SourceMaterial extends BaseListRecord {
  title: string;
  content: string;
}

export type SourceMaterialForm = 
    | {type: "source", id: string, content: string | undefined}
    | {type: "custom", id: undefined, content: string}
    | undefined;
