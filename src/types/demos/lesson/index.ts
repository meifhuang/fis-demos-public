import { BaseListRecord } from "@/types/list";

export interface LessonRecord extends BaseListRecord {
  creation_meta: {
    learner_profile: {
      id: string;
      age: number;
      label: string;
      interests: string[];
      experience: string;
      reading_level: number;
    };
    source_material: {
      title: string;
      content: string;
    };
  };
  title: string;
  content: string;
}
