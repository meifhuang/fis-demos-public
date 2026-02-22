import { describe, it, expect, vi, beforeEach } from "vitest";
import * as Sentry from "@sentry/nextjs";
import { getClient } from "../../../lib/supabase";
import { GET } from "../../../app/api/lessons/route";

// 1. Mock Sentry
vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

// 2. Mock Supabase with internal spies
vi.mock("@/lib/supabase", () => {
  // Spies for the POST chain: .insert().select().single()
  const mockSingle = vi.fn();
  const mockSelectForInsert = vi.fn(() => ({ single: mockSingle }));
  const mockInsert = vi.fn(() => ({ select: mockSelectForInsert }));

  // Spy for the GET chain: .select("*")
  const mockSelectForGet = vi.fn();

  // Root spy for .from()
  const mockFrom = vi.fn(() => ({
    select: mockSelectForGet,
    insert: mockInsert,
  }));

  return {
    getClient: vi.fn(() => ({
      from: mockFrom,
    })),
  };
});

describe("API Route Handler: /api/lessons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const getMocks = () => {
    const client = getClient();
    const from = client.from;

    const chain = client.from("setup_extraction" as any);
    const select = chain.select;
    const insert = chain.insert;

    const single = insert({} as any).select().single;

    // Clear the history of these setup calls
    vi.clearAllMocks();

    return { from, select, insert, single };
  };

  describe("GET handler", () => {
    const mockData = [
      {
        id: 1,
        title: "Quantum Physics",
        content: "test",
        creation_meta: {
          learner_profile: {
            age: 5,
            grade: 8,
          },
        },
      },
    ];

    it("should return lesson data with 200 status on success", async () => {
      const { from, select } = getMocks();

      vi.mocked(select).mockResolvedValueOnce({
        data: mockData,
        error: null,
        count: null,
        status: 200,
        statusText: "OK",
      } as any); // 'as any' is safe here to avoid mocking every single Postgrest property
      const response = await GET();
      const body = await response.json();

      expect(from).toHaveBeenCalledWith("lessons");
      expect(select).toHaveBeenCalledWith("*");
      expect(response.status).toBe(200);
      expect(body).toEqual(mockData);
    });
  });

  it("should return 500 status and call Sentry on database error", async () => {
    const { select } = getMocks();
    const mockError = new Error("Connection pool timeout");

    // FIX: Add missing properties here as well
    vi.mocked(select).mockResolvedValueOnce({
      data: null,
      error: mockError,
      count: null,
      status: 500,
      statusText: "Internal Server Error",
    } as any);

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(500);
    expect(body).toEqual({ error: mockError.message });
    expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
  });
});
