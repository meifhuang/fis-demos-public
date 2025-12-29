import { getClient } from "@/lib/supabase";
import { NextResponse } from "next/server";
import * as Sentry from "@sentry/nextjs";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const supabase = getClient();

  const { error, count } = await supabase
    .from("lesson_plans")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!count) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
