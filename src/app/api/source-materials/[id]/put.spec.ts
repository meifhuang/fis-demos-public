import type { Tables } from "@/types";
import { PUT } from "./route";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import { prepareTestSchema } from "@/test";

const buildRequest = (body: { [key: string]: string }) => {
  return new Request("http://localhost", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
}

describe("PUT", async () => {
  const { factory, pgClient } = await prepareTestSchema();

  describe("with a valid update", () => {
    it("responds with a 200 status", async () => {
      const sourceMaterial = await factory.create("sourceMaterial");
      const request = buildRequest({ title: "Updated Title" })
      const response = await PUT(request, {
        params: Promise.resolve({ id: sourceMaterial.id }),
      });
      expect(response.status).toEqual(200);
    });

    it("updates the record", async () => {
      const { id } = await factory.create("sourceMaterial");
      const title = `New Title ${crypto.randomUUID()}`
      const request = buildRequest({ title })
      await PUT(request, { params: Promise.resolve({ id }) });
      const result = await pgClient.query(
        `select title from source_materials where id = $1`,
        [id]
      );

      expect(result.rows).toHaveLength(1);
      expect(result.rows[0].title).toEqual(title);
    });

    it("responds with the updated record", async () => {
      const sourceMaterial = await factory.create("sourceMaterial");
      const request = buildRequest({ title: "Updated Title" })
      const response = await PUT(request, {
        params: Promise.resolve({ id: sourceMaterial.id }),
      });

      const body: Tables<"source_materials"> = await response.json();
      expect(body.title).toEqual("Updated Title");
      expect(body.id).toEqual(sourceMaterial.id);
    });
  });

  describe("with invalid input", () => {
    it("responds with a 422 status and validation error", async () => {
      const sourceMaterial = await factory.create("sourceMaterial");
      const request = buildRequest({ title: "" })
      const response = await PUT(request, {
        params: Promise.resolve({ id: sourceMaterial.id }),
      });

      expect(response.status).toEqual(422);
      const body = await response.json();
      expect(body.error).toMatch(/Too small/);
    });
  });

  describe("when the record does not exist", () => {
    it("responds with a 404 status", async () => {
      const request = buildRequest({ title: "Updated Title" })
      const response = await PUT(request, {
        params: Promise.resolve({ id: crypto.randomUUID() }),
      });

      expect(response.status).toEqual(404);
    });
  });

  describe("when a Supabase error occurs", () => {
    let spy: ReturnType<typeof vi.spyOn>;

    beforeEach(async () => {
      const fakeClient = {
        eq: vi.fn().mockReturnThis(),
        from: vi.fn().mockReturnThis(),
        insert: vi.fn().mockReturnThis(),
        select: vi.fn().mockReturnThis(),
        single: vi.fn().mockReturnThis(),
        update: vi.fn().mockReturnThis(),
        maybeSingle: vi.fn().mockResolvedValue({
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
      const sourceMaterial = await factory.build("sourceMaterial");
      const request = buildRequest({ title: "Updated Title" })
      const response = await PUT(request, {
        params: Promise.resolve({ id: sourceMaterial.id }),
      });

      expect(response.status).toEqual(500);
      const body = await response.json();
      expect(body.error).toEqual("Simulated Supabase error");
    });
  });
});
