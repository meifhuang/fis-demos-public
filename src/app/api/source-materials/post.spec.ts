import type { Tables } from "@/types";
import { POST } from "./route";
import { describe, expect, it } from "vitest";
import { prepareTestSchema } from "@/test";

const buildRequest = (body: { [key: string]: string }) => {
  return new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("POST", async () => {
  const { factory, pgClient } = await prepareTestSchema();

  describe("with a valid payload", () => {
    it("responds with a 201 status", async () => {
      const { title, markdown } = await factory.build("sourceMaterial");
      const request = buildRequest({ title, markdown });
      const response = await POST(request);
      expect(response.status).toEqual(201);
    });

    it("creates the record", async () => {
      const { title, markdown } = await factory.build("sourceMaterial");
      const request = buildRequest({ title, markdown });
      const getByTitle = async () => (
        await pgClient.query(
          `select * from source_materials where title = $1`, [title]
        )
      )

      expect((await getByTitle()).rows).toHaveLength(0);
      await POST(request);
      expect((await getByTitle()).rows).toHaveLength(1);
    });

    it("responds with the created record", async () => {
      const { title, markdown } = await factory.build("sourceMaterial");
      const request = buildRequest({ title, markdown });
      const response = await POST(request);
      const body: Tables<"source_materials"> = await response.json();
      expect(body.id).toBeDefined();
      expect(body.title).toEqual(title);
      expect(body.markdown).toEqual(markdown);
    });
  });

  describe("with invalid input", () => {
    it("responds with a 422 status and validation error", async () => {
      const request = buildRequest({ title: "all title, no content" });
      const response = await POST(request);
      expect(response.status).toEqual(422);
      const body = await response.json();
      expect(body.error).toMatch(/Invalid input/);
    });
  });

  describe("when a Supabase error occurs", () => {
    let spy: ReturnType<typeof vi.spyOn>;

    beforeEach(async () => {
      const fakeClient = {
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockResolvedValue({
          data: null,
          error: { message: "Simulated Supabase error" },
        }),
      };

      spy = vi.spyOn(await import("@/lib/supabase"), "getClient").mockReturnValue(fakeClient as any);
    });

    afterEach(() => {
      spy.mockRestore();
    });

    it("responds with a 500 status and the error message", async () => {
      const { title, markdown } = await factory.build("sourceMaterial");
      const request = buildRequest({ title, markdown });
      const response = await POST(request);
      expect(response.status).toEqual(500);
      const body = await response.json();
      expect(body.error).toEqual("Simulated Supabase error");
    });
  });
});
