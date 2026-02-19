import type { Database } from "@/types/database";
import { LearnerProfile, LearnerProfileRow } from "@/lib/learner-profiles";
import { SourceMaterial, SourceMaterialRow } from "@/features/source-materials";

export type LessonRow = Database["public"]["Tables"]["lessons"]["Row"];

interface CreationMeta {
  learner_profile?: LearnerProfileRow;
  source_material?: SourceMaterialRow;
  [key: string]: unknown;
}

export class Lesson {
  constructor(private data: LessonRow) {}

  with(name: "title" | "content", value: string): Lesson {
    return new Lesson({ ...this.data, [name]: value });
  }

  get id() {
    return this.data.id;
  }

  get creationMeta(): CreationMeta {
    return (this.data.creation_meta ?? {}) as CreationMeta;
  }

  get learnerProfile(): LearnerProfile | null {
    const profileData = this.creationMeta.learner_profile;
    if (!profileData) return null;

    return new LearnerProfile(profileData);
  }

  get sourceMaterial(): SourceMaterial | null {
    const sourceMaterialData = this.creationMeta.source_material;
    if (!sourceMaterialData) return null;

    return new SourceMaterial(sourceMaterialData);
  }

  get title() {
    return this.data.title;
  }

  get content() {
    return this.data.content;
  }
}
