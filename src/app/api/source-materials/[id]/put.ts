import * as Sentry from "@sentry/nextjs";
import type { TablesUpdate } from "@/types";
import { NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";
import { z } from "zod";

const schema = z
  .object({
    title: z.string().min(1).optional(),
    markdown: z.string().optional(),
  })
  .strict();

/**
 * Update source material
 */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const { data: input, error: zError } = schema.safeParse(await req.json());

  if (zError) {
    Sentry.captureException(zError);
    return NextResponse.json(
      { error: z.prettifyError(zError) },
      { status: 422 },
    );
  }

  const supabase = getClient();
  const { data: record, error: dbError } = await supabase
    .from("source_materials")
    .update(input satisfies TablesUpdate<"source_materials">)
    .eq("id", id)
    .select("*")
    .maybeSingle();

  if (dbError) {
    Sentry.captureException(dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  if (!record) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(record, { status: 200 });
}
