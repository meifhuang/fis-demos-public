import type { Tables } from "@/types";

export class SourceMaterial {
  constructor(private data: Tables<"source_materials">) {}

  get id() {
    return this.data.id;
  }

  get title() {
    return this.data.title;
  }

  get markdown() {
    return this.data.markdown;
  }
}
