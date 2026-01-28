import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";

/**
 * Get quiz
 */
export async function GET(
  _: Request,
  { params }: { params: Promise<{ quizID: string }> },
) {
  const id = (await params).quizID;
  const supabase = getClient();

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(data, { status: 200 });
}
