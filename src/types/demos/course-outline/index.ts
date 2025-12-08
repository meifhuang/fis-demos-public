import { BaseListRecord } from "@/types";

export interface CourseOutlineRecord extends BaseListRecord {
  title: string;
  description: string;
  numberOfLessons: number;
  durationValue: number;
  durationUnit: "minutes" | "hours";
  learnerProfileId: string;
}

export interface CourseOutlineDetail extends CourseOutlineRecord {
  lessons: Lesson[];
}

export interface CourseOutlineFormState extends CourseOutlineRecord {
  customization: string;
}

export interface LessonContentBlock {
  rationale: string;
  assessment_format: string;
}

export interface LessonSections {
  introduction: LessonContentBlock;
  context: LessonContentBlock;
  example: LessonContentBlock;
  activity: LessonContentBlock;
  assessment: LessonContentBlock;
  reflection: LessonContentBlock;
}

export interface Lesson extends LessonSections {
  title: string;
  duration: string;
}
