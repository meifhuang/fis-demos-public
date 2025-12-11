import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";

/**
 * Index course outlines
 */
export async function GET() {
  const supabase = getClient();

  const { data, error } = await supabase
    .from("course_outlines")
    .select("*");

  if (error) {
    Sentry.captureException(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
