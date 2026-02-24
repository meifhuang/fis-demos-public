import { describe, it, expect, vi, beforeEach } from "vitest";
import * as Sentry from "@sentry/nextjs";
import { getClient } from "@/lib/supabase"; // Mock path
import { GET } from "./get";
import { NextRequest } from "next/server";

// 1. Mock Sentry
vi.mock("@sentry/nextjs", () => ({
  captureException: vi.fn(),
}));

// 2. Mock Supabase with extended spies for the GET chain
vi.mock("@/lib/supabase", () => {
  // Chain spies: .select("*") -> .eq("id", ...) -> .maybeSingle()
  const mockMaybeSingle = vi.fn();
  const mockEq = vi.fn(() => ({ maybeSingle: mockMaybeSingle }));
  const mockSelect = vi.fn(() => ({ eq: mockEq }));

  // Root spy for .from()
  const mockFrom = vi.fn(() => ({
    select: mockSelect,
  }));

  return {
    getClient: vi.fn(() => ({
      from: mockFrom,
    })),
  };
});

describe("API Route Handlers: Lessons GET", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Helper to access spies ---
  const getMocks = () => {
    const client = getClient();
    const from = client.from;

    // Simulate the chain to get specific spy references
    const chainSelect = client.from("any_table" as any).select("*");
    const chainEq = chainSelect.eq("id", "1");

    const select = from("lessons").select;
    const eq = chainSelect.eq;
    const maybeSingle = chainEq.maybeSingle;

    vi.clearAllMocks();

    return { from, select, eq, maybeSingle };
  };

  const mockRequest = {} as NextRequest; // GET requests usually don't need a body mock
  const mockParams = { params: Promise.resolve({ id: "lesson-123" }) };

  describe("GET handler", () => {
    it("should return the record with 200 status on success", async () => {
      const { from, select, eq, maybeSingle } = getMocks();

      const mockRecord = {
        id: "lesson-123",
        title: "Introduction to Atoms",
        content: "Atoms are the smallest building blocks of matter.",
      };

      vi.mocked(maybeSingle).mockResolvedValueOnce({
        data: mockRecord,
        error: null,
        count: null,
        status: 200,
        statusText: "OK",
      } as any);

      const response = await GET(mockRequest, mockParams);
      const body = await response.json();

      expect(from).toHaveBeenCalledWith("lessons");
      expect(select).toHaveBeenCalledWith("*");
      expect(eq).toHaveBeenCalledWith("id", "lesson-123");
      expect(maybeSingle).toHaveBeenCalled();

      expect(response.status).toBe(200);
      expect(body).toEqual(mockRecord);
    });

    it("should return 404 when record is not found (data is null)", async () => {
      const { maybeSingle } = getMocks();

      // Mock DB "Not Found" response (valid query, but no rows returned)
      vi.mocked(maybeSingle).mockResolvedValueOnce({
        data: null, // Supabase returns null data for not found in maybeSingle
        error: null,
        count: null,
        status: 200,
        statusText: "OK",
      } as any);

      const response = await GET(mockRequest, mockParams);
      const body = await response.json();

      expect(response.status).toBe(404);
      expect(body.error).toBe("Not found");
    });

    it("should return 500 status and call Sentry on database error", async () => {
      const { maybeSingle } = getMocks();
      const mockError = new Error("Connection pool timeout");

      // Mock DB Error response
      vi.mocked(maybeSingle).mockResolvedValueOnce({
        data: null,
        error: mockError,
        count: null,
        status: 500,
        statusText: "Internal Server Error",
      } as any);

      const response = await GET(mockRequest, mockParams);
      const body = await response.json();

      expect(response.status).toBe(500);
      expect(body).toEqual({ error: mockError.message });
      expect(Sentry.captureException).toHaveBeenCalledWith(mockError);
    });
  });
});
