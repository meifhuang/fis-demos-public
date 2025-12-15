import type { Database } from "@/types/database";
import { LearnerProfile, LearnerProfileRow } from "@/lib/learner-profiles"

export type CourseOutlineRow =
  Database["public"]["Tables"]["course_outlines"]["Row"];

interface CreationMeta {
  learner_profile?: LearnerProfileRow;
  [key: string]: unknown;
};

export interface LessonOutline {
  title: string;
  minutes: number;
  outcome: string;
  description: string;
};

export class CourseOutline {
  constructor(private data: CourseOutlineRow) {}

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

  get lessonOutlineCount() {
    return this.lessonOutlines.length;
  }

  get lessonOutlines(): LessonOutline[] {
    return (this.data.lesson_outlines ?? []) as unknown as LessonOutline[];
  }

  get totalMinutes() {
    return this.lessonOutlines.reduce(
      (sum, lesson) => sum + lesson.minutes, 0
    );
  }

  get totalMinutesInWords(): string {
    if (this.totalMinutes <= 0) return "0 min";

    const hours = Math.floor(this.totalMinutes / 60);
    const minutes = this.totalMinutes % 60;

    const hrLabel = hours === 1 ? "hr" : "hrs";
    const minLabel = minutes === 1 ? "min" : "mins";

    if (hours && minutes) return `${hours} ${hrLabel} ${minutes} ${minLabel}`;
    if (hours) return `${hours} ${hrLabel}`;

    return `${minutes} ${minLabel}`;
  }
}
