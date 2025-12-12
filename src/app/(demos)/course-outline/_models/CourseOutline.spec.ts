import { CourseOutline } from "./";
import { LearnerProfile } from "@/lib/learner-profiles"
import { describe, it, expect } from "vitest";
import { factory } from "@/test"

describe("CourseOutline", () => {
  it("returns the correct id", () => {
    const data = factory.build("courseOutline");
    const courseOutline = new CourseOutline(data);
    expect(courseOutline.id).toBe(data.id);
  });

  it("returns the learner profile", () => {
    const learnerProfile = factory.build("learnerProfile");
    const data = factory.build("courseOutline", { creationMeta: { learnerProfile } });
    const courseOutline = new CourseOutline(data);
    expect(courseOutline.learnerProfile).toBeInstanceOf(LearnerProfile);
    expect(courseOutline.learnerProfile?.label).toBe(learnerProfile.label);
  });

  it("returns the title and description", () => {
    const data = factory.build("courseOutline");
    const courseOutline = new CourseOutline(data);
    expect(courseOutline.title).toBe(data.title);
    expect(courseOutline.description).toBe(data.description);
  });

  it("returns the correct lesson outline count", () => {
    const lessonOutlines = factory.buildList("lessonOutline", 2);
    const data = factory.build("courseOutline", { lessonOutlines })
    const courseOutline = new CourseOutline(data);
    expect(courseOutline.lessonOutlineCount).toBe(2);
  });

  it("returns the lesson outlines", () => {
    const data = factory.build("courseOutline");
    const courseOutline = new CourseOutline(data);
    expect(courseOutline.lessonOutlines).toEqual(data.lesson_outlines);
  });

  it("calculates total minutes correctly", () => {
    const lessonOutlines = [
      factory.build("lessonOutline", { minutes: 40 }),
      factory.build("lessonOutline", { minutes: 2 }),
    ]
    const data = factory.build("courseOutline", { lessonOutlines })
    const courseOutline = new CourseOutline(data);
    expect(courseOutline.totalMinutes).toBe(42);
  });

  describe("without learner profile data", () => {
    it("returns null for the learner profile", () => {
      const data = factory.build("courseOutline", { creation_meta: {} });
      const courseOutline = new CourseOutline(data);
      expect(courseOutline.learnerProfile).toBeNull();
    });
  });
});
