import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";
import { getClient } from "@/lib/supabase";

/**
 * Delete quiz
 */
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ quizID: string }> },
) {
  const id = (await params).quizID;
  const supabase = getClient();

  const { error, count } = await supabase
    .from("quizzes")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (count === 0) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
