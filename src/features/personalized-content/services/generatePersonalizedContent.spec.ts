import { describe, it, expect, vi, beforeEach } from "vitest";
import { PersonalizedContentGenerationRequest } from "@/types";
import { PersonalizedContentRow } from "../models/PersonalizedContent";
import { generatePersonalizedContent } from "./generatePersonalizedContent";

describe("generatePersonalizedContent", () => {
  const mockPersonalizedContentData: PersonalizedContentGenerationRequest = {
    title: "Atoms",
    sourceMaterial: "Atoms are the building blocks of matter...",
    learnerProfile: {
      label: "Adult",
      age: 29,
      reading_level: 13,
      interests: ["3D printing", "Mountain biking", "Pottery"],
      experience: "Mechanical engineering background with coding experience.",
    },
    customization: "",
  };

  const mockResponseData: PersonalizedContentRow = {
    id: "1",
    title: "Test Personalized Content",
    description: "Test description",
    content: "test content",
    creation_meta: {},
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the generated personalized content on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponseData),
        })
      ) as unknown as typeof fetch
    );

    const result = await generatePersonalizedContent(mockPersonalizedContentData);
    expect(result).toEqual(mockResponseData);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith("/api/personalized-content/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockPersonalizedContentData),
    });
  });

  it("throws an error when the response is not ok", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({
          ok: false,
          text: () => Promise.resolve("Internal Server Error"),
        })
      ) as unknown as typeof fetch
    );

    await expect(generatePersonalizedContent(mockPersonalizedContentData)).rejects.toThrow(
      "Failed to create content: Internal Server Error"
    );
  });
});
