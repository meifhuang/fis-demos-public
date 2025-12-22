import * as Sentry from "@sentry/nextjs";
import type { TablesInsert } from "@/types";
import { NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1),
  markdown: z.string().min(1),
}).strict();

/**
 * Create source material
 */
export async function POST(req: Request) {
  const { data: payload, error: zError } = schema.safeParse(await req.json());

  if (zError) {
    Sentry.captureException(zError);
    return NextResponse.json({ error: z.prettifyError(zError) }, { status: 422 });
  }

  const supabase = getClient();
  const { data: record, error: dbError } = await supabase
    .from("source_materials")
    .insert(payload satisfies TablesInsert<"source_materials">)
    .select()
    .single();

  if (dbError) {
    Sentry.captureException(dbError);
    return NextResponse.json({ error: dbError.message }, { status: 500 });
  }

  return NextResponse.json(record, { status: 201 });
}
