import { CourseOutline, CourseOutlineRow } from "./";
import { LearnerProfile } from "@/lib/learner-profiles"
import { describe, it, expect } from "vitest";
import { factory } from "@/test"

describe("CourseOutline", () => {
  const data: CourseOutlineRow = factory.build("courseOutline");
  const course = new CourseOutline(data);

  it("returns the correct id", () => {
    expect(course.id).toBe(data.id);
  });

  it("returns the learner profile", () => {
    const learnerProfile = course.learnerProfile;
    expect(learnerProfile).toBeInstanceOf(LearnerProfile);
    expect(learnerProfile.label).toBe(data.creation_meta.learner_profile.label);
  });

  it("returns the title and description", () => {
    expect(course.title).toBe(data.title);
    expect(course.description).toBe(data.description);
  });

  it("returns the correct lesson outline count", () => {
    expect(course.lessonOutlineCount).toBe(data.lesson_outlines.length);
  });

  it("returns the lesson outlines", () => {
    expect(course.lessonOutlines).toEqual(data.lesson_outlines);
  });

  it("calculates total minutes correctly", () => {
    const total = data.lesson_outlines.reduce((sum, l) => sum + l.minutes, 0);
    expect(course.totalMinutes).toBe(total);
  });

  describe("without learner profile data", () => {
    it("returns null for the learner profile", () => {
      const newData: CourseOutlineRow = factory.build("courseOutline", { creation_meta: {} });
      const newCourse = new CourseOutline(newData);
      expect(newCourse.learnerProfile).toBeNull();
    });
  });
});
