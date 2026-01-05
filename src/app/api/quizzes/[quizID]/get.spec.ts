import * as supabaseLib from "@/lib/supabase";
import { GET } from "./route";
import { describe, expect, it } from "vitest";
import { prepareTestSchema } from "@/test";
import { QuizRow } from "@/types";

describe("GET", async () => {
  const { factory } = await prepareTestSchema();
  const mockRequest = {} as Request;

  describe("with an existing record", () => {
    it("responds with a 200 status", async () => {
      const quiz = await factory.create("quiz");
      
      const response = await GET(mockRequest, {
        params: Promise.resolve({ quizID: quiz.id })
      });

      expect(response.status).toEqual(200);
    });

    it("responds with the record", async () => {
      const quiz = await factory.create("quiz");

      const response = await GET(mockRequest, {
        params: Promise.resolve({ quizID: quiz.id })
      });

      const body: QuizRow = await response.json();
      expect(body).toEqual(quiz);
    });
  });

  describe("without a matching record", async () => {
    let response: Response;

    beforeEach(async () => {
      response = await GET(mockRequest, {
        params: Promise.resolve({ quizID: crypto.randomUUID() })
      });
    });

    it("responds with a 404 status", async () => {
      expect(response.status).toEqual(404);
    });

    it("responds with an error", async () => {
      const body: { error: string } = await response.json();
      expect(body).toEqual({ error: "Not found" });
    });
  });

  describe("when a Supabase error occurs", async () => {
    let response: Response, spy: ReturnType<typeof vi.spyOn>;

    beforeEach(async () => {
      spy = vi.spyOn(supabaseLib, "getClient").mockReturnValue({
        from: () => ({
          select: () => ({
            eq: () => ({
              // @ts-expect-error Irrelevant type mismatch in mock
              maybeSingle: async () => ({
                data: null,
                error: { message: "Simulated Supabase error" },
              })
            })
          })
        }),
      });

      response = await GET(mockRequest, {
        params: Promise.resolve({ quizID: crypto.randomUUID() })
      });
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it("responds with a 500 status and the error message", async () => {
      expect(response.status).toEqual(500);
    });

    it("responds with the error message", async () => {
      const body: { error: string } = await response.json();
      expect(body).toEqual({ error: "Simulated Supabase error" });
    });
  });
});
