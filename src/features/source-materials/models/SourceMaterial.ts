import type { Tables } from "@/types";

export class SourceMaterial {
  constructor(private data: Tables<"source_materials">) {}

  with(name: "title" | "markdown", value: string): SourceMaterial {
    return new SourceMaterial({ ...this.data, [name]: value });
  }

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
