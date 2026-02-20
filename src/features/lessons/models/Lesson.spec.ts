// @vitest-environment node

import { Lesson } from "./Lesson";
import { LearnerProfile } from "@/lib/learner-profiles";
import { SourceMaterial } from "@/features/source-materials/models/SourceMaterial";
import { describe, it, expect } from "vitest";
import { factory } from "@/test";

describe("Lesson", () => {
  it("returns the correct id", () => {
    const data = factory.build("lesson");
    const lesson = new Lesson(data);
    expect(lesson.id).toBe(data.id);
  });

  it("returns the learner profile and source material", () => {
    const learnerProfile = factory.build("learnerProfile");
    const sourceMaterial = factory.build("sourceMaterial");
    const data = factory.build("lesson", {
      creationMeta: { learnerProfile, sourceMaterial },
    });
    const lesson = new Lesson(data);
    expect(lesson.learnerProfile).toBeInstanceOf(LearnerProfile);
    expect(lesson.learnerProfile?.label).toBe(learnerProfile.label);
    expect(lesson.sourceMaterial).toBeInstanceOf(SourceMaterial);
    expect(lesson.sourceMaterial?.title).toBe(sourceMaterial.title);
  });

  it("returns the title and content", () => {
    const data = factory.build("lesson");
    const lesson = new Lesson(data);
    expect(lesson.title).toBe(data.title);
    expect(lesson.content).toBe(data.content);
  });

  describe("without learner profile and source data", () => {
    it("returns null for the learner profile", () => {
      const data = factory.build("lesson", {
        creation_meta: {},
      });
      const lesson = new Lesson(data);
      expect(lesson.learnerProfile).toBeNull();
      expect(lesson.sourceMaterial).toBeNull();
    });
  });
});
