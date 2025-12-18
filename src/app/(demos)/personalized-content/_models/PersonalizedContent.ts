import type { Database } from "@/types/database";
import { LearnerProfile, LearnerProfileRow } from "@/lib/learner-profiles"

export type PersonalizedContentRow =
  Database["public"]["Tables"]["personalized_content"]["Row"];

interface CreationMeta {
  learner_profile?: LearnerProfileRow;
  [key: string]: unknown;
}

export class PersonalizedContent {
  constructor(private data: PersonalizedContentRow) {}

  get id() {
    return this.data.id;
  }

  get creationMeta(): CreationMeta {
    return (this.data.creation_meta ?? {}) as CreationMeta;
  }

  get learnerProfile(): LearnerProfile | null {
    const profileData = this.creationMeta.learner_profile
    if (!profileData) return null;

    return new LearnerProfile(profileData);
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  get content() {
    return this.data.content;
}
}
