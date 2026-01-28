import { describe, it, expect } from "vitest";
import { LearnerProfile } from "./LearnerProfile";
import { factory } from "@/test";

describe("LearnerProfile", () => {
  const data = factory.build("learnerProfile");
  const profile = new LearnerProfile(data);

  it("returns the correct id", () => {
    expect(profile.id).toBe(data.id);
  });

  it("returns the label", () => {
    expect(profile.label).toBe(data.label);
  });

  it("returns the age", () => {
    expect(profile.age).toBe(data.age);
  });

  it("returns the reading level", () => {
    expect(profile.readingLevel).toBe(data.reading_level);
  });

  it("returns the experience", () => {
    expect(profile.experience).toBe(data.experience);
  });

  it("returns the interests", () => {
    expect(profile.interests).toBe(data.interests);
  });
});
