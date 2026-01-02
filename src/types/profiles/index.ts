import { BaseListRecord } from "../list";

export interface LearnerProfile extends BaseListRecord {
  label: string;
  age: number;
  reading_level: number;
  experience: string | null;
  interests: string[] | null;
}
